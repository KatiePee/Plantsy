from flask import Blueprint, session, request
from flask_login import login_required, current_user
from app.models import db, Product, User, wishlist

wishlist_routes = Blueprint('wishlist', __name__)

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

@wishlist_routes.route('/products/<int:id>/remove', methods=['POST'])
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
