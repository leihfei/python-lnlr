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


def get_title_pic(img_url, img_title):
    # 读取图片
    image = Image.open(img_url)
    # image.convert("L")
    box = (116, 0, 238, 30)
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


def login_get_data(url, image_code, image_title):
    # 删除images所有文件
    del_file("../images")
    get_picture(url, image_code)
    get_title_pic(image_code, image_title)
    try:
        print("调用百度API结果")
        baidu = BaiDu()
        result = baidu.get_result(image_title)
        print(result)
    except Exception:
        print("出现识别异常，请重试!")

    if len(result['words_result']) == 0:
        print("识别标题失败,正在重新尝试....")
        login_get_data(url, image_code, image_title)
    print("开始对图片内容进行识别....")
    c = RecoginitionContainer("../images")
    # 得到了坐标和识别出来的内容，或者相似图片的标题
    lists = c.get_text(image_code)
    point = list()
    # 进行内容比对
    print("正在进行内容比对......")
    for li in lists:
        # 得到每一个坐标点和内容
        title_text = result['words_result'][0]['words']
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
    print()
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
                'username': '18788638847',
                'password': "Diamond7nuo",
                'appid': 'otn'
            }
            result = req.post(url=loginUrl, data=data, headers=headers, verify=False)
            mes = result.json()['result_message']
            # 结果的编码方式是Unicode编码，所以对比的时候字符串前面加u,或者mes.encode('utf-8') == '登录成功'进行判断，否则报错
            if mes == u'登录成功':
                print
                '恭喜你，登录成功，可以购票!'
            else:
                print
                '对不起，登录失败，请检查登录信息!'
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
