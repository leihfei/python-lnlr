#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
命令行解析器

Usage:
	lnlr.py [options] <from> <to> <date>

Options:
	-z  直达
        -g  高铁
        -t  特快
        -d  动车
        -k  快速
 	-v,--help   帮助	

"""

import requests
from docopt import docopt
from stations import stations
from trick_collection import TrickCollection
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def cli():
	"""解析命令行参数，并且得到车次信息"""
	arguments = docopt(__doc__)
	# 通过输入的地点，获取到地点-code
	from_station = stations.get(arguments['<from>'])
	to_station = stations.get(arguments['<to>'])
	date = arguments['<date>']
	#print(from_station,to_station,date)
	url='https://kyfw.12306.cn/otn/leftTicket/query?leftTicketDTO.train_date={}&leftTicketDTO.from_station={}&leftTicketDTO.to_station={}&purpose_codes=ADULT'.format(date,from_station,to_station)
	headers = {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
	}
	try:
		# 请求url,并设置不验证
		response = requests.get(url,headers=headers,verify=False)
		response.encoding='utf-8'    	
		options =''.join([key for key,value in arguments.items() if value is True])
		#print(options)
		#print(response.status_code)
		# 得到我们需要的数据
		availabel_trains = response.json()['data']['result']
		# 但是那个格式我们不能直接使用，那么就需要进行把数据格式化一下
		availabel_trains = [i.split('|') for i in availabel_trains]
		#print(availabel_trains)
		TrickCollection(availabel_trains,options).pretty_print()
	except:
		print("查询错误!")

if __name__=="__main__":
	cli()

