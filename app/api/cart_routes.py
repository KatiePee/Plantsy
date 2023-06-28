from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/add')
@login_required
def add_cart_item():
    """
    Add an item to the current users cart
    """
    #todo make a form to get the cart information, create an instance of the cartitem, 
    #check to see if the product is in stock
    #add a stock to the product, and availability....?
    #make new instance of cart, dont forget to add the total in the cart
    #