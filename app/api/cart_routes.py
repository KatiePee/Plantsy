from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Product, Cart_Item, db

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/<int:product_id>/add', methods=['POST'])
@login_required
def add_cart_item(product_id):
    """
    Add an item to the current users cart
    """
    #todo make a form to get the cart information, create an instance of the cartitem, 
    #check to see if the product is in stock
    #add a stock to the product, and availability....?
    #make new instance of cart, dont forget to add the total in the cart
    #
    print('🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~~~~~~~~~~')
    data = request.json
    cart_id = current_user.cart.id
    quantity = data.get('quantity')
    product = Product.query.get(product_id)
    if product is None:
        return {'errors': 'Sorry, product no longer exists'}, 404
    
    #if that cart item already exists....
    
    add_item = Cart_Item(
        cart_id = cart_id,
        product_id = product_id,
        quantity = quantity,
    )

    db.session.add(add_item)
    db.session.commit()
    return add_item.to_dict()
