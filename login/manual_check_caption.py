"""
    进行手动登陆
"""

__author__ = "雷洪飞"
import os

import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

headers = {
    "User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"}

req = requests.session()


class manual_check_captcha(object):
    def __init__(self, parent_file_url, http_url):
        self.image_title = parent_file_url + "/temp_title.png"
        self.image_code = parent_file_url + "/code.png"
        # 删除文件
        self.__del_file__(parent_file_url)
        # 下载图片
        self.__get_picture__(http_url, self.image_code)

    def __get_picture__(self, get_pic_url, img_code):
        """
        下载图片放入指定位置
        :param get_pic_url:
        :param img_code:
        :return:
        """
        response = req.get(get_pic_url, headers=headers, verify=False)
        response.encoding = 'utf-8'
        if response.status_code == 200:
            with open(img_code, "wb") as f:
                f.write(response.content)
                print("图片下载成功")
                return True
        else:
            print("图片下载失败，正在重试....")
            self.__get_picture__(get_pic_url, img_code)

    def __del_file__(slef, path):
        """
        删除该路径下的图片
        :param path:
        :return:
        """
        for i in os.listdir(path):
            # 取文件绝对路径
            path_file = os.path.join(path, i)
            if os.path.isfile(path_file):
                os.remove(path_file)
            else:
                slef.__del_file__(path_file)

    def check_captcha(slef):
        """
        进行验证码检查
        :param point:
        :return:
        """

        # 坐标点
        yanSol = ['35,35', '105,35', '175,35', '245,35', '35,105', '105,105', '175,105', '245,105']
        # 输入坐标点获取到最表0-7,逗号分隔
        te = input("请输入坐标序号,逗号分隔\n")
        index = te.split(",")
        point = list()
        for x in index:
            point.append(yanSol[int(x)])
        print("输出坐标:")

        # 验证码地址
        check_url = "https://kyfw.12306.cn/passport/captcha/captcha-check"
        data = {
            "answer": ",".join(point),
            "login_site": "E",
            "rand": "sjrand"
        }
        # print(分析js文件)
        response = req.post(check_url, data=data,
                            headers=headers, verify=False)
        print(response.text)
        if response.status_code != 200:
            return False
        code = response.json()['result_code']
        # 取出验证结果，4：成功  5：验证失败  7：过期
        if str(code) == '4':
            return (True, req)
        else:
            return (False, req)


if __name__ == "__main__":
    url = "https://kyfw.12306.cn/passport/captcha/captcha-image?login_site=E&module=login&rand=sjrand&0.6523880813900003"
    parent_file_url = "../images"
    mck = manual_check_captcha(parent_file_url, url)
    check_result, htreq = mck.check_captcha()
    print(check_result, htreq)
