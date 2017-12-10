#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__author__ = "雷洪飞"

"""
 利用百度图像识别api做文字识别，目的是为了做12306的图片校验。
"""
from aip import AipOcr

# 定义常量
APP_ID = '10508877'
API_KEY = 'kpFtUgtOaxmKkNa2C0x7Q7mN'
SECRET_KEY = 'TTX5ginIXZyfGtdH8UTO4kF5M41lf3fb '

# 初始化AipFace对象
client = AipOcr(APP_ID, API_KEY, SECRET_KEY)
# 定义参数变量
options = {
    'detect_direction': 'true',
    'language_type': 'CHN_ENG',
}


class BaiDu(object):
    # 获取图片
    def get_file_content(self, file_path):
        """获取图片数据"""
        with open(file_path, 'rb') as fp:
            return fp.read()

    def get_result(self, image_url):
        """
            识别结构
        :return:  返回识别结果
        """
        image = self.get_file_content(image_url)
        return client.basicGeneral(image, options)


if __name__ == "__main__":
    # 获取图片
    baidu = BaiDu()
    # 得到识别结果
    result = baidu.get_result("image/temp_title.png")
    # 输出识别结果
    print(result['words_result'][0]['words'])
