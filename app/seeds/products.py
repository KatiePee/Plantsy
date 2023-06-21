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

    product4= Product(
        user_id = 1,
        title = 'LIVE Red Maranta prayer plant vine houseplant in 3" growers pot',
        description = "The Red Maranta, also known as the prayer plant, is a captivating addition to any indoor space. Its vibrant, variegated leaves display a rich palette of deep green hues with striking red veins, creating a visually captivating spectacle. The intricate patterns on the foliage resemble delicate brushstrokes, making it a true work of art. This particular Red Maranta prayer plant vine comes in a 3inch growers pot, allowing it to establish its roots and thrive in your chosen container or hanging basket. With its trailing growth habit, it gracefully cascades down shelves or hangs elegantly, adding depth and dimension to your living space. To keep your Red Maranta happy and healthy, provide it with consistent moisture. Water it when the top inch of soil feels slightly dry, ensuring proper drainage to prevent overwatering. Maintaining a humid environment will mimic its natural habitat, so occasional misting or placing a tray of water nearby is beneficial.Incorporate the Red Maranta prayer plant vine into your indoor oasis, and experience the joy of nurturing a living work of art. Whether you're a seasoned plant enthusiast or a beginner looking to bring the beauty of nature indoors, this vibrant houseplant is sure to captivate your heart and enhance the ambiance of your home." ,
        price = 11.95,
    )

    product5 = Product(
        user_id = 2,
        title = 'PURPLE Hearts Tradescantia',
        description = "Introducing the captivating PURPLE Hearts Tradescantia, a remarkable houseplant that will steal your heart with its enchanting beauty. With its striking purple foliage, this plant is a true showstopper. Each heart-shaped leaf features a mesmerizing shade of deep purple, creating a bold and eye-catching display. As the light dances upon its leaves, the PURPLE Hearts Tradescantia adds a touch of elegance and sophistication to any indoor space. This plant is not only visually stunning but also incredibly easy to care for. It thrives in a variety of lighting conditions, from bright indirect light to partial shade. Its low-maintenance nature makes it a perfect choice for both experienced plant enthusiasts and beginners alike. In addition to its aesthetic appeal, the PURPLE Hearts Tradescantia also offers air-purifying properties, helping to improve the air quality of your home. It's a wonderful companion for those seeking both beauty and wellness benefits. Add a touch of enchantment and a burst of color to your indoor sanctuary with the PURPLE Hearts Tradescantia. Bring this mesmerizing plant home today and enjoy the beauty it brings to your everyday life." ,
        price = 26.65,
    )

    product6 = Product(
        user_id = 3,
        title = 'Rare ALBO Variegated Monstera Deliciosa Halfmoon Rooted Nodes Cuttings',
        description = "Behold the exquisite Rare ALBO Variegated Monstera Deliciosa Halfmoon! This plant is a true gem for any collector or plant enthusiast, boasting stunning variegation that adds a touch of elegance to your indoor jungle.With its unique halfmoon-shaped variegation, this Monstera Deliciosa variety stands out from the crowd. The glossy, heart-shaped leaves showcase a mesmerizing blend of vibrant green and striking white variegation. Each leaf is a work of art, with patterns that vary from leaf to leaf, making every plant truly one-of-a-kind.Caring for your ALBO Variegated Monstera requires providing bright, indirect light to maintain its vibrant variegation. Moderate watering, allowing the soil to slightly dry out between waterings, is recommended to prevent overwatering and maintain a healthy root system.As your Monstera Deliciosa Halfmoon grows, its trailing vines will gracefully cascade, creating an enchanting display. This captivating plant will become the centerpiece of your botanical haven, drawing attention with its unique variegation and lush foliage." ,
        price = 96.22,
    )

    product7 = Product(
        user_id = 1,
        title = 'top air purification plant for indoor environments live potted plant,15”-18” tall, neanthe bella palm, easy to care for plant, pet safe',
        description = 'lush parlor palm. 15-17”inches tall and rooted in a 4” pot. Lush green houseplant instantly enhances your decor. Widely used in interior design settings. Considered a top air purification plant for indoor Purification. It\'s adapted to relatively low light, can handle lower temperatures, and grows in attractive clumps with light-textured foliage cloaking thin trunks. These factors make the parlor palm one of the most popular indoor palms grown in most temperate countries. as a houseplant, 2 to 6 feet tall and 2 to 3 feet wide At a mature age. Bright indirect lighting preferred. These are considered low-light palms, but that doesn\'t mean "no-light" palms. They still prefer bright, filtered sunlight to do their best Like many palms, parlor palms are sensitive to overwatering and cannot tolerate being waterlogged or sitting in the saturated potting mix. Even moisture is ideal. Err on the side of slightly too dry rather than overwatering. Water when the top 1 inch of the soil feels dry. Yellow fronds will indicate the plant needs more water' ,
        price = 32.22,
    )

    product8 = Product(
        user_id = 4,
        title = '4" Zebra House Plant - Fully Rooted - Aphelandra Squarrosa - Live House Plant',
        description = 'You will receive a plant similar to the one pictured in a 4" nursery pot.' ,
        price = 16.90,
    )

    product9 = Product(
        user_id = 5,
        title = 'Coffee plant, Arabica plant, evergreen houseplant in 3"pot',
        description = 'Coffee Plant (Coffea Arabica, Coffee Tree or Arabian Coffee) is an evergreen house plant pale green leaves. The fragrant blooming, which usually can appear in spring, turns into grains which ripe with time. Coffee Plant cleans the indoor air from harmful substances and can fill the house with positive energy. LIGHT: well-lit place with no direct sunlight; prefers permanent place. WATERING: moderate; water immediately when the topsoil dries; use water without chalk-stone. HUMIDITY: high level of air humidity; requires regular misting, except for blooming period.FERTILIZING: once in 2 weeks from spring to fall with mineral fertilizer rich in nitrogen and potassium salts; no need to feed in winter.REPOTTING: a few weeks after arrival, using one size bigger pot and potting mix.' ,
        price = 12.20,
    )

    product10 = Product(
        user_id = 4,
        title = 'Philodendron black cherry Pink Princess Starter Plant (ALL STARTER PLANTS require you to purchase 2 plants!)',
        description = 'This listing is for a philodendron Pink Princess black cherry starter plant . This culture comes from a black cherry pink princess and we have been eagerly waiting it’s completion! In order to get the dark color. The plant must be grown in very low light and fertilized. Without those conditions, we haven’t seen it live up to the mother plants genetics. Please keep in mind that variegation will vary from plant to plant. We can do bulk deals, message us. The plant will be shipped in a soil pod, please do not remove or disturb the soil pod it comes in. The soil pod will be carefully wrapped for safe shipping. The actual plant can and will vary from the picture on the posting. You will receive a plant similar to the one pictured.' ,
        price = 22.20,
    )

    products = [product1, product2, product3, product4, product5, product6, product7, product8, product9, product10 ]
    [db.session.add(product) for product in products]
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()