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

    image16 = ProductImages(
        product_id= 4,
        image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120959823471726632/il_1588xN.1856231937_67ep.jpeg',
    )

    image17 = ProductImages(
            product_id= 4,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120958239765438644/images.jpeg',
        )

    image18 = ProductImages(
            product_id= 4,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120959093969006784/grow-maranta-inside-1902647-02-de777eb8e7804c3d86d658cd242583d6.jpeg',
        )

    image19 = ProductImages(
            product_id= 4,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120959094191292456/grow-maranta-inside-1902647-01-bcc65290cc1f4786a7feff0a1fadeec6.jpeg',
        )

    image20 = ProductImages(
            product_id= 4,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120959227347861556/images_1.jpeg',
        )
    
    image21 = ProductImages(
        product_id= 5,
        image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120963766973108224/Purpleheart1_1200x1200.jpeg',
    )

    image22 = ProductImages(
            product_id= 5,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120962784096686101/41o9rC7TyOL._AC_UF8941000_QL80_.jpg',
        )

    image23 = ProductImages(
            product_id= 5,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120962783572414544/156070074_l-scaled.jpeg',
        )
    image24 = ProductImages(
            product_id= 5,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120962784801345558/T_pallida-container.jpg',
        )
    image25 = ProductImages(
            product_id= 5,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120962785015238776/licensed-image.jpeg',
        )
    
    image26 = ProductImages(
        product_id= 6,
        image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120966674603053146/il_1588xN.4914577738_mjll.jpeg',
    )
    image27 = ProductImages(
            product_id= 6,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120966674301059082/il_1588xN.4962836599_63zx.jpeg',
        )
    image28 = ProductImages(
            product_id= 6,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120966673944563772/il_1588xN.4962836561_hpzc.jpeg',
        )
    image29 = ProductImages(
            product_id= 6,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120966673688694794/il_1588xN.4914577716_r8v7.jpeg',
        )
    image30 = ProductImages(
            product_id= 6,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120966673441226853/il_1588xN.4962836577_89m5.jpeg',
        )
    
    image34 = ProductImages(
        product_id= 7,
        image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120968030978064454/il_794xN.png',
    )
    image31 = ProductImages(
            product_id= 7,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120968080584089630/il_794xN.png',
        )
    image32 = ProductImages(
            product_id= 7,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120968134132768808/il_794xN.png',
        )
    image33 = ProductImages(
            product_id= 7,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120968181331284049/il_794xN.png',
        )
    image35 = ProductImages(
            product_id= 7,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120968222351560816/il_794xN.png',
        )
    
    image36 = ProductImages(
        product_id= 8,
        image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120969504722260008/il_794xN.png',
    )
    image37 = ProductImages(
            product_id= 8,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120969560338743326/il_794xN.png',
        )
    image38 = ProductImages(
            product_id= 8,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120969600104939520/il_794xN.png',
        )
    image39 = ProductImages(
            product_id= 8,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120969643201400862/il_794xN.png',
        )
    
    image40 = ProductImages(
        product_id= 9,
        image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120970729509363772/il_794xN.png',
    )
    image40 = ProductImages(
            product_id= 9,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120970729895231538/il_794xN.png',
        )
    image40 = ProductImages(
            product_id= 9,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120970730264346656/il_794xN.png',
        )
    image40 = ProductImages(
            product_id= 9,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120970730616651916/il_794xN.png',
        )
    image40 = ProductImages(
            product_id= 9,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120970731015127050/il_794xN.png',
        )
    
    image41 = ProductImages(
        product_id= 10,
        image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120972150753480726/il_794xN.png',
    )
    image42 = ProductImages(
            product_id= 10,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120972151361646652/il_794xN.png',
        )
    image43 = ProductImages(
            product_id= 10,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120972152099848262/il_794xN.png',
        )
    image44 = ProductImages(
            product_id= 10,
            image_url = 'https://cdn.discordapp.com/attachments/1106274559671418943/1120972152775135323/il_794xN.png',
        )

    images = [image1, image2, image3, image16, image17, image18, image19, image20, image21, image22, image23, image24, image25, image26, image27, image28, image29, image30, image31, image32, image33, image34, image35, image36, image37, image38, image39, image40, image41, image42, image43, image44]

    [db.session.add(image) for image in images]
    db.session.commit()

def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))
        
    db.session.commit()