from app.models import db, Product, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_wishlist():
    users = User.query.all()
    products = Product.query.all()

    #users[0].likes.append(posts[0])
    users[0].wishlist.append(products[1])
    users[0].wishlist.append(products[2])

    users[1].wishlist.append(products[0])
    users[1].wishlist.append(products[8])

    users[2].wishlist.append(products[9])
    users[2].wishlist.append(products[7])

    users[3].wishlist.append(products[6])
    users[3].wishlist.append(products[3])

    users[4].wishlist.append(products[7])
    users[4].wishlist.append(products[4])

    users[5].wishlist.append(products[5])
    users[5].wishlist.append(products[8])

    users[6].wishlist.append(products[5])
    users[6].wishlist.append(products[6])

    users[7].wishlist.append(products[9])
    users[7].wishlist.append(products[0])

    db.session.commit()

def undo_wishlist():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wishlist RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM wishlist"))

    db.session.commit()