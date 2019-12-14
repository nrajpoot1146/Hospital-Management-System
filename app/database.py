#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Dec 14 00:35:32 2019

@author: naren
"""

import sqlite3
import json

with open("config.json") as dtFile:
    config = json.load(dtFile)
    
conn = sqlite3.connect(config['db'],check_same_thread=False)
conn.execute("pragma foreign_keys=ON")

def dict_factory(cursor, row):
    """This is an function use to fonmat the json when retirve from the  myswl database"""
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


conn.row_factory = dict_factory

conn.execute('''CREATE TABLE if not exists patient
(id INTEGER PRIMARY KEY AUTOINCREMENT,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
insurance_no TEXT NOT NULL,
mb_no TEXT NOT NULL,
date DATE DEFAULT (datetime('now','localtime')),
address TEXT NOT NULL,
disease TEXT NOT NULL);''')

conn.execute('''CREATE TABLE if not exists doctor
(id INTEGER PRIMARY KEY AUTOINCREMENT,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
mb_no TEXT NOT NULL,
date DATE DEFAULT (datetime('now','localtime')),
address TEXT NOT NULL,
speciality TEXT NOT NULL);''')

conn.execute('''CREATE TABLE if not exists appointment
(id INTEGER PRIMARY KEY AUTOINCREMENT,
pat_id INTEGER NOT NULL,
doc_id INTEGER NOT NULL,
date DATE NOT NULL,
FOREIGN KEY(pat_id) REFERENCES patient(id),
FOREIGN KEY(doc_id) REFERENCES doctor(id));''')

    
