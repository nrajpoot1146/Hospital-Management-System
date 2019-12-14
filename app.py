from flask import Flask, request
from flask_restful import Api
from app.Patient import Patients, Patient
from app.Doctor import Doctors, Doctor
from app.Appointment import Appointments, Appointment
import json

app = Flask(__name__,static_url_path="",static_folder="public_html")
api = Api(app)
api.add_resource(Patients, "/patients")
api.add_resource(Patient, "/patient/<int:pid>")
api.add_resource(Doctors, "/doctors")
api.add_resource(Doctor, "/doctor/<int:did>")
api.add_resource(Appointments, "/appointments")
api.add_resource(Appointment, "/appointment/<int:aid>")

with open("config.json") as dtFile:
    config = json.load(dtFile)

@app.route('/')
def index():
    return app.send_static_file("index.html")
    
if __name__ == '__main__':
    app.run(debug=True,host=config['host'],port=config['port']);