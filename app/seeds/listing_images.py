from app.models import db, ListingImages, environment, SCHEMA
from sqlalchemy.sql import text

def seed_listing_images():
    image1 = ListingImages(
        listing_id= 1,
        image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1118593738281861242/pothos.jpeg',

    )
    image2 = ListingImages(
        listing_id= 2,
        image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1118593737543663706/peace_lilly.jpeg',
    )
    image3 = ListingImages(
        listing_id= 3,
        image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1118593737933729912/swiss_cheese_plant.jpeg'
    )

    images = [image1, image2, image3]
    [db.session.add(image) for image in images]
    db.session.commit()

def undo_listing_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.listing_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM listing_images"))
        
    db.session.commit()