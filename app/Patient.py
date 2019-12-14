#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Dec 13 23:52:50 2019

@author: naren
"""
import sqlite3
from flask import request
from flask_restful import Resource
from app.database import conn

class Patients(Resource):
    
    def get(self):
        
        data = conn.execute("SELECT * FROM patient ORDER BY date DESC").fetchall()
        
        return data
    
    def post(self):
        data = request.get_json(force=True)
        first_name = data['first_name']
        last_name = data['last_name']
        insurance_no = data['insurance_no']
        address = data['address']
        mb_no = data['mb_no']
        disease = data['disease']
        data['id'] = conn.execute("INSERT INTO patient (first_name, last_name, insurance_no, mb_no, address, disease) VALUES (?,?,?,?,?,?)"
                     , (first_name, last_name, insurance_no, mb_no, address, disease)).lastrowid
        
        conn.commit()
        
        return data

class Patient(Resource):
    def get(self,pid):
        return
    
    def put(self,pid):
        
        data = request.get_json(force=True)
        first_name = data['first_name']
        last_name = data['last_name']
        insurance_no = data['insurance_no']
        address = data['address']
        mb_no = data['mb_no']
        disease = data['disease']
        conn.execute("UPDATE patient SET first_name=?, last_name=?, insurance_no=?, mb_no=?, address=?, disease=? WHERE id=?",
                     (first_name, last_name, insurance_no, mb_no, address, disease, pid))
        conn.commit()
        return data
    
    def delete(self,pid):
        try:
            conn.execute("DELETE FROM patient WHERE id=?",(pid,))
            conn.commit()
        except sqlite3.Error as e:
            return {'err': 'Appointment Exist'}
        return {'msg': 'sucessfully deleted'}