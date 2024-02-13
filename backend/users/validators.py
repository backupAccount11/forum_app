import re
from email_validator import validate_email, EmailNotValidError

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
