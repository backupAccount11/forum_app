from . import forum_db


class ForumPost(forum_db.Model):
    __tablename__ = 'forum_posts'

    # forum post id
    # id of author (user id)
    # forum post title -> 200 max char
    # forum post description
    # forum post - time when added
    # forum post - likes
    # forum post - tags list (max 7 tags)
    # forum post - category (max 3 categories)

    # id = forum_db.Column(forum_db.Integer, primary_key=True)
    # username = forum_db.Column(forum_db.String(50), unique=True, nullable=False)
    # email = forum_db.Column(forum_db.String(120), unique=True, nullable=False)
    # password = forum_db.Column(forum_db.String(180), unique=False, nullable=False)
    # active = forum_db.Column(forum_db.Boolean, nullable=False, default=True)
