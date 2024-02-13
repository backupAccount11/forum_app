from configparser import ConfigParser

config_parser = ConfigParser()
config_parser.read('config.ini')

class Config:
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = f"mysql://{config_parser.get('mysql', 'user')}:{config_parser.get('mysql', 'password')}@{config_parser.get('mysql', 'host')}/{config_parser.get('mysql', 'db')}"

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = f"mysql://{config_parser.get('mysql', 'user')}:{config_parser.get('mysql', 'password')}@{config_parser.get('mysql', 'host')}/{config_parser.get('mysql', 'db')}"
