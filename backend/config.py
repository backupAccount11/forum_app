from configparser import ConfigParser

config_parser = ConfigParser()
config_parser.read('config.ini')

class Config:
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = config_parser.get('keys', 'FLASK_KEY')
    SESSION_TYPE = 'filesystem'

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = f"mysql://{config_parser.get('mysql', 'user')}:{config_parser.get('mysql', 'password')}@{config_parser.get('mysql', 'host')}/{config_parser.get('mysql', 'db')}"

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = f"mysql://{config_parser.get('mysql', 'user')}:{config_parser.get('mysql', 'password')}@{config_parser.get('mysql', 'host')}/{config_parser.get('mysql', 'db')}"
