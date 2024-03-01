import datetime
import json

from flask import jsonify, request, session, redirect
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash, check_password_hash

from main import app, db, execute_insert_query, status_update_query
from .validators import is_valid_username, is_valid_email, is_password_valid
from .models import User


def set_session_cookie(user: User):
    attributes = ['id', 'username', 'email']

    for attribute in attributes:
        if attribute not in session:
            session[attribute] = getattr(user, attribute)

    session['login_time'] = datetime.datetime.now().timestamp()



def clear_session_cookie():
    attributes = ['id', 'username', 'email']

    for attribute in attributes:
        session.pop(attribute, None)


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
            
            result = execute_insert_query(db.session, model=User, username=username, email=email, password=generate_password_hash(password, method='scrypt'))

            if not result['success']:
                return jsonify({"success": False, "message": "Wystąpił jakiś problem podczas rejestracji"})
            
            set_session_cookie(result['data'])
            user_data = { attribute: session.get(attribute) for attribute in ['id', 'username', 'email'] }
            
            return jsonify({"success": True, "message": "Registration successful", "user_data": user_data})
        except Exception as e:
            return jsonify({"success": False, "error": str(e)})



@app.route("/login", methods=['GET', 'POST'])
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
            
            result = status_update_query(db.session, User, email=db_user.email, type='login')

            if not result:
                return jsonify({"success": False, "message": "Wystąpił jakiś problem podczas logowania"})
            
            set_session_cookie(db_user)
            user_data = { attribute: session.get(attribute) for attribute in ['id', 'username', 'email'] }
            
            return jsonify({"success": True, "message": "Login successful", "user_data": user_data})
        except Exception as e:
            return jsonify({"success": False, "error": str(e)})
        
    elif request.method == 'GET':
        if 'id' in session:
            user_data = { attribute: session.get(attribute) for attribute in ['id', 'username', 'email'] }
            return jsonify({"success": True, "message": "User already logged in", "user_data": user_data})
        else:
            return jsonify({"success": False, "message": "User not logged in"}), 401



@app.route("/logout", methods=['POST'])
@cross_origin()
def logout():
    if request.method == 'POST':
        try:
            reqdata = request.data
            json_value = reqdata.decode('utf8').replace("'", '"')
            data = json.loads(json_value)

            error_messages = {}
            db_user = User.query.filter_by(id=data["userid"]).first()
            
            if not db_user:
                error_messages["undefined"] = "Niezidentyfikowany błąd"
                return jsonify({"success": False, "error": error_messages})
            
            result = status_update_query(db.session, User, email=db_user.email, type='logout')

            if not result:
                return jsonify({"success": False, "message": "Wystąpił jakiś problem podczas wylogowywania"})
            
            clear_session_cookie()

            if session["login_time"]:
                current_time = datetime.datetime.now().timestamp()
                session_duration = current_time - session["login_time"]
                # TODO: Session duration: {session_duration} seconds - send that do logstash 
    
            return jsonify({"success": True, "message": "Logout successful"})
        except Exception as e:
            return jsonify({"success": False, "error": str(e)})
