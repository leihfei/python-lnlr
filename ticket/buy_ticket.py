#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os

import requests
import urllib3

from query_train.query_train import queryTrain

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
__author__ = "雷洪飞"

"""
 12306登录接口，获取到了验证码标题的内容。
"""
headers = {
    "User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"}

req = requests.session()

cookies = ""
login_id = ""
newapptk_id = ""
apptk_id = ""


def get_picture(get_pic_url, img_code):
    response = req.get(get_pic_url, headers=headers, verify=False)
    response.encoding = 'utf-8'
    if response.status_code == 200:
        with open(img_code, "wb") as f:
            f.write(response.content)
            print("图片下载成功")
            return True
    else:
        print("图片下载失败，正在重试....")
        get_picture(get_pic_url, img_code)


def del_file(path):
    for i in os.listdir(path):
        # 取文件绝对路径
        path_file = os.path.join(path, i)
        if os.path.isfile(path_file):
            os.remove(path_file)
        else:
            del_file(path_file)


def login_12306():
    loginUrl = "https://kyfw.12306.cn/passport/web/login"
    data = {
        'username': '18788638847',
        'password': "Diamond7nuo",
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


def check_captcha(point):
    # 验证码地址
    check_url = "https://kyfw.12306.cn/passport/captcha/captcha-check"
    data = {
        "answer": ",".join(point),
        "login_site": "E",
        "rand": "sjrand"
    }
    # print(data)
    response = req.post(check_url, data=data,
                        headers=headers, verify=False)
    print(response.text)
    if response.status_code != 200:
        return False
    code = response.json()['result_code']
    # 取出验证结果，4：成功  5：验证失败  7：过期
    if str(code) == '4':
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
        "REPEAT_SUBMIT_TOKEN": newapptk
    }
    response = req.post(url_info, data=data, headers=headers, cookies=cookies)
    print(response.text)


def initDc():
    print("初始化订单数据")
    url = "https://kyfw.12306.cn/otn/confirmPassenger/initDc"
    data = {
        "_json_att": ""
    }
    resp = req.post(url, data=data, headers=headers)
    # 反回一个验证通过信息
    if resp.status_code == requests.codes.ok:
        print(resp.text)


