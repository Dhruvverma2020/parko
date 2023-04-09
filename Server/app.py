import os
from flask import Flask, request, make_response
from flask_cors import CORS
import json
from database import Database
import datetime

os.chdir(__file__.replace(os.path.basename(__file__), ''))

from utils.generate_otp import generate_otp
from utils.generate_session_id import sess_id
from utils.hash import hash

from data.spots import spots

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


@app.route('/authenticate', methods=['POST'])
def authenticate_login():
    return authenticate(request)

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

        exists = db.user_exists(phone)


        response.status_code = 200
        response.data = json.dumps({
            'loginID': phone,
            'sessionID': sID,
            'exists': exists
        })
    else:
        response.status_code = 401

    return response

@app.route('/signup/user', methods=['POST'])
def signup():
    response = authenticate(request)

    if response.status_code == 200:
        fname = request.json['fname']
        lname = request.json['lname']
        email = request.json['email']
        phone = request.json.get('loginID')
        # username = request.json['username']
        # password = request.json['password']
        # password_hash = hash(password)

        db.new_user(fname, lname, email, phone, username="", password_hash="")

    return response

@app.route('/signup/owner', methods=['POST'])
def signup_own():
    response = authenticate(request)

    if response.status_code == 200:
        fname = request.json['fname']
        lname = request.json['lname']
        phone = request.json.get('loginID')
        # username = request.json['username']
        # password = request.json['password']
        # password_hash = hash(password)

        db.new_space_owner(fname, lname, phone, username="", password_hash="")

    return response


@app.route('/vehicle/new', methods=['POST'])
def register_vehicle():
    response = authenticate(request)

    if response.status_code == 200:
        number = request.json['number']
        model = request.json['model']
        type_name = request.json['type']
        loginID = request.json.get('loginID')
        user_id = db.get_user_id(loginID)

        db.register_vehicle(number, model, type_name, user_id)

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


@app.route('/reserve', methods=['POST'])
def reserve():
    response = authenticate(request)

    if response.status_code == 200:
        loginID = request.json.get('loginID')
        user_id = db.get_user_id(loginID)

        transaction_id = request.json['transaction_id']
        amount = request.json['amount']
        payment_type = request.json['payment_type']

        db.register_payment(transaction_id, amount, payment_type)
        
        # spot_id = request.json['spot_id']
        # start_time = request.json['start']
        # end_time = request.json['end']

        # Parse start and end times in format '1998-01-23 12:45:56'

        # db.reserve_spot(spot_id, user_id, start_time, end_time)

        space_id = request.json.get('space_id')
        spot = request.json.get('spot')
        t = request.json.get('time')
        if space_id and t and spot:
            spots[space_id][spot] = t

    return response


@app.route('/spaces', methods=['GET'])
def get_spaces():
    spaces = db.get_all_spaces()
    spaces_dict = {"spaces": []}
    for space in spaces:
        space_dict = {
            "id": space[0],
            "name": space[1],
            "lat": space[2],
            "lon": space[3],
            "type": space[4]
        }
        spaces_dict['spaces'].append(space_dict)

    response = make_response()
    response.status_code = 200
    response.data = json.dumps(spaces_dict)

    return response

@app.route('/space/<int:id>', methods=['GET'])
def get_spots(id):
    # spots = db.get_all_spots(id)
    # types = db.get_vehicle_types()

    spots_dict = {"spots": []}
    # for spot in spots:
    #     spot_dict = {
    #         "spot_id": spot[0],
    #         "spot_num": spot[1],
    #         "price": spot[2],
    #         "block": spot[3],
    #         "vehicle_type": types.get(spot[4])
    #     }
    #     spots_dict['spots'].append(spot_dict)

    for spot in spots[id].keys():
        spots_dict['spots'].append({
            "spot": spot,
            "availablein": spots[id][spot]
        })

    response = make_response()
    response.status_code = 200
    response.data = json.dumps(spots_dict)

    return response

@app.route('/vehicles', methods=['POST'])
def get_vehicles():
    response = authenticate(request)

    if response.status_code == 200:
        loginID = request.json.get('loginID')
        user_id = db.get_user_id(loginID)

        vehicles = db.get_vehicles(user_id)
        types = db.get_vehicle_types()

        vehicles_dict = {"vehicles": []}

        for vehicle in vehicles:
            vehicle_dict = {
                "number": vehicle[0],
                "model": vehicle[1],
                "vehicle_type": types.get(vehicle[2])
            }
            vehicles_dict['vehicles'].append(vehicle_dict)
        
        response.data = json.dumps(vehicles_dict)

    return response



if __name__ == '__main__':
    try:
        app.run(use_reloader=True, host='0.0.0.0', port=5000, threaded=True)
    finally:
        db.conn.close()