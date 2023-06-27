from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'

    if environment == 'production':
        __table_args__ = { 'schema': SCHEMA }

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    title = db.Column(db.String(225), nullable=False)
    description = db.Column(db.String(2040), nullable=False)
    price = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())

    user = db.relationship('User', back_populates='products')
    reviews = db.relationship('Review', back_populates='product', cascade="all, delete-orphan")
    wishlist = db.relationship('User', secondary="wishlist",  back_populates="wishlist", cascade="all, delete")
    product_images = db.relationship('ProductImages', back_populates='product', cascade='all, delete-orphan')
    # cart_items = db.relationship('Cart_Item', back_populates='product')

    def to_dict(self):
        return {
            'id': self.id,
            "userId": self.user_id,
            "title": self.title,
            "description": self.description,
            "price": self.price,
            # "images": [image.to_dict() for image in self.product_images],
            # "reviews": [review.to_dict() for review in self.reviews],
            # "user": self.user.to_dict(),
            "createdAt": self.created_at
        }
    
    #~~~~~~~~~~~~~~~~ left off ~~~~~~~~~~~~~~~~~~
    # refactored the return of products ti include all nessisary information that is being returned 
    # todo - refactor routes to utilize this more simple refactoring
    #fixing the delete user bug
