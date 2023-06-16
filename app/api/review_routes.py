from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, User, ProductImages, db, Review
from app.forms import ProductForm
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_review(id):
    """
    Delete a review using the review id
    """

    review = Review.query.get(id)

    if current_user.id != review.user_id:
      return {'errors': "unauthorized"}, 401
    
    db.session.delete(review)
    db.session.commit()
    return {'message': 'Review successfully deleted'}