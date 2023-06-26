from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange
from app.models import Product, User
      
class ProductForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    price = DecimalField(label='Price', places=2, validators=[NumberRange(min=0)])
    image = StringField('Image')
    # image1 = StringField('Image')
    # image2 = StringField('Image')
    # image3 = StringField('Image')
    # image4 = StringField('Image')
 


