from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Product, Cart_Item, db, Cart
from app.forms import CartForm

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/')
@login_required
def load_cart():
    """
    Load all cart items
    """
    return current_user.cart.to_dict()

@cart_routes.route('/<int:product_id>/add', methods=['POST'])
@login_required
def add_cart_item(product_id):
    """
    Add an item to the current users cart
    """
    print('🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~~~~~~~~~ hits cart route ~')

    #leaving form to validate csrf token
    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    data = request.json
    cart = current_user.cart[0]
    cart_items = cart.cart_items if cart.cart_items else []
    product = Product.query.get(product_id)
    quantity = data['quantity']
    item_list = [item for item in cart_items if item.product_id == product.id] if cart_items else []

    if len(item_list):
        item = item_list[0]
        item.quantity = item.quantity + quantity
        cart.total = cart.total + (product.price * quantity)
        db.session.commit()
        print('🎃~~~~~~~~ cart', cart.to_dict())
        return cart.to_dict()

    add_item = Cart_Item(
        cart_id = cart.id,
        product_id = product_id,
        quantity = quantity
    )
    cart.total += (product.price * quantity)

    db.session.add(add_item)
    db.session.commit()

    print('🎃~~~~~~~~ cart', cart.to_dict())
    return cart.to_dict()
  
