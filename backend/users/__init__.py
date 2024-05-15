from flask import Flask, request
import logging

app = Flask(__name__)

logging.basicConfig(level=logging.INFO)

class UserAgentFilter(logging.Filter):
    def filter(self, record):
        record.user_agent = request.headers.get('User-Agent', 'Unknown')
        record.http_method = request.method
        record.endpoint = request.path
        return True

user_agent_filter = UserAgentFilter()

formatter = logging.Formatter('%(asctime)s - %(http_method)s - %(endpoint)s - %(user_agent)s -  %(levelname)s - %(message)s')


auth_logger = logging.getLogger('authview')
auth_handler = logging.FileHandler('example_logs/auth_view.log')

auth_handler.addFilter(user_agent_filter)
auth_handler.setFormatter(formatter)
auth_logger.addHandler(auth_handler)


session_logger = logging.getLogger('logoutview')
session_handler = logging.FileHandler('example_logs/session_interval.log')

session_handler.addFilter(user_agent_filter)
session_handler.setFormatter(formatter)
session_logger.addHandler(session_handler)
