from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange
from app.models import Listing, User
      
class ListingForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    price = DecimalField(label='Price', places=2, validators=[NumberRange(min=0)])
    images = StringField('Image')
