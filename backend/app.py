from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request
 
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
 
 
@app.route("/")
@cross_origin()
def hello():
    return '<h1>Hello, World!</h1>'


@app.route("/register", methods=["GET", "POST"])
@cross_origin()
def register():
    if request.method == 'POST':
        return "co"
    
    return '<h1>register</h1>'


# REJESTRACJA - GET, POST
# -> sprawdzenie poprawności przesłanych danych
# -> jeśli danych juz nie ma w bazie to zapisać
# -> jak są to rzucić errorem i zwrócić na frontendzie

# LOGOWANIE - GET
# -> sprawdzenie poprawności danych
# -> jak istnieją to zalogować nygusa
# -> jak nie to rzucić error i przesłać na front

# FETCH API CONTENT - GET
# jak wpusci na strone glowna to wziac dane z api i do bazy