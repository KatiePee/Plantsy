from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Product, User
      
class ReviewForm(FlaskForm):
    review = StringField('Title', validators=[DataRequired()])
    stars = IntegerField('Stars', validators=[DataRequired()])
    # review = StringField('Title')
    # stars = IntegerField('Stars')
    print('🤑~~~~~~review form')
   