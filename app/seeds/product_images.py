from app.models import db, ProductImages, environment, SCHEMA
from sqlalchemy.sql import text

def seed_product_images():
    image1 = ProductImages(
        product_id= 1,
        image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1118593738281861242/pothos.jpeg',

    )
    image2 = ProductImages(
        product_id= 2,
        image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1118593737543663706/peace_lilly.jpeg',
    )
    image3 = ProductImages(
        product_id= 3,
        image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1118593737933729912/swiss_cheese_plant.jpeg'
    )

    images = [image1, image2, image3]
    [db.session.add(image) for image in images]
    db.session.commit()

def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))
        
    db.session.commit()