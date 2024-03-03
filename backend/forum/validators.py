import re

TITLE_MAX = 200
DESCRIPTION_MAX = 1500

FIELD_REGEX = re.compile(r'^[a-zA-Z0-9_-]*$')
CATEGORY_MAX = 5
TAGS_MAX = 9


def validate_categories(categories):
    if not categories or len(categories) > CATEGORY_MAX:
        return f"Wprowadzono nieprawidłową liczbę kategorii"
    
def validate_tags(tags):
    if len(tags) > TAGS_MAX:
        return f"Można wprowadzić maksymalnie {TAGS_MAX} tagów"
    elif not all(FIELD_REGEX.match(tag) for tag in tags):
        return "Tag zawiera nieprawidłowe znaki"


def validate_length(field, value, max_length):
    if not value:
        return f"{field} jest wymagany"
    elif len(value) > max_length:
        return f"{field} może mieć maksymalnie {max_length} znaków"

def is_valid_title(title):
    return validate_length("Tytuł", title, TITLE_MAX)

def is_valid_description(description):
    return validate_length("Opis", description, DESCRIPTION_MAX)
