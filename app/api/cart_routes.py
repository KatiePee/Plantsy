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
    cart = current_user.cart[0]

    return cart.to_dict()

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
        return cart.to_dict()

    add_item = Cart_Item(
        cart_id = cart.id,
        product_id = product_id,
        quantity = quantity
    )
    cart.total += (product.price * quantity)

    db.session.add(add_item)
    db.session.commit()

    return cart.to_dict()
  
@cart_routes.route('/<int:itemId>/edit', methods=['PUT'])
@login_required
def edit_cart(itemId):
    """
    Edit the quantity of a cart item by cart item ID
    """
    data = request.json
    cart = current_user.cart[0]
    item = Cart_Item.query.get(itemId)
    curr_quantity = item.quantity
    item.quantity = data['quantity']
    cart.total += item.product.price * (data['quantity'] - curr_quantity)
    db.session.commit()

    print('🍎~~~~~~~ edit cart request body: ' , data)
    print('🎃~~~~~~~ edit cart cart item quantity: ', item.quantity)
    return cart.to_dict()

@cart_routes.route('/<int:itemId>/delete', methods=['DELETE'])
@login_required
def remove_from_cart(itemId):
    """
    Remove item from cart by item id
    """
    item = Cart_Item.query.get(itemId)
    cart = current_user.cart[0]
    cart.total -= item.product.price * item.quantity
    db.session.delete(item)
    db.session.commit()
    return cart.to_dict()

@cart_routes.route('/checkout')
@login_required
def checkout():
    """
    Clear cart items and reset users cart to empty
    """

    cart = current_user.cart[0]
    print('🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~ cart in checkout route before:', cart.to_dict())
    cart_items = cart.cart_items

    if current_user.id != cart.user_id:
        return {'errors': "unauthorized"}, 401
    
    [db.session.delete(cart_item) for cart_item in cart_items]
    cart.total = 0
    db.session.commit()
    print('🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~ cart in checkout route after:', cart.to_dict())

    return cart.to_dict()