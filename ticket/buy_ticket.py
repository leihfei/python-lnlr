#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os

import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
__author__ = "雷洪飞"

"""
 12306登录接口，获取到了验证码标题的内容。
"""
headers = {
    "User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"}

req = requests.session()

login_id = ""


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
        'password': "",
        'appid': 'otn'
    }
    result = req.post(url=loginUrl, data=data, headers=headers, verify=False)
    print("登录返回结果:")
    print(result.text)
    print(result.json())
    res = result.json()
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
    data = {
        "appid": "otn"
    }
    url = "https://kyfw.12306.cn/passport/web/auth/uamtk"
    response = req.post(url, data=data, headers=headers)
    print("输出uamtk:")
    print(response.text)


def get_user_info():
    """
    获取用户信息
    :return:
    """
    url_info = "https://kyfw.12306.cn/otn/confirmPassenger/getPassengerDTOs"
    data = {
        "_json_att": "",
        "REPEAT_SUBMIT_TOKEN": login_id
    }
    response = req.post(url_info, data=data, headers=headers)
    print(response.text)


def check_uamauthclient():
    url = "https://kyfw.12306.cn/otn/uamauthclient"
    data = {
        "tk": login_id
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
        te = resp.json()
        if te["result_message"] == "验证通过":
            print("用户名：", te['username'])


if __name__ == "__main__":
    url = "https://kyfw.12306.cn/passport/captcha/captcha-image?login_site=E&module=login&rand=sjrand&0.6523880813900003"
    image_title = "../imagess/temp_title.png"
    image_code = "../imagess/code.png"
    del_file("../imagess")
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
            # 验证
            # 登录
            auth_uamtk()
            # 获取tk
            check_uamauthclient()
            get_user_info()
            # hR4HLYy_j2cKBwW1l1MpLRSGGRUJNUXB5EoaGeF3Qlooz1210
        else:
            print("登录失败")
    else:
        print("验证码校验失败")
