#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import configparser
import datetime
import re
import time
from urllib import parse

import requests
import urllib3

from login.manual_check_caption import manual_check_captcha
from query_train.query_train import queryTrain

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
__author__ = "雷洪飞"

"""
 12306登录接口，获取到了验证码标题的内容。
"""
headers = {
    "User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"}

req = ""

# cookies信息
cookies = ""
# 登陆返回的第一个uuid
login_id = ""
# auth_uamtk根据login_Id得到的新tk_id
newapptk_id = ""
# check_uamauthclient 检查客户端登陆返回i
apptk_id = ""

# 加载现有配置文件
conf = configparser.ConfigParser()
conf.read("../conf/conf.ini", encoding="utf-8-sig")
# 登陆信息
username = conf.getint('user_info', 'username')
password = conf.get('user_info', 'password')

# 乘客信息
passengerTicketStr = conf.get('passenger_info', 'passengerTicketStr')
oldPassengerStr = conf.get('passenger_info', 'oldPassengerStr')

# 开启循环购票，一直查询余票，有票就购买
isAutoBuy = conf.get('buy_trcket_info', 'isAutoBuy')

# 车票信息
from_station = conf.get('ticket_info', 'from_station')
to_station = conf.get('ticket_info', 'to_station')
date = conf.get('ticket_info', 'date')


def login_12306():
    """
    12306登陆接口
    :return:
    """
    loginUrl = "https://kyfw.12306.cn/passport/web/login"
    data = {
        'username': username,
        'password': password,
        'appid': 'otn'
    }
    result = req.post(url=loginUrl, data=data, headers=headers, verify=False)
    print("登录返回结果:")
    print(result.json())
    res = result.json()
    cookies = result.headers['set-cookie']
    te = res["result_message"]
    if te == "登录成功":
        login_id = res["uamtk"]
        return True
    else:
        return False


def auth_uamtk():
    """
    根据登录返回的umatk,得到newapptk
    :return:
    """
    print("验证是否登录，得到newapptk")
    data = {
        "appid": "otn"
    }
    url = "https://kyfw.12306.cn/passport/web/auth/uamtk"
    response = req.post(url, data=data, headers=headers, cookies=cookies)
    print(response.text)
    newapptk_id = response.json()['newapptk']
    return newapptk_id


def check_uamauthclient(tk):
    """
    检查客户端是否登录
    :param tk:
    :return:
    """
    print("检查unamuth客户端")
    url = "https://kyfw.12306.cn/otn/uamauthclient"
    data = {
        "tk": tk,
        "_json_att": ""
    }
    resp = req.post(url, data=data, headers=headers)
    # 反回一个验证通过信息
    if resp.status_code == requests.codes.ok:
        # 成功,返回这种类型数据
        # {
        # apptk:"1eB7-ZqCXawUvOSEwc3xshNWaDF7R_mWtOrh1gBrcusoz1210"
        # result_code:0
        # result_message:"验证通过"
        # username:"雷洪飞"
        # }
        print(resp.text)
        """
            会存在失败的情况，网络原因，转json将会失败
        """
        te = resp.json()
        if te["result_message"] == "验证通过":
            print("用户名：", te['username'])
            apptk_id = te['apptk']


def get_user_info():
    print("获取用户信息")
    """
    获取用户信息
    :return:
    """
    url_info = "https://kyfw.12306.cn/otn/confirmPassenger/getPassengerDTOs"
    data = {
        "_json_att": "",
        "REPEAT_SUBMIT_TOKEN": newapptk_id
    }
    response = req.post(url_info, data=data, headers=headers, cookies=cookies)
    print(response.text)


