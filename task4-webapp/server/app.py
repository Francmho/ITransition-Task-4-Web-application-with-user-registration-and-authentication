from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/dbname'
db = SQLAlchemy(app)
jwt = JWTManager(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)  # Unique Index
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    last_login = db.Column(db.DateTime)
    is_blocked = db.Column(db.Boolean, default=False)

# Registration Route
@app.route('/register', methods=['POST'])
def register():
    # Handle registration logic
    return jsonify({"msg": "User registered successfully"}), 201

# Login Route
@app.route('/login', methods=['POST'])
def login():
    # Handle login logic, generate JWT
    return jsonify({"access_token": create_access_token(identity=user.id)})

# Protected Admin Route
@app.route('/admin', methods=['GET'])
@jwt_required()
def admin():
    current_user = get_jwt_identity()
    # Check if the user is blocked
    # Return user list sorted by last_login
    return jsonify(users), 200
