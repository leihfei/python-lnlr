#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import requests
import urllib3
from PIL import Image, ImageFilter, ImageEnhance
from bs4 import BeautifulSoup

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

__author__ = "雷洪飞"


class RecoginitionContainer(object):

    def __init__(self, base_img_url):
        self.base_img_url = base_img_url

    url = "http://image.baidu.com/pictureup/uploadshitu?fr=flash&fm=index&pos=upload"

    headers = {
        "User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"}

    def __upload_pic__(slef, img, filex, url):
        """上传图片，得到图片地址"""
        img.save(slef.base_img_url + "/query_temp_img" + filex + ".png")
        raw = open(slef.base_img_url + "/query_temp_img" + filex + ".png", 'rb').read()
        files = {
            'fileheight': "0",
            'newfilesize': str(len(raw)),
            'compresstime': "0",
            'Filename': "image.png",
            'filewidth': "0",
            'filesize': str(len(raw)),
            'filetype': 'image/png',
            'Upload': "Submit Query",
            'filedata': ("image.png", raw)
        }
        resp = requests.post(url, files=files, headers=slef.headers, verify=False)
        redirect_url = "http://image.baidu.com" + resp.text
        return redirect_url

    def __get_query_content__(slef, query_url):
        response = requests.get(query_url, headers=slef.headers, verify=False)
        li = list()
        if response.status_code == requests.codes.ok:
            bs = BeautifulSoup(response.text, "html.parser")
            re = bs.find_all("a", class_="guess-info-word-link guess-info-word-highlight")
            for link in re:
                li.append(link.get_text())
                # print(link.get_text())
            # 再次获取图中动物可能是
            te = bs.find_all("ul", class_="shituplant-tag")
            for l in te:
                # 得到有可能包含的数据
                for child in l.children:
                    try:
                        li.append(child.get_text())
                    except:
                        pass
            # 再次获取相似图片，其中在有一个图片描述，进行获取就知道,重新掉了一个接口
            # pc_search 替换成similar在搜索一次
            if len(li) == 0:
                once_url = query_url.replace("pc_search", "similar")
                resp = requests.get(once_url, headers=slef.headers, verify=False)
                js = resp.json()
                #print("查找相似图片")
                for fromTitle in js['data']:
                    li.append(fromTitle['fromPageTitle'])
            return "|".join(x for x in li)

    def get_pic_content(slef, img_url):
        box = (0, 41, 295, 186)
        Image.open(img_url).crop(box).save(img_url)

    def get_text(slef, img_url):
        li = list()
        ImageEnhance.Contrast(Image.open(img_url)).enhance(1.3).save(img_url)
        imgs = Image.open(img_url)
        imgs.filter(ImageFilter.BLUR).filter(ImageFilter.MaxFilter(23))
        imgs.convert('L')
        x_width, y_heigth = imgs.size
        # 得到每一张图片应该的大小
        width = x_width / 4
        heigth = y_heigth / 2
        for x_ in range(0, 2):
            for y_ in range(0, 4):
                left = y_ * width
                right = (y_ + 1) * width
                # 得到图片位置
                index = (x_ * 4) + y_
                if x_ == 0:
                    box = (left, x_ * heigth + 21, right, (x_ + 1) * heigth + 21)
                else:
                    box = (y_ * width, x_ * heigth + 21, (y_ + 1) * width, (x_ + 1) * heigth)
                    # 得到查询地址
                query_url = slef.__upload_pic__(imgs.crop(box), str(x_) + str(y_), slef.url)
                # 进行查询，返回结果
                text = slef.__get_query_content__(query_url)
                # 计算坐标
                # 由于12306官方验证码是验证正确验证码的坐标范围,我们取每个验证码中点的坐标(大约值)
                yanSol = ['35,35', '105,35', '175,35', '245,35', '35,105', '105,105', '175,105', '245,105']
                # 将坐标保存
                li.append({yanSol[index]: text})
                # print("识别结果:")
                # print(text)
        return li


if __name__ == "__main__":
    img_url = "../images/code.png"
    c = RecoginitionContainer("../images")
    c.get_text(img_url)
