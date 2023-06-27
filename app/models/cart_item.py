from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Cart_Item(db.Model):
    __tablename__ = 'cart_items'

    if environment == 'production':
      __table_args__ = { 'schema': SCHEMA }

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')))
    quantity = db.Column(db.Integer, nullable=False)
    price_at_order = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.utcnow())

    product = db.relationship('Product', back_populates='cart_items')
    cart = db.relationship('Cart', back_populates='cart_items')

    def to_dict(self):
       return {
          'id': self.id,
          'cartId': self.cart_id,
          'product': self.product.to_dict(),
          'quantity': self.quantity,
          'priceAtOrder': self.price_at_order,
          'createdAt': self.created_at
       }