def initDc():
    """
    在进行点击了预定，初始化订票页面
    :return:
    """
    print("初始化订单数据")
    url = "https://kyfw.12306.cn/otn/confirmPassenger/initDc"
    data = {
        "_json_att": ""
    }
    resp = req.post(url, data=data, headers=headers)
    # print(resp.text)
    # 反回一个验证通过信息
    if resp.status_code == requests.codes.ok:
        a1 = re.search(r'globalRepeatSubmitToken.+', resp.text).group()
        globalRepeatSubmitToken = re.sub(r'(globalRepeatSubmitToken)|(=)|(\s)|(;)|(\')', '', a1)

        b1 = re.search(r'key_check_isChange.+', resp.text).group().split(',')[0]
        key_check_isChange = re.sub(r'(key_check_isChange)|(\')|(:)', '', b1)

        return (globalRepeatSubmitToken, key_check_isChange)


def check_user():
    """
    检查用户是都登陆
    我都不想去处理返回值，因为在这里其实对于我们来说是不需要的
    但是12306的服务器需要再次检查（其实这也是吹牛逼的，只是那些个写前端
    的人写的，也是一种流程吧，但是在下一个步骤其实处理就行，不需要单独访问
    后台接口）
    :return:
    """
    print("检查用户")
    url = "https://kyfw.12306.cn/otn/login/checkUser"
    data = {
        "_json_att": ""
    }
    resp = req.post(url, data=data, headers=headers, cookies=cookies)
    # 反回一个验证通过信息
    if resp.status_code == requests.codes.ok:
        print(resp.text)


def submit_order_request(trick_data):
    """
    进行订单检查
    :return:
    """
    print("开始进行订单检查...")
    url = "https://kyfw.12306.cn/otn/leftTicket/submitOrderRequest"

    """
        分析代码的js为：
        https://kyfw.12306.cn/otn/resources/merged/queryLeftTicket_end_js.js?scriptVersion=1.9058 
        在该js中，checkG1234方法就有详细的说明
        格式化之后在7606行
            
        点击预订参数说明：
            p1:车次组第一个元素
            p2:出发时间
            p3:车次数组第三个元素
            p4: 出发地代码
            p5: 结束地代码
            是用来拼接成以下数据的
    """

    """
    
     "secretStr" 车次,需要进行解码
     "train_date": 出发日期
     "back_train_date"  返回日期
     "tour_flag": "dc"  单程/ 往返(wc)
     "purpose_codes":  "ADULT"  普通/学生(0X00)
     "query_from_stati":  出发车站 ，可以在查询车次接口中得到
     "query_to_station":  返回车站，  可以在查询车次接口中得到
     "undefined": ""  应该是跟返回数据相关
    """

    data = {
        "secretStr": parse.unquote(trick_data[len(trick_data) - 1][0]),
        "train_date": date,
        "back_train_date": datetime.datetime.now().strftime('%Y-%m-%d'),
        "tour_flag": "dc",
        "purpose_codes": "ADULT",
        "query_from_station_name": from_station,
        "query_to_station_name": to_station,
        "undefined": ""
    }
    resp = req.post(url, data=data, headers=headers, cookies=cookies)
    # 反回一个验证通过信息
    if resp.status_code == requests.codes.ok:
        # {"validateMessagesShowId":"_validatorMessage","status":true,"httpstatus":200,"分析js文件":"N","messages":[],"validateMessages":{}}
        print(resp.text)
        if resp.json()['status'] == True:
            return True
        else:
            print("异常结果：", resp.json()['messages'][0])
            # 强制退出程序，去处理未完成的订单
            exit(0)
            return False


def init_buy_page():
    print("初始化购票页面")
    url = "https://kyfw.12306.cn/otn/leftTicket/init"
    resp = req.get(url, headers=headers, cookies=cookies)
    if resp.status_code == requests.codes.ok:
        print("购票页面初始化成功!")


