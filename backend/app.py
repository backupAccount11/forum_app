from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json, re

from email_validator import validate_email, EmailNotValidError
 
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


USERNAME_PATTERN = r'^[a-zA-Z0-9_]*$'
USERNAME_REGEX = re.compile(USERNAME_PATTERN)

PASSWORD_MIN = 8
PASSWORD_MIN_NUM = 2

def is_valid_username(username):
    return bool(USERNAME_REGEX.match(username))


def is_valid_email(email):
    try:
        v = validate_email(email)
        return True
    except EmailNotValidError as e:
        return False
 

def is_password_valid(password):
    if len(password) < PASSWORD_MIN:
        return False
    if sum(ch.isdigit() for ch in password) < 2:
        return False
    return True


 
@app.route("/")
@cross_origin()
def hello():
    return '<h1>Hello, World!</h1>'


@app.route("/register", methods=['POST'])
@cross_origin()
def registration():
    if request.method == 'POST':
        try:
            username = request.args.get('username')
            email = request.args.get('email')
            password = request.args.get('password')

            error_messages = []

            if not is_valid_username(username):
                error_messages.append("Podano błędną nazwę użytkownika")
            if not is_valid_email(email):
                error_messages.append("Podano błędny e-mail")
            if not is_password_valid(password):
                error_messages.append("Podano błędne hasło")

            # TODO check if username or email already exists !!

            if error_messages:
                return jsonify({"success": False, "error": error_messages}) # na frontend

            result_data = {
                "username": username,
                "email": email,
                "password": password
            }

            return jsonify({"success": True, "message": "Registration successful", "data": result_data})
        except Exception as e:
            return jsonify({"success": False, "error": str(e)})


# REJESTRACJA - GET, POST
# -> sprawdzenie poprawności przesłanych danych - ok
# -> jeśli danych juz nie ma w bazie to zapisać
# -> jak są to rzucić errorem i zwrócić na frontendzie - tu problem z response po stronie frontu

# LOGOWANIE - GET
# -> sprawdzenie poprawności danych
# -> jak istnieją to zalogować nygusa
# -> jak nie to rzucić error i przesłać na front

# FETCH API CONTENT - GET
# jak wpusci na strone glowna to wziac dane z api i do bazy