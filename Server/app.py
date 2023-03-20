import os
from flask import Flask, request, make_response
from flask_cors import CORS
import json
from database import Database

os.chdir(__file__.replace(os.path.basename(__file__), ''))

from utils.generate_otp import generate_otp
from utils.generate_session_id import sess_id
from utils.hash import hash

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
    else:
        response = make_response()
        response.status_code = 200
    return response


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

@app.route('/signup/user', methods=['POST'])
def signup():
    fname = request.json['fname']
    lname = request.json['lname']
    email = request.json['email']
    phone = request.json['phone']
    username = request.json['username']
    password = request.json['password']
    password_hash = hash(password)

    db.new_user(fname, lname, email, phone, username, password_hash)

    return "Ok"

@app.route('/signup/owner', methods=['POST'])
def signup_own():
    fname = request.json['fname']
    lname = request.json['lname']
    phone = request.json['phone']
    username = request.json['username']
    password = request.json['password']
    password_hash = hash(password)

    db.new_space_owner(fname, lname, phone, username, password_hash)

    return 200


@app.route('/vehicle/new', methods=['POST'])
def register_vehicle():
    response = authenticate(request)

    if response.status_code == 200:
        number = request.json['number']
        model = request.json['model']
        type_name = request.json['type']
        loginID = request.json.get('loginID')

        db.register_vehicle(number, model, type_name, loginID)

    return response

@app.route('/space/new', methods=['POST'])
def register_space():
    response = authenticate(request)

    if response.status_code == 200:
        name = request.json['name']
        space_type = request.json['type']
        capacity = request.json['capacity']
        lat = request.json['lat']
        lon = request.json['lon']
        tel = request.json['tel']
        loginID = request.json.get('loginID')

        space_id = db.new_space(name, space_type, capacity, lat, lon, loginID, tel)

        response.data = json.dumps({
            "space_id": space_id
        })

    return response

@app.route('/space/<int:id>/add', methods=['POST'])
def register_spot(id):
    response = authenticate(request)

    if response.status_code == 200:
        owner_phone = db.get_space_owner_phone(id)
        if not owner_phone == request.json.get('loginID'):
            response.status_code = 403
        else:
            for spot in request.json['spots']:
                spot_num = spot['number']
                price = spot['price']
                block = spot['block']
                vehicle_type = spot['vehicle_type']

                db.new_spot(id, spot_num, price, block, vehicle_type)

    return response

if __name__ == '__main__':
    try:
        app.run(use_reloader=True, host='0.0.0.0', port=5000, threaded=True)
    finally:
        db.conn.close()