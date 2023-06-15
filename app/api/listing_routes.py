from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Listing, User, ListingImages, db
from app.forms import ListingForm

listing_routes = Blueprint('listings', __name__)

@listing_routes.route('/')
def listings():
    """
    Query for all listings and returns them in a list of listing dictionaries
    """
    listings = Listing.query.all()
    listings_list = []
    for listing in listings:
        listing_dic = listing.to_dict()
        listing_dic["listingImages"] = [listing.listing_image.to_dict() for listing.listing_image in listing.listing_images]
        
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

@listing_routes.route('/new', methods=['POST'])
@login_required
def create_listing():
    """
    Create a listing using the post form
    """
    request_body = request.data  # Access the raw request body
    # json_data = request.get_json()  # Parse request body as JSON
    print('🌿~~🌿~~🌿~~🌿~~~ req body', request_body)
    listingForm = ListingForm()
    listingForm['csrf_token'].data = request.cookies['csrf_token']
    listing = {}
    print('🍎😈~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>', listingForm)
    print('🍎😈~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>',     listingForm['csrf_token'].data)
    print('🍎😈~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>',     request.cookies['csrf_token'])
    print('🍎😈~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>', listingForm.errors)

        # print('😈~~~😈~~~😈~~~😈~~~😈~~~ create listing route', listing)
    err_obj = {}
    if listingForm.validate_on_submit():

        print('🍎😈~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~> HITING FORM VALIDATE',)
        new_listing = Listing(
            user_id=current_user.id,
            title=listingForm.data['title'],
            description=listingForm.data['description'],
            price=listingForm.data['price']
        )

        db.session.add(new_listing)
        db.session.commit()

        listing = new_listing.to_dict()

        listing['listingImages'] =[]

        images = listingForm.data['images']
        for image in images:
            new_image = ListingImages(
                listing_id = listing['id'],
                image_url = image
            )

            db.session.add(new_image)
            db.session.commit()
            
            image_dict = new_image.to_dict()
            listing["postImages"].append(image_dict)
    if listingForm.errors:
        print('🍎😈~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~> HITING NOT VALIDATE',)
        return listingForm.errors
    
    return listing

