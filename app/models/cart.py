from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == 'production':
      __table_args__ = { 'schema': SCHEMA }

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    total = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.utcnow())

    cart_items = db.relationship('Cart_Item', back_populates='cart')
    user = db.relationship('User', back_populates='cart')
   

    def to_dict(self):
      return {
      'id': self.id,
      'user': self.user.to_dict(),
      'total': self.total,
      'items': [cart_item.to_dict() for cart_item in self.cart_items],
      'createdAt': self.created_at 
      }
    


