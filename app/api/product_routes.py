from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, User, ProductImages, db
from app.forms import ProductForm
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
        product_dic["productImages"] = [product.product_image.to_dict() for product.product_image in product.product_images]
        
        products_list.append(product_dic)

    return { 'products': products_list }
    
@product_routes.route('/<int:id>')
def single_product(id):
    """
    Query for a single product by id returns a dictionary of that product
    """

    product = Product.query.get(id)
    product_dic = product.to_dict()
    product_dic["productImages"] = [product.product_image.to_dict() for product.product_image in product.product_images]
    return product_dic

@product_routes.route('/new', methods=['POST'])
@login_required
def create_product():
    """
    Create a product using the post form
    """
    request_body = request.data  # Access the raw request body
    # json_data = request.get_json()  # Parse request body as JSON
    print('🌿~~🌿~~🌿~~🌿~~~ req body', request_body)
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    product = {}
    print('🍎😈~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>', form)
    print('🍎😈~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>',     form['csrf_token'].data)
    print('🍎😈~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>',     request.cookies['csrf_token'])
    print('🍎😈~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>', form.data)

        # print('😈~~~😈~~~😈~~~😈~~~😈~~~ create product route', product)
    err_obj = {}
    if form.validate_on_submit():

        print('🍎😈~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~> HITING FORM VALIDATE',)
        new_product = Product(
            user_id=current_user.id,
            title=form.data['title'],
            description=form.data['description'],
            price=form.data['price']
        )

        db.session.add(new_product)
        db.session.commit()

        product = new_product.to_dict()

        product['productImages'] =[]

        images = form.data['images']
        # change this with aws later
        new_image = ProductImages(
                product_id = product['id'],
                image_url = images
            )

        db.session.add(new_image)
        db.session.commit()
        print('🤡~~~🤡~~~🤡~~~🤡~~~~~~~~post product images', images)
        # for image in images:
        #     print('💃~💃~💃~~~~~~~~ image', image)
        #     new_image = ProductImages(
        #         product_id = product['id'],
        #         image_url = image
        #     )

        #     db.session.add(new_image)
        #     db.session.commit()
            
        #     image_dict = new_image.to_dict()
        #     print('🍎😈~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~> HITING img dict', image_dict)
        #     product["productImages"].append(image_dict)

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        # return form.errors
    #  {'errors': validation_errors_to_error_messages(form.errors)}, 401
    
    return product


@product_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_product(id):
    """
    Create a product using the post form
    """
    product = Product.query.get(id)
    if current_user.id != product.user_id:
        return {'errors': "unauthorized"}, 401
    
    print('☠️~☠️~☠️~☠️~☠️~☠️~~~~~ edit product route product', product)    
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

     #TODO: validation errors, 404, unauthorized etc...

    if form.validate_on_submit():

        product.title = form.data['title']
        product.description = form.data['description']
        product.price = form.data['price']
        
        db.session.commit()
        product_dic = product.to_dict()
        product_dic["productImages"] = [product.product_image.to_dict() for product.product_image in product.product_images]
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
    return {'message': 'Post successfully deleted'}
