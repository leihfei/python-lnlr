#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os

import requests
import urllib3
from PIL import Image

from recoginition_container.get_container import RecoginitionContainer
from recognition_title.login_use_baidu import BaiDu

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
__author__ = "雷洪飞"

"""
 12306登录接口，获取到了验证码标题的内容。
"""
headers = {
    "User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"}

req = requests.session()


def get_title_pic(img_url, img_title, time):
    # 读取图片
    if time == 1:
        box = (116, 0, 175, 30)
    else:
        box = (175, 0, 238, 30)
    image = Image.open(img_url)
    image.convert("L")
    t = image.crop(box)
    t.save(img_title)


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


def get_title_context(image_code, image_title):
    """
    两次识别文字标题
    :param image_code:
    :param image_title:
    :return:
    """
    # 标题内容
    result = list()
    print("调用百度API进行标题识别:")
    for index in range(1, 3):
        get_title_pic(image_code, image_title, index)
        try:
            baidu = BaiDu()
            res = baidu.get_result(image_title)
            print("标题识别返回原始数据")
            print(res)
            if len(res['words_result']) != 0:
                result.append(res['words_result'][0]['words'])
        except Exception:
            print("出现识别异常，正在重试!")
            get_title_context(image_code, image_title)
    return result


def login_get_data(url, image_code, image_title):
    # 删除images所有文件
    del_file("../images")
    get_picture(url, image_code)

    # 由于验证码难度升级，成了两个东西，比如：本子，订书机这种形式，那么
    # 我需要进行两次分割，并进行循环判断才可以
    point = list()
    result = get_title_context(image_code, image_title)
    if len(result) == 0:
        print("识别标题失败,正在重新尝试....")
        login_get_data(url, image_code, image_title)
    else:
        print("标题识别结果：")
        print(result)

        # 对图片内容进行识别
    print("开始对图片内容进行识别....")
    c = RecoginitionContainer("../images")
    # 得到了坐标和识别出来的内容，或者相似图片的标题
    lists = c.get_text(image_code)
    # 进行内容比对
    print("正在进行内容比对......")
    for li in lists:
        # 得到每一个坐标点和内容
        # 循环标题，进行比对
        for title_text in result:
            for po, value in li.items():
                if title_text in value:
                    # 判断当前坐标点是否存在
                    if po not in point:
                        print("识别出一个坐标点")
                        point.append(po)
            # 再次对标题进行分割
            for tx in title_text:
                for po, value in li.items():
                    if tx in value:
                        # 判断当前坐标点是否存在
                        if po not in point:
                            print("识别出一个坐标点")
                            point.append(po)
    # 打印出图片的内容
    print(point)
    return point


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


def login():
    url = "https://kyfw.12306.cn/passport/captcha/captcha-image?login_site=E&module=login&rand=sjrand&0.6523880813900003"
    image_title = "../images/temp_title.png"
    image_code = "../images/code.png"
    point = login_get_data(url, image_code, image_title)
    if len(point) != 0:
        # 进行登录操作
        print("进行尝试登录....")
        check = check_captcha(point)
        if check is True:
            print("验证码验证成功......")
            loginUrl = "https://kyfw.12306.cn/passport/web/login"
            data = {
                'username': 'account',
                'password': "password",
                'appid': 'otn'
            }
            result = req.post(url=loginUrl, data=data, headers=headers, verify=False)
            print("登录返回结果:")
            print(result.text)
        else:
            print("验证码验证失败，正在重新尝试....")
            login()
    else:
        # 再次调用识别
        print("未能成功识别图片内容，正在重试.....")
        login()


if __name__ == "__main__":
    try:
        login()
    except:
        print("抛出异常，正在重试....")
        login()
