from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, User, ProductImages, db, Review
from app.forms import ProductForm, ReviewForm
from .auth_routes import validation_errors_to_error_messages

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def products():
    """
    Query for all products and returns them in a list of product dictionaries
    """
    products = Product.query.all()
    products_list = []
    for product in products:
        product_dic = product.to_dict()
        # product_dic["productImages"] = [product.product_image.to_dict() for product.product_image in product.product_images]
        # product_dic['seller'] = product.user.to_dict()
        # del product_dic['seller']['id']
        product_dic['numReviews'] = len(product.reviews)
        if product.reviews:
            avg_rating = sum(review.stars for review in product.reviews) / len(product.reviews)
            product_dic['avgRating'] = round(avg_rating, 2)
        else:
            product_dic['avgRating'] = 0
        
        
        products_list.append(product_dic)

    return { 'products': products_list }

@product_routes.route('/current')
def current_user_products():
    """
    Query for all products and returns them in a list of product dictionaries
    """
    user = User.query.get(current_user.id)
    products = user.products
    products_list = []
    for product in products:
        product_dic = product.to_dict()
        # product_dic["productImages"] = [product.product_image.to_dict() for product.product_image in product.product_images]
        # product_dic['seller'] = product.user.to_dict()
        # del product_dic['seller']['id']
        product_dic['numReviews'] = len(product.reviews)
        if product.reviews:
            avg_rating = sum(review.stars for review in product.reviews) / len(product.reviews)
            product_dic['avgRating'] = round(avg_rating, 2)
        else:
            product_dic['avgRating'] = 0
        
        
        products_list.append(product_dic)

    return { 'products': products_list }


@product_routes.route('/<int:id>')
def single_product(id):
    """
    Query for a single product by id returns a dictionary of that product
    """

    product = Product.query.get(id)
    product_dic = product.to_dict()
    # product_dic["productImages"] = [product.product_image.to_dict() for product.product_image in product.product_images]
    # product_dic['seller'] = product.user.to_dict()
    # del product_dic['seller']['id']
    product_dic['numReviews'] = len(product.reviews)
    if product.reviews:
        avg_rating = sum(review.stars for review in product.reviews) / len(product.reviews)
        product_dic['avgRating'] = round(avg_rating, 2)
    else:
        product_dic['avgRating'] = 0
    return product_dic

@product_routes.route('/new', methods=['POST'])
@login_required
def create_product():
    """
    Create a product using the post form
    """
    request_body = request.data  # Access the raw request body
    # json_data = request.get_json()  # Parse request body as JSON
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    product = {}

    err_obj = {}
    if form.validate_on_submit():

        new_product = Product(
            user_id=current_user.id,
            title=form.data['title'],
            description=form.data['description'],
            price=form.data['price']
        )

        db.session.add(new_product)
        db.session.commit()

        product = new_product.to_dict()

        # product['productImages'] =[]

        image = form.data['image']
        # image1 = form.data['image1']
        # image2 = form.data['image2']
        # image3 = form.data['image3']
        # image4 = form.data['image4']

        # images = [form.data['image'],form.data['image1'],form.data['image2'],form.data['image3'],form.data['image4']]

        # change this with aws later
        # for image in images:
            # if image is not None:
        new_image = ProductImages(
                product_id = product['id'],
                image_url = image
            )

        db.session.add(new_image)
        db.session.commit()
        db.session.refresh(new_product)
        # product["productImages"] = [product.product_image.to_dict() for product.product_image in product.product_images]
        # del product['seller']['id']

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    
    return new_product.to_dict()    


@product_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_product(id):
    """
    Create a product using the post form
    """
    product = Product.query.get(id)
    if current_user.id != product.user_id:
        return {'errors': "unauthorized"}, 401
    
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

     #TODO: validation errors, 404, unauthorized etc...

    if form.validate_on_submit():

        product.title = form.data['title']
        product.description = form.data['description']
        product.price = form.data['price']
        
        db.session.commit()
        product_dic = product.to_dict()
        # product_dic["productImages"] = [product.product_image.to_dict() for product.product_image in product.product_images]
        return product_dic
    
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        # return form.errors
    #  {'errors': validation_errors_to_error_messages(form.errors)}, 401
    
    return product

@product_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_product(id):
    """
    Delete a product from the product id
    """
    product = Product.query.get(id)
   
    if current_user.id != product.user_id:
        return {'errors': "unauthorized"}, 401
    
    db.session.delete(product)
    db.session.commit()
    return {'message': 'Product successfully deleted'}

@product_routes.route('/<int:id>/reviews')
def reviews(id):
    """
    Query for all review for a product by product id
    """
    reviews = Review.query.filter_by(product_id = id).all()
    review_list = []
    for review in reviews:
        review_dic = review.to_dict()
        review_dic["user"] = review.user.to_dict()
        review_list.append(review_dic)
    # return {'reviews': [review.to_dict() for review in reviews]}
    return {'reviews': review_list}
    
@product_routes.route('/<int:id>/review/new', methods=['POST'])
@login_required
def create_review(id):
    """
    Create a review for a product by product id
    """

    request_body = request.data  # Access the raw request body
   
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            user_id = current_user.id,
            product_id = id,
            review = form.data['review'],
            stars = form.data['stars']
        )

        db.session.add(new_review)
        db.session.commit()

        review_dic = new_review.to_dict()
        review_dic["user"] = new_review.user.to_dict()
        return review_dic
    
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401