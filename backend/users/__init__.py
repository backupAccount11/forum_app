from flask import Flask
import logging

app = Flask(__name__)

logging.basicConfig(level=logging.INFO)

formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

login_logger = logging.getLogger('loginview')
login_handler = logging.FileHandler('example_logs/login_view.log')
login_handler.setFormatter(formatter)
login_logger.addHandler(login_handler)

register_logger = logging.getLogger('registerview')
register_handler = logging.FileHandler('example_logs/register_view.log')
register_handler.setFormatter(formatter)
register_logger.addHandler(register_handler)

session_logger = logging.getLogger('logoutview')
session_handler = logging.FileHandler('example_logs/session_interval.log')
session_handler.setFormatter(formatter)
session_logger.addHandler(session_handler)
