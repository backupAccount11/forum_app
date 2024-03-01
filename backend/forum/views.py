import json

from main import app, db, execute_insert_query, execute_insert_query_obj
from flask import jsonify, request, session
from flask_cors import cross_origin
from flask_login import login_required

from .validators import is_valid_title, is_valid_description, validate_categories, validate_tags

from users.models import User
from .models import ForumPost, Category, Tag


@app.route("/get_categories", methods=['GET'])
@cross_origin()
def get_categories():
    if request.method == 'GET':
        try:
            categories = Category.query.all()
            categories_list = [{'id': category.id, 'name': category.name, 'color': category.color} for category in categories]
            return jsonify(categories_list)
        except Exception as e:
            return jsonify({"success": False, "error": str(e)})


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

            author = User.query.filter_by(id=session['id']).first()

            if author:
                forum_post.author = author
                forum_post.author_id = author.id
            else:
                return jsonify({"success": False, "error": "Wystąpił niezidentyfikowany błąd"})

            for category_name in categories:
                category = Category.query.filter_by(name=category_name).first()
                if category:
                    forum_post.categories.append(category)

            for tag_name in correct_tags:
                tag = Tag.query.filter_by(name=tag_name).first()
                if tag:
                    tag.counter += 1
                    app.logger.info("Incremented counter for tag: {}".format(tag_name))
                    db.session.commit()
                    forum_post.tags.append(tag)
                else:
                    result = execute_insert_query(db.session, model=Tag, name=tag_name, counter=1)
                    if result:
                        app.logger.info("Tag added to db: {}".format(tag_name))
                        tag = Tag.query.filter_by(name=tag_name).first()
                        forum_post.tags.append(tag)

            res_forumpost = execute_insert_query_obj(db.session, forum_post)

            if res_forumpost:
                app.logger.info(f"Forum post added successfully: {res_forumpost}")
            
            
            # TODO: przesłać prompty do logstasha żeby wyalertować potencjalne sql injection

        
            return jsonify({"success": True, "message": "Post added successfully", })
        except Exception as e:
            return jsonify({"success": False, "error": str(e)})


@app.route("/get_popular_posts", methods=['GET'])
@cross_origin()
def get_popular_posts():
    if request.method == 'GET':
        try:
            posts = ForumPost.query.order_by(ForumPost.likes.desc()).all()
            posts_list = [{'id': post.id, 'name': post.name, 'description': post.description,
                           'likes': post.liked, 'author': post.author, 'categories': post.categories,
                            'tags': post.tags, 'created_at': post.created_at } for post in posts]
            return jsonify(posts_list)
        except Exception as e:
            return jsonify({"success": False, "error": str(e)})
        

# @app.route("/get_user_posts/<user_id>", methods=['GET'])
# @cross_origin()
# def get_user_posts(user_id):
#     if request.method == 'GET':
#         try:
#             categories = Category.query.all()
#             categories_list = [{'id': category.id, 'name': category.name, 'color': category.color} for category in categories]
#             return jsonify(categories_list)
#         except Exception as e:
#             return jsonify({"success": False, "error": str(e)})