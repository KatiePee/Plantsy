from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    product1 = Product(
        user_id = 1,
        title = "Pothos",
        description = "The Pothos, also referred to as Devil's Ivy, boasts heart-shaped leaves that come in vibrant shades of green, creating a lush and vibrant display. Its cascading vines delicately drape from hanging baskets or gracefully trail along shelves, adding a touch of natural charm to your home or office. Each leaf is a testament to your nurturing efforts, showcasing the radiant health and vitality of the plant. Easy to take care of and looking for a good home" ,
        price = 20.98,

    )
    product2 = Product(
        user_id = 2,
        title = 'Peace Lily',
        description = 'Recognized for its elegant white flowers, the Peace Lily thrives in low to medium light conditions and helps improve air quality.',
        price = 10.00,
    )
    product3 = Product(
        user_id = 3,
        title = 'Swiss Cheese Plant',
        description = 'The Swiss Cheese Plant, scientifically known as Monstera deliciosa, is a popular houseplant cherished for its large, tropical leaves that exhibit unique and striking perforations. It is native to the rainforests of Central and South America, where it climbs and trails along trees with its aerial roots.',
        price = 50.89,
    )

    products = [product1, product2, product3]
    [db.session.add(product) for product in products]
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()