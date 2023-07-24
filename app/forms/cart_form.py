from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange
from app.models import Product, User

class CartForm(FlaskForm):
    print('👻~~~~~ hits flask form cart')
    product_id = IntegerField('Product', validators=[DataRequired()])
    quantity = IntegerField('Quantity', validators=[DataRequired()])