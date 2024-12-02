"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    body=request.json
    email = body.get("email", None)
    password = body.get("password", None)

    user = User.query.filter_by(email=email).one_or_none()

    if user == None:
        return jsonify({"msg": "Bad email or password"}), 404

    if user.password != password:
        return jsonify({"msg": "Bad email or password"}), 404

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 201


@api.route("/signup", methods=['POST'])
def signup():
    body = request.json 
    email = body.get("email")
    password = body.get("password")
    new_user = User(email, password)
    db.session.add(new_user)
    db.session.commit() 
    return jsonify({"msg": "User created"}), 201

