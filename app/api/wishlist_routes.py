from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import db, Product, User, wishlist

wishlist_routes = Blueprint('wishlist', __name__)

@wishlist_routes.route('/')
@login_required
def my_wishlist():
    """
    Query for the wishlist of the current user
    """

    user = User.query.get(current_user.id)
    wishlists = user.wishlist
    wish_list = [wishlist.to_dict() for wishlist in wishlists]
    return wish_list
    


@wishlist_routes.route('/product/<int:id>', methods=['POST'])
@login_required
def add_to_wishlist(id):
    """
    Add a product to the current users wishlist
    """

    user = User.query.get(current_user.id)
    product = Product.query.get(id)

    user.wishlist.append(product)
    db.session.commit()

    return {"message": "Successfully added to wishlist"}

@wishlist_routes.route('/products/<int:id>/remove', methods=['DELETE'])
@login_required
def remove_from_wishlist(id):
    """
    Remove a product from the current users wishlist
    """

    user = User.query.get(current_user.id)
    product = Product.query.get(id)

    user.wishlist.remove(product)
    db.session.commit()

    return {'message': 'Successfully removed from wishlist'}
