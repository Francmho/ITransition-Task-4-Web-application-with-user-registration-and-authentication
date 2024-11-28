from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import DeclarativeMeta
import json
from datetime import datetime

db = SQLAlchemy()

# Modelo User para la autenticación de usuarios
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    last_login = db.Column(db.DateTime)
    is_blocked = db.Column(db.Boolean, default=False)
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)  # Fecha de registro

    def __repr__(self):
        return f'<User {self.username}>'
    
# Modelo Player como ejemplo adicional
class Player(db.Model):
    __tablename__ = 'players'
    firstname = db.Column(db.String(100), nullable=False, primary_key=True)
    lastname = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return '<Player %r>' % self.firstname + ' ' + self.lastname


def to_dict(obj):
    if isinstance(obj.__class__, DeclarativeMeta):
        # an SQLAlchemy class
        fields = {}
        for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
            data = obj.__getattribute__(field)
            try:
                json.dumps(data)  # this will fail on non-encodable values, like other classes
                if data is not None:
                    fields[field] = data
            except TypeError:
                pass
        # a json-encodable dict
        return fields