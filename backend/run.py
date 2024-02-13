from dotenv import load_dotenv
load_dotenv()

from users import app

if __name__ == "__main__":
    app.run(debug=True)
