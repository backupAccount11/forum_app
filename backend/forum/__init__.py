from flask import Flask, request
import logging

forum_app = Flask(__name__)


class UserAgentFilter(logging.Filter):
    def filter(self, record):
        record.user_agent = request.headers.get('User-Agent', 'Unknown')
        record.http_method = request.method
        record.endpoint = request.path
        return True

logging.basicConfig(level=logging.INFO)

user_agent_filter = UserAgentFilter()

formatter = logging.Formatter('%(asctime)s - %(http_method)s - %(endpoint)s - %(user_agent)s -  %(levelname)s - %(message)s')

posts_logger = logging.getLogger('postsview')
posts_handler = logging.FileHandler('example_logs/posts_view.log')

posts_handler.addFilter(user_agent_filter)
posts_handler.setFormatter(formatter)
posts_logger.addHandler(posts_handler)
