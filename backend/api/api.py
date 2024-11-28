from flask_restful import Api, Resource
from flask import jsonify, request
from api.models import User, db
#from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

api = Api()


def to_dict(user):
    return {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'last_login': user.last_login,
        'is_blocked': user.is_blocked
    }

# Ruta para obtener todos los usuarios (como ejemplo)
class UserList(Resource):
    def get(self):
        # Obtener todos los usuarios de la base de datos y devolverlos como JSON
        users = User.query.all()
        return jsonify([to_dict(user) for user in users])

# Ruta para registrar un nuevo usuario
class Register(Resource):
    def post(self):
        # Obtener los datos de la solicitud
        data = request.get_json()
        username = data['username']
        email = data['email']
        password = data['password']  # Aquí deberías cifrar la contraseña antes de guardarla

        # Cifrar la contraseña
        password_hash = generate_password_hash(password)

        # Agregar fecha y hora de registro
        registration_date = datetime.utcnow()  # Fecha y hora en formato UTC

        # Crear y guardar el nuevo usuario
        new_user = User(username=username, email=email, password=password_hash, registration_date=registration_date)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "User succesfully registered"}), 201

# Ruta para iniciar sesión
class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']

        # Buscar el usuario en la base de datos (deberías validar la contraseña aquí)
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            # Actualizar el campo last_login
            user.last_login = datetime.utcnow()
            db.session.commit()

            # Crear token de acceso
            access_token = create_access_token(identity=user.id)
            return jsonify({"access_token": access_token})
        return jsonify({"msg": "Invalid credentials"}), 401

# Ruta protegida para administrador (requiere JWT)
class Admin(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        if user.is_blocked:
            return jsonify({"msg": "Usuer blocked"}), 403
        # Devolver la lista de usuarios, por ejemplo
        users = User.query.order_by(User.last_login.desc()).all()
        return jsonify([to_dict(user) for user in users])
    
class DeleteUser(Resource):
    @jwt_required()  # Requiere que el usuario esté autenticado
    def delete(self, user_id):
        current_user_id = get_jwt_identity()  # Obtener el ID del usuario autenticado
        
        # Verificar si el usuario autenticado tiene permisos para eliminar (puede agregar validaciones aquí)
        user_to_delete = User.query.get(user_id)  # Buscar el usuario a eliminar
        if not user_to_delete:
            return jsonify({"msg": "User not found"}), 404

        # Eliminar el usuario
        db.session.delete(user_to_delete)
        db.session.commit()
        
        return jsonify({"msg": "User succesfully deleted"}), 200

# Añadir las rutas a la API
api.add_resource(UserList, '/users')
api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(Admin, '/admin')
api.add_resource(DeleteUser, '/delete_user/<int:user_id>')