def check_order_info(REPEAT_SUBMIT_TOKEN):
    """
    再次检查订单
    :return:
    """
    """
    js信息：https://kyfw.12306.cn/otn/resources/merged/passengerInfo_js.js?scriptVersion=1.9058
    参数信息
    cancel_flag:2  默认
    bed_level_order_num:000000000000000000000000000000  默认
    passengerTicketStr:3,0,1,黎安永,1,522121197001016817,,N  用户信息
    oldPassengerStr:黎安永,1,522121197001016817,1_
    tour_flag:dc 
    randCode: 需要重新获取验证码，为空
    whatsSelect:1  是否是常用联系人中选择的需要购买车票的人
    _json_att:
    REPEAT_SUBMIT_TOKEN:89089246526d93566b2266de1791af87
    """
    print("检查订单信息")
    data = {
        "cancel_flag": "2",
        "bed_level_order_num": "000000000000000000000000000000",
        "passengerTicketStr": passengerTicketStr,
        "oldPassengerStr": oldPassengerStr,
        "tour_flag": "dc",
        "randCode": "",
        "whatsSelect": "1",
        "_json_att": "",
        "REPEAT_SUBMIT_TOKEN": REPEAT_SUBMIT_TOKEN
    }
    url = "https://kyfw.12306.cn/otn/confirmPassenger/checkOrderInfo"
    resp = req.post(url, data=data, cookies=cookies, headers=headers)
    if resp.status_code == requests.codes.ok:
        print(resp.text)
        if '"submitStatus":true' in resp.text:
            return True

    return False


def confirm_single(REPEAT_SUBMIT_TOKEN, key_check_isChange, trick_data):
    """
    真正的提交订单
    最后一次确认订单
    :return: 返回购票结果
    """
    """
    passengerTicketStr:3,0,1,黎安永,1,522121197001016817,,N
    oldPassengerStr:黎安永,1,522121197001016817,1_
    tour_flag:dc
    randCode:
    purpose_codes:00
    key_check_isChange:1C84C0EA5533D3D73F88A0C7A6BE1E73D65BF9C00C38B3ABF8D09A12
    train_location:QZ
    choose_seats:
    seatDetailType:000
    whatsSelect:1
    roomType:00
    dwAll:N
    _json_att:
    REPEAT_SUBMIT_TOKEN:89089246526d93566b2266de1791af87
    """
    print("最后一次确认订单")
    url = "https://kyfw.12306.cn/otn/confirmPassenger/confirmSingleForQueue"
    data = {
        "passengerTicketStr": passengerTicketStr,
        "oldPassengerStr": oldPassengerStr,
        "randCode": "",
        "purpose_codes": "00",
        "key_check_isChange": key_check_isChange,
        "leftTicketStr": trick_data[len(trick_data) - 1][12],
        "train_location": trick_data[len(trick_data) - 1][15],
        "choose_seats": "",
        "seatDetailType": "000",
        "whatsSelect": "1",
        "roomType": "00",
        "dwAll": "N",
        "_json_att": "",
        "REPEAT_SUBMIT_TOKEN": REPEAT_SUBMIT_TOKEN
    }
    print(data)
    resp = req.post(url, data=data, cookies=cookies, headers=headers)
    if resp.status_code == requests.codes.ok:
        print(resp.text)
        # 返回购票结果
        return resp.json()['data']['submitStatus']


def get_passenger(REPEAT_SUBMIT_TOKEN):
    """
     获取到用户的乘车人信息
    :param REPEAT_SUBMIT_TOKEN:  uuid
    :return:
    """
    print("获取乘车人信息.......")
    url = "https://kyfw.12306.cn/otn/confirmPassenger/getPassengerDTOs"
    data = {
        "_json_att": "",
        "REPEAT_SUBMIT_TOKEN": REPEAT_SUBMIT_TOKEN
    }
    resp = req.post(url, data=data, cookies=cookies, headers=headers)
    if resp.status_code == requests.codes.ok:
        print(resp.text)


