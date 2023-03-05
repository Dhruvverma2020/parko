import os
from flask import Flask, request, make_response
from flask_cors import CORS
import json
from database import Database

os.chdir(__file__.replace(os.path.basename(__file__), ''))

from utils.generate_otp import generate_otp
from utils.generate_session_id import sess_id

app = Flask(__name__)
CORS(app)


db = Database()
session = {}
pending_otp = {}

def authenticate(request):
    loginID = request.json.get('loginID')
    sessionID = request.json.get('sessionID')
    if not loginID or not sessionID:
        response = make_response("Not Logged in", 401)
    elif session.get(loginID) != sessionID:
        response = make_response("Not Logged in", 401)
    # TODO


@app.route('/otp', methods=["POST"])
def otp():
    phone = request.json['phone']
    otp = generate_otp(phone)

    pending_otp[phone] = otp
    return make_response("sent", 200)

@app.route('/login', methods=['POST'])
def login():
    phone = request.json['phone']
    otp = request.json['otp']

    response = make_response()

    if otp and otp == pending_otp.get(phone):
        sID = sess_id()
        session[phone] = sID

        del pending_otp[phone]

        response.status_code = 200
        response.data = json.dumps({
            'loginID': phone,
            'sessionID': sID
        })
    else:
        response.status_code = 401

    return response

if __name__ == '__main__':
    app.run(use_reloader=True, host='0.0.0.0', port=5000, threaded=True)