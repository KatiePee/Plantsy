from .db import db, environment, SCHEMA, add_prefix_for_prod

class ListingImages(db.Model):
    __tablename__ = 'listing_images'

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(255), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('listings.id')))

    listing = db.relationship('Listing', back_populates='listing_images')

    def to_dict(self):
        return {
            "id": self.id,
            "imageUrl": self.image_url,
            "listingId": self.listing_id
        }