def getQueueCount(trick_data, REPEAT_SUBMIT_TOKEN, query_date):
    """
        判断是都有余票
    :param REPEAT_SUBMIT_TOKEN:
    :return:
    """
    print("检查余票...")
    url = "https://kyfw.12306.cn/otn/confirmPassenger/getQueueCount"
    # 将字符串转化为需要的时间
    train_data = tranceDate(query_date)
    data = {
        # 时间
        "train_date": train_data,
        # 车次编号
        "train_no": trick_data[len(trick_data) - 1][2],
        # 火车代码
        "stationTrainCode": trick_data[len(trick_data) - 1][3],
        # 座位类型 1：硬卧 3：硬座
        "seatType": "3",
        # 出发点，终止地址
        "fromStationTelecode": trick_data[len(trick_data) - 1][6],
        "toStationTelecode": trick_data[len(trick_data) - 1][7],
        "leftTicket": trick_data[len(trick_data) - 1][12],
        "purpose_codes": "00",
        "train_location": trick_data[len(trick_data) - 1][15],
        "_json_att": "",
        "REPEAT_SUBMIT_TOKEN": REPEAT_SUBMIT_TOKEN
    }
    print(data)
    resp = req.post(url, data=data, headers=headers, cookies=cookies)
    if resp.status_code == requests.codes.ok:
        # 有余票，返回值将会是True
        print(resp.text)


def tranceDate(param):
    """
    将传递的字符串转化为时间
    :param param: 时间： 2017-12-29
    :return: Fri Dec 29 2017 00:00:00 GMT+0800 (中国标准时间)
    """
    ts = time.mktime(time.strptime(param, "%Y-%m-%d"))
    s = time.ctime(ts)
    t1 = s[0:11] + s[20:] + " 00:00:00 GMT+0800 (中国标准时间)"
    return t1


if __name__ == "__main__":
    url = "https://kyfw.12306.cn/passport/captcha/captcha-image?login_site=E&module=login&rand=sjrand&0.6523880813900003"
    parent_file_url = "../images"
    # 进行验证码识别
    mck = manual_check_captcha(parent_file_url, url)
    check_result, req = mck.check_captcha()
    if check_result == True:
        # 进行登录
        login = login_12306()
        if login is True:
            print("登录成功")
            #  阶段一，验证是否登录
            # 验证 登录 获取tk
            check_uamauthclient(auth_uamtk())

            # 阶段二 进行车票确认
            # 初始化买票页面
            init_buy_page()
            print("查询车票数据: 出发地:{},目的地:{},出发日期:{}".format(from_station, to_station, date))
            # 开启自动查询购票
            while (isAutoBuy):
                try:
                    # 查询票
                    qt = queryTrain(req, headers)
                    query_ticket_data = qt.query_trict(from_station, to_station, date)
                    print("输出车次数据")
                    print(query_ticket_data)
                    # 检查用户
                    check_user()
                    # 初始化订单
                    order_check_result = submit_order_request(query_ticket_data)
                    # 说明订单成功，需要确认订单即可
                    if order_check_result == True:
                        # 初始化订单数据,获取到REPEAT_SUBMIT_TOKEN,key_check_isChange,leftTicketStr
                        REPEAT_SUBMIT_TOKEN, key_check_isChange = initDc()
                        # 检查订单信息
                        print("得到校验uuid:", REPEAT_SUBMIT_TOKEN)
                        # 获取该用户下的乘车人信息
                        get_passenger(REPEAT_SUBMIT_TOKEN)
                        # 进行订单确认
                        check_order_result = check_order_info(REPEAT_SUBMIT_TOKEN)
                        if check_order_result == True:
                            # 订单检查成功，尽心确认订单
                            # 查询订单队列余票
                            getQueueCount(query_ticket_data, REPEAT_SUBMIT_TOKEN, date)
                            # 最后一次确认订单
                            ok = confirm_single(REPEAT_SUBMIT_TOKEN, key_check_isChange, query_ticket_data)
                            if ok == True:
                                print("购票成功,退出程序!")
                                exit(0)
                            else:
                                # 休眠5秒钟，防止被防刷票封ip
                                time.sleep(5)

                except Exception:
                    print("发生异常，继续购买...")
        else:
            print("登录失败")
    else:
        print("验证码校验失败")
