from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        user_id = 1,
        product_id = 3,
        review = 'I love the swiss chees plant... It reminds me of swiss cheese and i love swiss cheese. I like how there are holes in the plant too... thats super cool. plants are neat!',
        stars = 5,
    )
    review2 = Review(
        user_id = 2,
        product_id = 1,
        review = 'Omg I loved this pothos, the seller took the best care of them and they arrived perfect!',
        stars = 4,
    )
    review3 = Review(
        user_id = 1,
        product_id = 2,
        review = 'the Peace Lily really makes me feel at peace and thats really nice',
        stars = 4,
    )
    review4 = Review(
        user_id = 2,
        product_id = 3,
        review = 'OMG i got this plant and there is hardly any holes in the leaves.. if i wanted a regular monstera i would have just ordered it. this dealer is a scam',
        stars = 1,
    )
    review5 = Review(
        user_id = 3,
        product_id = 1,
        review = 'I love this plant because its impossible to kill. just like my parents were with me, the more you neglect it, the better it turns out',
        stars = 5,
    )
    review6 = Review(
        user_id = 3,
        product_id = 2,
        review = 'I got this plant because i thought it would make me feel more at peace... but it doesnt. what a scam. this is totally false advertising',
        stars = 2,
    )

    reviews = [review1,review2,review3,review4,review5,review6]
    [db.session.add(review) for review in reviews]
    db.session.commit()
    
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()