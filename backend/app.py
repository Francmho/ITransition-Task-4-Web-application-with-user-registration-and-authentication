from flask import Flask
from flask_cors import CORS
from api.api import api
from api.models import db
from api.config import Config
from flask_jwt_extended import JWTManager

def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/dbname'
    app.config['SECRET_KEY'] = 'this_is _the_most_difficult_secret_key'

    # Inicializar extensiones
    CORS(app)
    JWTManager(app)
    db.init_app(app)
    api.init_app(app) # Registra las rutas desde api.py

    return app

app = create_app(Config)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True, threaded=True)


