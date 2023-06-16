from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, User, ProductImages, db, Review
from app.forms import ProductForm
from .auth_routes import validation_errors_to_error_messages