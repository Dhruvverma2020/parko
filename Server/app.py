import os
from flask import Flask, request, make_response
from flask_cors import CORS
import json
from database import Database

os.chdir(__file__.replace(os.path.basename(__file__), ''))

from utils.generate_otp import generate_otp
from utils.generate_session_id import sess_id

app = Flask(__name__, static_folder='../client/build')
CORS(app)


db = Database()
session = {}
pending_otp = {}

def authenticate(request):
    loginID = request.cookies.get('loginID')
    sessionID = request.cookies.get('sessionID')
    if not loginID or not sessionID:
        response = make_response("Not Logged in", 401)
    elif session.get(loginID) != sessionID:
        response = make_response("Not Logged in", 401)
        response.delete_cookie('loginID')
        response.delete_cookie('sessionID')
    # TODO


@app.route('/otp', methods=["POST"])
def otp():
    phone = request.json['phone']
    otp = generate_otp(phone)

    pending_otp[phone] = otp

@app.route('/login', methods=['POST'])
def login():
    phone = request.json['phone']
    otp = request.json['otp']

    response = make_response()

    if otp and otp == pending_otp.get(phone):
        sID = sess_id()
        session[phone] = sID

        response.status_code = 200
        response.set_cookie('loginID', phone)
        response.set_cookie('sessionID', sID)
        response.headers['Access-Control-Allow-Origin'] = request.headers['origin']
        response.headers['Access-Control-Allow-Credentials'] = True
        response.headers['Access-Control-Expose-Headers'] = 'date, etag, access-control-allow-origin, access-control-allow-credentials'

    else:
        response.status_code = 401

    return response