#!/usr/bin/env python3
# coding: utf-8

import requests
import re
from pprint import pprint

def get_station():
	url = 'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=1.9028'
	response = requests.get(url,verify=False)
	station = re.findall(u'([\u4e00-\u95fa5]+)\|([A-Z]+)',response.text)
	pprint(dict(station),indent=4)

if __name__=="__main__":
	get_station()
