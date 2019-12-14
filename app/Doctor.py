#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Dec 14 00:23:20 2019

@author: naren
"""
import sqlite3
from flask import request
from flask_restful import Resource
from app.database import conn

class Doctors(Resource):
    def get(self):
        data = conn.execute("SELECT * FROM doctor ORDER BY date DESC").fetchall()
        
        return data
    
    def post(self):
        data = request.get_json(force=True)
        first_name = data['first_name']
        last_name = data['last_name']
        address = data['address']
        mb_no = data['mb_no']
        speciality = data['speciality']
        data['id'] = conn.execute("INSERT INTO doctor (first_name, last_name, mb_no, address, speciality) VALUES (?,?,?,?,?)"
                     , (first_name, last_name, mb_no, address, speciality)).lastrowid
        
        conn.commit()
        
        return data
    
class Doctor(Resource):
    def get(self,did):
        return
    
    def put(self,did):
        
        data = request.get_json(force=True)
        first_name = data['first_name']
        last_name = data['last_name']
        address = data['address']
        mb_no = data['mb_no']
        speciality = data['speciality']
        conn.execute("UPDATE doctor SET first_name=?, last_name=?, mb_no=?, address=?, speciality=? WHERE id=?",
                     (first_name, last_name, mb_no, address, speciality, did))
        conn.commit()
        return data
    
    def delete(self,did):
        try:
            conn.execute("DELETE FROM doctor WHERE id=?",(did,))
            conn.commit()
        except sqlite3.Error as e:
            return {'err': 'Appointment Exist'}
        return {'msg': 'sucessfully deleted'}
    