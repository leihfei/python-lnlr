#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

__author__ = "雷洪飞"


def upload_image(img_url, url):
    img_file = open(img_url, "rb")
    file = {
        "file": ("image.png", img_file.read())
    }
    headers = {
        "User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"
    }
    param = {
        "fr": "psnewindex",
        "target": "pcSearchImage",
        "needJson": "true",
        "id": "WU_FILE_0",
        "name": "temp_title/png",
        "type": "image/png",
        "lastModifiedDate": "Sun Oct 09 2016 20:17:34 GMT 0800 (中国标准时间)",
        "size": len(img_file.read()),
        'Upload': "Submit Query"
    }
    result = requests.post(url, params=param, files=file, headers=headers, verify=False)
    print(result.url)
    result.encoding = "utf-8"
    if result.status_code == 200:
        print(result.text)


if __name__ == "__main__":
    print("开始识别八张图片内容")
    upload_url = "https://sp1.baidu.com/70cHazva2gU2pMbgoY3K/n/image"
    image_url = "temp_title.png"
    upload_image(image_url, upload_url)
