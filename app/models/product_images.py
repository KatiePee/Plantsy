from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductImages(db.Model):
    __tablename__ = 'product_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(255), nullable=False, default='https://cdn.discordapp.com/attachments/1106274559671418943/1123393345796964362/3704875-middle.png')
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')))

    product = db.relationship('Product', back_populates='product_images')

    def to_dict(self):
        return {
            "id": self.id,
            "imageUrl": self.image_url,
            "productId": self.product_id
        }
