from . import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(180), unique=False, nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
    # active_from (time)
    # active_to (when logout) - time

    def __init__(self, username=None, email=None, password=None):
        self.username = username
        self.email = email
        self.password = password

    @property
    def is_active(self):
        return self.active
    
    def __repr__(self):
        return f'<id={self.id}, username={self.username}, email={self.email}, active={self.is_active}>'
    
    def to_dict(self):
        return { "id": self.id, "username": self.username, "email": self.email, "is_active": self.is_active } 
    