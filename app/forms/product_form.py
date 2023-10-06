from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helpers import ALLOWED_EXTENSIONS
from app.models import Product, User
      
class ProductForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    price = DecimalField(label='Price', places=2, validators=[NumberRange(min=0)])
    # image = StringField('Image')
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
   
 


