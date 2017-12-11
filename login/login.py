#!/usr/bin/env python3
# -*- coding: utf-8 -*-
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


def get_title_pic(img_url, img_title):
    # 读取图片
    image = Image.open(img_url)
    # image.convert("L")
    box = (116, 0, 180, 30)
    t = image.crop(box)
    t.save(img_title)


def get_picture(get_pic_url, img_code):
    headers = {
        "User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"}
    response = requests.get(get_pic_url, headers=headers, verify=False)
    response.encoding = 'utf-8'
    if response.status_code == 200:
        with open(img_code, "wb") as f:
            f.write(response.content)
            print("图片下载成功")
            return True
    else:
        print("图片下载失败，正在重试....")
        get_picture(get_pic_url, img_code)


if __name__ == "__main__":
    url = "https://kyfw.12306.cn/passport/captcha/captcha-image?login_site=E&module=login&rand=sjrand&0.6523880813900003"
    image_title = "../images/temp_title.png"
    image_code = "../images/code.png"
    get_picture(url, image_code)
    get_title_pic(image_code, image_title)
    try:
        print("调用百度API结果")
        baidu = BaiDu()
        result = baidu.get_result(image_title)
        print(result)
    except Exception:
        print("出现识别异常，请重试!")

    print("开始识别图片内容")
    c = RecoginitionContainer("../images")
    list = c.get_text(image_code)
    print(list)
