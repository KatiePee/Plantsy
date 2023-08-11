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
    # wishlist = db.relationship('User', secondary="wishlist",  back_populates="wishlist", cascade="all, delete-orphan")
    wishlist = db.relationship('User', secondary="wishlist",  back_populates="wishlist")

    product_images = db.relationship('ProductImages', back_populates='product', cascade='all, delete-orphan')
    cart_items = db.relationship('Cart_Item', back_populates='product')

    def to_dict(self):
        return {
            'id': self.id,
            "title": self.title,
            "description": self.description,
            "price": self.price,
            "productImages": [image.to_dict() for image in self.product_images],
            "reviews": [review.to_dict() for review in self.reviews],
            "seller": self.user.to_dict(),
            "createdAt": self.created_at
        }
    
    #~~~~~~~~~~~~~~~~ left off ~~~~~~~~~~~~~~~~~~
    # refactored the return of products ti include all nessisary information that is being returned 
    # todo - refactor routes to utilize this more simple refactoring
    #fixing the delete user bug
    #bug notes
#sqlalchemy.exc.InvalidRequestError: One or more mappers failed to initialize - can't proceed with initialization of other mappers. Triggering mapper: 'mapped class User->users'. Original exception was: For many-to-many relationship User.wishlist, delete-orphan cascade is normally configured only on the "one" side of a one-to-many relationship, and not on the "many" side of a many-to-one or many-to-many relationship.  To force this relationship to allow a particular "Product" object to be referred towards by only a single "User" object at a time via the User.wishlist relationship, which would allow delete-orphan cascade to take place in this direction, set the single_parent=True flag. (Background on this error at: https://sqlalche.me/e/14/bbf0)