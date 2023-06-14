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
    print('😈~~😈~~😈~~😈~~😈~~~ users route, login required commented out~')
    users = User.query.all()
    test = {'users': [user.to_dict() for user in users]}
    print('😈~~😈~~😈~~😈~~😈~~~ users route, login required commented out~', test)

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
    print('🍎~~~🍎~~~🍎~~~🍎~~~🍎~~~ hits current user route')
    user = User.query.get(current_user.id)
    print('🍎~~~🍎~~~🍎~~~🍎~~~🍎~~~ current user', user.to_dict())
    return user.to_dict()

