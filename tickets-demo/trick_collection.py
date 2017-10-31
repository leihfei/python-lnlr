from prettytable import PrettyTable

from stations import stations
from colorama import init, Fore

"""
    处理爬取出来的车次信息，并进行表格输出
"""

init()


class TrickCollection(object):
    def __init__(self, available_trains, options):
        self.header = ('车次 车站 时间 历时 特等座 一等 二等 高级软卧 软卧 动卧 硬卧 '
                       + '软座 硬座 无座 备注').split()
        self.available_trains = available_trains
        self.options = options

    # 将历时转化为小时和分钟的形式
    def get_duration(self, raw_train):
        duration = raw_train[10].replace(':', '小时') + '分'
        if duration.startswith('00'):
            return duration[4:]
        if duration.startswith('0'):
            return duration[1:]
        return duration



    # 返回每个车次的基本信息
    def trains(self):
        for raw_train in self.available_trains:
            # 列车号
            train_no = raw_train[3]
            # 得到什么列车并小写
            initial = train_no[0].lower()
            # 反转station所对应的字典
            stations_re = dict(zip(stations.values(), stations.keys()))
            if not self.options or initial in self.options:
                # 将车次的信息保存到列表中
                # train 出发地
                begin_station = stations_re.get(raw_train[4])
                # train 目的地
                end_station = stations_re.get(raw_train[5])
                # your 出发地
                from_station = stations_re.get(raw_train[6])
                # your 目的地
                to_station = stations_re.get(raw_train[7])
                # 判断是起始还是经过
                begin_flag = self.__check_equals(begin_station, from_station)
                end_flag = self.__check_equals(end_station, to_station)
                train = [
                    train_no,
                    '\n'.join([begin_flag + ' ' + self.__get_color(Fore.GREEN, from_station),
                               end_flag + ' ' + self.__get_color(Fore.RED, to_station)]),
                    '\n'.join([self.__get_color(Fore.GREEN, raw_train[8]),
                               self.__get_color(Fore.RED, raw_train[9])]),
                    # 时间
                    self.get_duration(raw_train),
                    # 历时
                    raw_train[32],
                    # 特等座
                    self.__show_color(raw_train[31]),
                    # 一等
                    self.__show_color(raw_train[30]),
                    # 二等
                    self.__show_color(raw_train[22]),
                    # 高级软卧
                    self.__show_color(raw_train[23]),
                    # 软卧
                    self.__show_color(raw_train[33]),
                    # 硬卧
                    self.__show_color(raw_train[28]),
                    # 软座
                    self.__show_color(raw_train[24]),
                    # 硬座
                    self.__show_color(raw_train[29]),
                    # 无座
                    self.__show_color(raw_train[26]),
                    # 备注
                    self.__show_color(raw_train[1])
                ]
                # 更改不运行车次的时间和历时
                if raw_train[14] == 'null':
                    train[2] = '--\n--'
                train[3] = '--'
                # 将空字符串转化为‘--’
                for i, item in enumerate(train):
                    if not item:
                        train[i] = '--'
                yield train

    def __check_equals(self, from_station, to_station):
        """
        检查是否是始、过
            检查你的起始站是否为该车次的起始站
            检查你的终止站是否为该车次的终止站
        :param from_station:  出发位置
        :param to_station:     结束位置
        :return: 决定了是使用‘始' 还是 ’过‘
        """
        if from_station == to_station:
            return '始'
        else:
            return '过'
    def __get_color(self, color, content):
        """
        返回颜色内容组合，并且清除该内容之后的颜色
        :param color: 传递的颜色
        :param content: 内容
        :return: 返回值为拼接上颜色
        """
        return color + content + Fore.RESET

    def __show_color(self, content):
        """
        对内容进行颜色显示，并且只显示有，其余不上色
        :param content: 需要颜色显示的内容
        :return: 返回设置结果
        """
        if content == '有':
            return Fore.GREEN + content + Fore.RESET
        else:
            return content

    def pretty_print(self):
        """
            显示内容
        :return:
        """
        pt = PrettyTable()
        pt._set_field_names(self.header)
        for train in self.trains():
            pt.add_row(train)
        print(pt)
