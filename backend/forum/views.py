import json

from main import app, db
from flask import jsonify, request, session
from flask_cors import cross_origin
from flask_login import login_required

from .validators import is_valid_title, is_valid_description, validate_categories, validate_tags
from .models import ForumPost, Category, Tag


# @app.route("/get_categories", methods=['GET'])
# @cross_origin()
# def get_categories():
#     if request.method == 'GET':
#         categories = [
#             { 'name': 'Maszyny wirtualne', 'color': 'blue' },
#             { 'name': 'VMware Workstation', 'color': 'blue' },
#             { 'name': 'Administracja Linux', 'color': 'violet' },
#             { 'name': 'Windows Server', 'color': 'pink' },
#             { 'name': 'Cyberbezpieczeństwo', 'color': 'aqua' },
#             { 'name': 'Kali', 'color': 'aqua' }
#         ]

# try:

#     return jsonify({"success": True, "message": "Registration successful", })
# except Exception as e:
#     return jsonify({"success": False, "error": str(e)})


@app.route("/create_forumpost", methods=['POST'])
@cross_origin()
def create_forumpost():
    if request.method == 'POST':
        try:
            title = request.form.get('title')
            description = request.form.get('description')
            categories = request.form.getlist('categories[]')
            tags = request.form.getlist('tags[]')

            if not session['id']:
                return jsonify({"success": False, "error": "Wystąpił niezidentyfikowany błąd"})

            error_messages = {}

            title_error = is_valid_title(title)
            description_error = is_valid_description(description)
            categories_error = validate_categories(categories)
            tags_error = validate_tags(tags)

            if title_error:
                error_messages['title'] = title_error
            if description_error:
                error_messages['description'] = description_error
            if categories_error:
                error_messages['categories'] = categories_error
            if tags_error:
                error_messages['tags'] = tags_error

            if error_messages:
                return jsonify({"success": False, "error": error_messages})
            
            correct_tags = list(dict.fromkeys(tags))  # remove duplicates

            forum_post = ForumPost(title=title, description=description)

            for category_name in categories:
                category = Category.query.filter_by(name=category_name).first()
                if category:
                    forum_post.categories.append(category)

            # for tag_name in correct_tags:
            #     tag = Tag.query.filter_by(name=tag_name).first()
            #     if tag:
            #         tag.counter += 1
            #     else:
            #         tag = Tag(name=tag_name, counter=1)
            #     forum_post.tags.append(tag)

            # populate category table from file
            # useeffect it on frontend
            # correct frontend with categories
            # check if loop above works - categories
            # correct loop tag

            # app.logger.info(f"Categories: {[category for category in forum_post.categories]}")
            # app.logger.info(f"Tags: {[tag for tag in forum_post.tags]}")

            
            
            # TODO: przesłać prompty do logstasha żeby wyalertować potencjalne sql injection

        
            return jsonify({"success": True, "message": "Post added successfully", })
        except Exception as e:
            return jsonify({"success": False, "error": str(e)})
