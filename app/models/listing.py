from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Listing(db.Model):
    __tablename__ = 'listings'

    if environment == 'production':
        __table_args__ = { 'schema': SCHEMA }

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(2040), nullable=False)
    price = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())

    user = db.relationship('User', back_populates='listings')
    listing_images = db.relationship('ListingImages', back_populates='listing', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            "userId": self.user_id,
            "title": self.title,
            "description": self.description,
            "price": self.price,
            "createdAt": self.created_at
        }