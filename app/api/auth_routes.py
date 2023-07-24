from flask import Blueprint, jsonify, session, request
from app.models import User, db, Cart
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        user_dic = current_user.to_dict()
        products = current_user.products
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
        
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        user1 = User.query.get(current_user.id)
        users = User.query.all()
        test = {'users': [user.to_dict() for user in users]}

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

        # return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        db.session.refresh(user)
        cart = Cart(
            user_id = user.id,
            total = 0,
        )
        db. session.add(cart)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401

