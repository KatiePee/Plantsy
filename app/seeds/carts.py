from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text

def seed_cart():
  cart_data = [
    {'user_id': 1,
     'total': 0},
     {'user_id': 2,
     'total': 0},
     {'user_id': 3,
     'total': 0},
     {'user_id': 4,
     'total': 0},
     {'user_id': 5,
     'total': 0},
     {'user_id': 6,
     'total': 0},
     {'user_id': 7,
     'total': 0},
     {'user_id': 8,
     'total': 0},
     {'user_id': 9,
     'total': 0},
     {'user_id': 10,
     'total': 0},
  ]

  carts = [Cart(**data) for data in cart_data]
  db.session.add_all(carts)
  db.session.commit()

def undo_cart():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))
        
    db.session.commit()