from datetime import datetime
from users.models import db, User


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False, unique=True)
    color = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<id={self.id}, name={self.name}, color={self.color}>'



class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False, unique=True)
    counter = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f'<id={self.id}, name={self.name}, counter={self.counter}>'


categories_table = db.Table('categories_table',
    db.Column('post_id', db.Integer, db.ForeignKey('forum_posts.id'), primary_key=True),
    db.Column('category_id', db.Integer, db.ForeignKey('categories.id'), primary_key=True)
)

tags_table = db.Table('tags_table',
    db.Column('post_id', db.Integer, db.ForeignKey('forum_posts.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True)
)


# many-to-many: post-tag, post-category
# one-to-many: post-comment


class ForumPost(db.Model):
    __tablename__ = 'forum_posts'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), unique=False, nullable=False)
    description = db.Column(db.String(1800), unique=False, nullable=False)
    likes = db.Column(db.Integer, default=0)
    categories = db.relationship('Category', secondary=categories_table, backref='posts', lazy='dynamic')
    tags = db.relationship('Tag', secondary=tags_table, backref='posts', lazy='dynamic')

    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    author = db.relationship(User, backref=db.backref('forum_posts', lazy=True))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, title=None, description=None):
        self.title = title
        self.description = description

    def __repr__(self):
        return f'<id={self.id}, author={self.author}, title={self.title}>'
    
