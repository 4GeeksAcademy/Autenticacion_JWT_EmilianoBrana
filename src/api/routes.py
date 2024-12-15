"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required
logged_in_users = []

api = Blueprint('api', __name__)
CORS(api)

logged_in_users = []

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/api/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    return jsonify({"msg": "Welcome to the dashboard!"}), 200

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400


    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)

    return jsonify({"message": "User created successfully", "access_token": access_token}), 201

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    user = User.query.filter_by(email=email).first()

    if user and user.password == password:  # Validate password
        token = create_access_token(identity=user.id)
        return jsonify({
            'token': token,
            'user': {'email': user.email}
        }), 200
    if email not in logged_in_users:
            logged_in_users.append(email)
            return jsonify({"msg": "Login successful", "user": email}), 200
    else:
            return jsonify({"msg": "Invalid email or password"}), 401
    
@api.route("/api/login", methods=["GET"])
def get_logged_in_users():
    if logged_in_users:
        return jsonify({"logged_in_users": logged_in_users}), 200
    else:
        return jsonify({"msg": "No users are currently logged in"}), 200