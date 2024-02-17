from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# from config import DevelopmentConfig

forum_app = Flask(__name__)

CORS(forum_app)

# forum_app.config.from_object(DevelopmentConfig)
# forum_app.config['CORS_HEADERS'] = 'Content-Type'

# forum_db = SQLAlchemy(forum_app)

# with forum_app.app_context():
#     forum_db.create_all()
#     print('Tables for forum app created!')

from .views import *
