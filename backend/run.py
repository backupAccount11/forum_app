from dotenv import load_dotenv
load_dotenv()

from users import app
# from forum import forum_app 

if __name__ == "__main__":
    app.run(debug=True)
