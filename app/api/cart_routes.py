from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Product, Cart_Item, db, Cart
from app.forms import CartForm

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/<int:product_id>/add', methods=['POST'])
@login_required
def add_cart_item(product_id):
    """
    Add an item to the current users cart
    """
    print('🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~~~~~~~~~ hits cart route ~')
    # data = request.get_json()
    # print('🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~~~~~~~~~ hits cart route ~ data', data)
    form = CartForm()
    print('🎃~~~~~~~~ form :', form)
    print('🍎~~~~ after form')
    form['csrf_token'].data = request.cookies['csrf_token']

    data = request.json
    cart = current_user.cart[0]
    cart_items = cart.cart_items if cart.cart_items else []
    product = Product.query.get(data['product_id'])
    quantity = data['quantity']
    item_list = [item for item in cart_items if item.product_id ==1] if cart_items else []

    if len(item_list):
        item = item_list[0]
        item.quantity = item.quantity + quantity
        cart.total = cart.total + (product.price * quantity)
        db.session.commit()
        
        return item.to_dict()

    # cart_item = [cart for cart in current_user.cart if cart.id == cart_id]
    

    if form.validate_on_submit():
        print('🍎 validated')
        
        cart_id = current_user.cart[0].id
        
        product = Product.query.get(form.data['product_id'])
        quantity = form.data['quantity']

        if product is None:
            return {'errors': 'Sorry, product no longer exists'}, 404

        add_item = Cart_Item(
            cart_id = cart_id,
            product_id = product_id,
            quantity = quantity
        )

        db.session.add(add_item)
        db.session.commit()
        return add_item.to_dict()
    
    return {'error': 'bad'}
    
    # data = request.get_json()
    # print('🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~🍎~~~~~~~~~~ data ~', data)

    # cart_id = current_user.cart.id
    # quantity = data.get('quantity')
    # product = Product.query.get(product_id)
    # if product is None:
    #     return {'errors': 'Sorry, product no longer exists'}, 404
    
    # #if that cart item already exists....
    
    # add_item = Cart_Item(
    #     cart_id = cart_id,
    #     product_id = product_id,
    #     quantity = quantity,
    # )

    # db.session.add(add_item)
    # db.session.commit()
    # return add_item.to_dict()
