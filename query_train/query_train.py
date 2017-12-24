#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
查询车票信息
"""

import requests


___author__ = "雷洪飞"

from station_code.stations import stations


class queryTrain(object):

    def __init__(self, req, headers):
        self.req = req
        self.headers = headers

    def query_trict(self, param):
        # 通过输入的地点，获取到地点-code
        from_station = stations.get(param[0])
        to_station = stations.get(param[1])
        date = param[2]
        # print(from_station,to_station,date)
        url = 'https://kyfw.12306.cn/otn/leftTicket/query?leftTicketDTO.train_date={}&leftTicketDTO.from_station={}&leftTicketDTO.to_station={}&purpose_codes=ADULT'.format(
            date, from_station, to_station)
        try:
            # 请求url,并设置不验证
            response = self.req.get(url, headers=self.headers, verify=False)
            response.encoding = 'utf-8'
            print(response.text)
            # 得到我们需要的数据
            availabel_trains = response.json()['data']['result']
            # 但是那个格式我们不能直接使用，那么就需要进行把数据格式化一下
            availabel_trains = [i.split('|') for i in availabel_trains]
            return availabel_trains
        except Exception:
            print("出现查询车票异常.....")


if __name__ == "__main__":
    headers = {
        "User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"}

    # 输入目的地，结束地，开始时间
    print("请输入出发地，目的地，出发日期，使用空格隔开")
    query_input_data = input()
    sp = query_input_data.split(" ")
    print("输入结果: 出发地:{},目的地:{},出发日期:{}".format(sp[0], sp[1], sp[2]))
    # 查询票
    qt = queryTrain(requests.session(), headers)
    query_ticket_data = qt.query_trict(sp)
    print("输出车次数据")
    print(query_input_data)
