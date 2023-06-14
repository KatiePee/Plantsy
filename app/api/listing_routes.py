from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Listing, User


listing_routes = Blueprint('listings', __name__)

@listing_routes.route('/')
def listings():
    """
    Query for all listings and returns them in a list of listing dictionaries
    """
    listings = Listing.query.all()
    # listings_list = [listing.to_dict() for listing in listings]
    listings_list = []
    for listing in listings:
        # print('🍎~~~🍎~~~🍎~~~🍎~~~ listing', listing)
        listing_dic = listing.to_dict()
        listing_dic["lisingImages"] = [listing.listing_image.to_dict() for listing.listing_image in listing.listing_images]
        
        listings_list.append(listing_dic)

    return { 'listings': listings_list }
    
@listing_routes.route('/<int:id>')
def single_listing(id):
    """
    Query for a single listing by id returns a dictionary of that listing
    """

    listing = Listing.query.get(id)
    listing_dic = listing.to_dict()
    listing_dic["listingImages"] = [listing.listing_image.to_dict() for listing.listing_image in listing.listing_images]
    return listing_dic