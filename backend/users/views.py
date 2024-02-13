from flask import jsonify, request
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash, check_password_hash

from . import app, db, execute_insert_query, status_update_query
from .validators import is_valid_username, is_valid_email, is_password_valid
from .models import User


@app.route("/register", methods=['POST'])
@cross_origin()
def registration():
    if request.method == 'POST':
        try:
            username = request.form.get('username')
            email = request.form.get('email')
            password = request.form.get('password')

            error_messages = {}

            if not is_valid_username(username):
                error_messages["username"] = "Podano błędną nazwę użytkownika"
            if not is_valid_email(email):
                error_messages["email"] = "Podano błędny e-mail"
            if not is_password_valid(password):
                error_messages["password"] = "Podano błędne hasło"

            if error_messages:
                app.logger.info('Registration errors: %s', error_messages)
                return jsonify({"success": False, "error": error_messages})

            if User.query.filter_by(username=username).first():
                error_messages["username_exist"] = "Nazwa użytkownika już istnieje"
            if User.query.filter_by(email=email).first():
                error_messages["email_exist"] = "E-mail już istnieje"

            if error_messages:
                app.logger.info('User already exists errors: %s', error_messages)
                return jsonify({"success": False, "error": error_messages})
            
            result = execute_insert_query(db.session, User, username=username, email=email, password=generate_password_hash(password, method='scrypt')) 
            
            if not result:
                return jsonify({"success": False, "message": "Wystąpił jakiś problem podczas rejestracji"})

            return jsonify({"success": True, "message": "Registration successful"})
        except Exception as e:
            return jsonify({"success": False, "error": str(e)})



@app.route("/login", methods=['POST'])
@cross_origin()
def login():
    if request.method == 'POST':
        try:
            email = request.form.get('email')
            password = request.form.get('password')

            error_messages = {}

            if not is_valid_email(email):
                error_messages["email"] = "Podano błędny e-mail"
            if not is_password_valid(password):
                error_messages["password"] = "Podano błędne hasło"

            if error_messages:
                app.logger.info('Login errors: %s', error_messages)
                return jsonify({"success": False, "error": error_messages})
            
            db_user = User.query.filter_by(email=email).first()
            
            if not db_user:
                error_messages["user_not_exist"] = "Użytkownik nie istnieje"
                return jsonify({"success": False, "error": error_messages})
            
            if not check_password_hash(db_user.password, password):
                error_messages["password_incorrect"] = "Hasło jest nieprawidłowe"
                return jsonify({"success": False, "error": error_messages})
            
            result = status_update_query(db.session, User, email=email)

            if not result:
                return jsonify({"success": False, "message": "Wystąpił jakiś problem podczas logowania"})

            return jsonify({"success": True, "message": "Login successful"})
        except Exception as e:
            return jsonify({"success": False, "error": str(e)})

