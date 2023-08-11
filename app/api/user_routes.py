from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    test = {'users': [user.to_dict() for user in users]}

    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/current')
@login_required
def current():
    user = User.query.get(current_user.id)
    return user.to_dict()


@user_routes.route('/current/products')
@login_required
def user_products():
    """
    Query for all of users products
    """
    user = User.query.get(current_user.id)
    user_dic = user.to_dict()
    products = user.products
    products_list = []
    for product in products:
        product_dic = product.to_dict()
        product_dic["productImages"] = [product.product_image.to_dict() for product.product_image in product.product_images]
       
        product_dic['numReviews'] = len(product.reviews)
        if product.reviews:
            avg_rating = sum(review.stars for review in product.reviews) / len(product.reviews)
            product_dic['avgRating'] = round(avg_rating, 2)
        else:
            product_dic['avgRating'] = 0
        
        
        products_list.append(product_dic)

    user_dic['Products'] = products_list
    return user_dic

