#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Dec 14 00:26:35 2019

@author: naren
"""
from flask import request
from flask_restful import Resource
from app.database import conn

class Appointments(Resource):
    
    def get(self):
        appointment = conn.execute("SELECT p.*,d.*,a.* from appointment a LEFT JOIN patient p ON a.pat_id = p.id LEFT JOIN doctor d ON a.doc_id = d.id ORDER BY date DESC").fetchall()
        return appointment
    
    def post(self):
        appointment = request.get_json(force=True)
        pat_id = appointment['pat_id']
        doc_id = appointment['doc_id']
        appointment_date = appointment['appointment_date']
        appointment['app_id'] = conn.execute('''INSERT INTO appointment(pat_id,doc_id,date)
            VALUES(?,?,?)''', (pat_id, doc_id,appointment_date)).lastrowid
        conn.commit()
        return appointment
    
class Appointment(Resource):
    
    def get(self,aid):
        return
    
    def put(self,aid):
        return
    
    def delete(self,aid):
        conn.execute("DELETE FROM appointment WHERE id=?",(aid,))
        conn.commit();
        return {'msg': 'sucessfully deleted'}