def check_user():
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
    
     "secretStr" 车次
     "train_date": 出发日期
     "back_train_date"  返回日期
     "tour_flag": "dc"  单程/ 往返(wc)
     "purpose_codes":  "ADULT"  普通/学生(0X00)
     "query_from_stati":  出发车站 ，可以在查询车次接口中得到
     "query_to_station":  返回车站，  可以在查询车次接口中得到
     "undefined": ""  应该是跟返回数据相关
    """

    # 得到我们需要的数据
    availabel_trains = trick_data['data']['result']
    # 但是那个格式我们不能直接使用，那么就需要进行把数据格式化一下
    availabel_trains = [i.split('|') for i in availabel_trains]

    data = trick_data['data']
    # 获取map,就是出发，终止的名称
    map_name = data['map']

    # 获取result就是车次信息
    result_data = availabel_trains[0]

    secretStr = result_data[0]
    print(secretStr)
    # query_from_station_name = map_name
    # query_to_station_name =

    data = {
        "secretStr": "rTINh3y57m+I9gCf32UyUdhZgpflwuPUWAhlLAEIHnIm7ufRegojhRfZ5SopZ942i7jnNE5N7oEszzV4SmMFFiIuqJIzUU1W+Ner8vURilGOxi6f63rizvy9imTqIWEKfoaPAdPt887QmT7BQxpUoV66ZQAIU6K2gD6LeYXaCVhKjzZdE7gMtPWey7iOMqwemsRD+KqGTallKVwTTVeFH4SvbvxwPBtvveHvq62FxjJnazlZ/WTiHpNFnbViK8gxU9W9yuy5Zyc=",
        "train_date": "2017-12-23",
        "back_train_date": "2017-12-22",
        "tour_flag": "dc",
        "purpose_codes": "ADULT",
        "query_from_station_name": "遵义西",
        "query_to_station_name": "贵阳",
        "undefined": ""
    }

    # data = {
    #     "secretStr": "rTINh3y57m+I9gCf32UyUdhZgpflwuPUWAhlLAEIHnIm7ufRegojhRfZ5SopZ942i7jnNE5N7oEszzV4SmMFFiIuqJIzUU1W+Ner8vURilGOxi6f63rizvy9imTqIWEKfoaPAdPt887QmT7BQxpUoV66ZQAIU6K2gD6LeYXaCVhKjzZdE7gMtPWey7iOMqwemsRD+KqGTallKVwTTVeFH4SvbvxwPBtvveHvq62FxjJnazlZ/WTiHpNFnbViK8gxU9W9yuy5Zyc=",
    #     "train_date": "2017-12-23",
    #     "back_train_date": "2017-12-22",
    #     "tour_flag": "dc",
    #     "purpose_codes": "ADULT",
    #     "query_from_station_name": "遵义西",
    #     "query_to_station_name": "贵阳",
    #     "undefined": ""
    # }
    resp = req.post(url, data=data, headers=headers)
    # 反回一个验证通过信息
    if resp.status_code == requests.codes.ok:
        print(resp.text)


def user_login():
    print("user login 接口")
    url = "https://kyfw.12306.cn/otn/login/userLogin"
    resp = req.get(url, headers=headers)
    print(resp.text)


def get_004_html():
    """
    准备得到
    billMaterialsId:a1ba382722534a478592ab6518049a3a
    在请求getAdAppInfo.json使用
    :return:
    """
    print("oo4.html")
    url = "https://ad.12306.cn/res/0004.html"
    resp = req.get(url, headers=headers)
    print(resp.text)


def get_ad_application_info():
    """
    目前作用还不知道
    :return:
    """
    print("getAppInfo.json")
    url = "https://ad.12306.cn/sdk/webservice/rest/appService/getAdAppInfo.json"
    data = {
        "placementNo": "0004",
        "clientType": '2',
        "billMaterialsId": 'a1ba382722534a478592ab6518049a3a'
    }
    resp = req.get(url, params=data, headers=headers)
    print(resp)


def init_buy_page():
    print("初始化购票页面")
    url = "https://kyfw.12306.cn/otn/leftTicket/init"
    resp = req.get(url, headers=headers, cookies=cookies)
    if resp.status_code == requests.codes.ok:
        print("购票页面初始化成功!")


def query_ticket():
    """
    查询车票信息
    :return: 接口信息
    """
    print("车票查询")
    # 通过输入的地点，获取到地点-code
    from_station = "ZIW"
    to_station = "GIW"
    date = "2017-12-23"
    # print(from_station,to_station,date)
    url = 'https://kyfw.12306.cn/otn/leftTicket/query?leftTicketDTO.train_date={}&leftTicketDTO.from_station={}&leftTicketDTO.to_station={}&purpose_codes=ADULT'.format(
        date, from_station, to_station)
    # 请求url,并设置不验证
    resp = req.get(url, headers=headers, verify=False)
    if resp.status_code == requests.codes.ok:
        return resp.json()


if __name__ == "__main__":
    url = "https://kyfw.12306.cn/passport/captcha/captcha-image?login_site=E&module=login&rand=sjrand&0.6523880813900003"
    image_title = "../images/temp_title.png"
    image_code = "../images/code.png"
    del_file("../images")
    get_picture(url, image_code)

    # 坐标点
    yanSol = ['35,35', '105,35', '175,35', '245,35', '35,105', '105,105', '175,105', '245,105']
    # 输入坐标点获取到最表0-7,逗号分隔
    te = input("请输入坐标序号,逗号分隔\n")
    index = te.split(",")
    point = list()
    for x in index:
        point.append(yanSol[int(x)])
    print("输出坐标:")
    check_result = check_captcha(point)
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

            # 输入目的地，结束地，开始时间
            print("请输入出发地，目的地，出发日期，使用空格隔开")
            query_input_data = input()
            sp = query_input_data.split(" ")
            print("输入结果: 出发地:{},目的地:{},出发日期:{}".format(sp[0], sp[1], sp[2]))
            # 查询票
            qt = queryTrain(req, headers)
            query_ticket_data = qt.query_trict(sp)
            print("输出车次数据")
            print(query_input_data)
            # 检查用户
            check_user()
            # 初始化订单
            submit_order_request(query_ticket_data)
            # 初始化订单数据
            # initDc()

        else:
            print("登录失败")
    else:
        print("验证码校验失败")
