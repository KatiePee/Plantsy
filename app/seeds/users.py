from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    user1 = User(
        first_name='Demo', last_name='Lition', email='demo@aa.io', password='password')
    user2 = User(
        first_name='Marnie', last_name='Marn' , email='marnie@aa.io', password='password')
    user3 = User(
        first_name='Bobbie', last_name='Ross', email='bobbie@aa.io', password='password')
    user4 = User(
        first_name='Katie', last_name='Pee', email='katie@aa.io', password='password')
    user5 = User(
        first_name='Chris', last_name='Rohrbeck', email='chris@aa.io', password='password')
    user6 = User(
        first_name='Harrison', last_name='Murdock', email='harrison@aa.io', password='password')
    user7 = User(
        first_name='Greg', last_name='Tomson', email='Greg@aa.io', password='password')
    user8 = User(
        first_name='Evie', last_name='Riele', email='evie@aa.io', password='password')
    user9 = User(
        first_name='Matt', last_name='Robinson', email='matt@aa.io', password='password')
    user10 = User(
        first_name='Karen', last_name='McStiff', email='karene@aa.io', password='password')

    users = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10  ]
    [db.session.add(user) for user in users]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()