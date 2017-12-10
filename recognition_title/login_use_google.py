#!/usr/bin/env python3
# -*- coding: utf-8 -*-
__author__ = "雷洪飞"

"""
 利用google pytesseract做文字识别，目的是为了做12306的图片校验。
"""
try:
    import Image
    import ImageEnhance
except ImportError:
    from PIL import Image, ImageEnhance

import pytesseract


class Google(object):
    def get_text(self, base_img_url):
        """
         识别图片中的文字
        :param base_img_url:
        :return:
        """
        image = Image.open(base_img_url)
        ImageEnhance.Contrast(image).enhance(3.0).convert("L").save(base_img_url)
        really_image = Image.open(base_img_url)
        # 配置tesseract 引擎位置
        pytesseract.pytesseract.tesseract_cmd = 'K:\Program Files\Tesseract-OCR\\tesseract.exe'
        # 配置语言包
        tessdata_dir_config = '--tessdata-dir "K:\\Program Files\\Tesseract-OCR\\tessdata"'
        # 使用pytesseract文字识别
        return pytesseract.image_to_string(really_image, lang='chi_sim', config=tessdata_dir_config)
