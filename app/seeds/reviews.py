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

    review7 = Review(
        user_id = 2,
        product_id = 4,
        review = "The LIVE Red Maranta prayer plant vine is decent. The color is vibrant, but the plant seems a bit smaller than expected. It requires a lot of care and attention to thrive. Overall, it's an average plant for me.",
        stars = 3,
    )
    review8 = Review(
        user_id=3,
        product_id=4,
        review="I absolutely love the LIVE Red Maranta prayer plant vine in the 3\" growers pot! The vibrant color of the leaves is breathtaking, and it adds a lively touch to my living room. The plant arrived in perfect condition, well-packaged and healthy. It has been thriving ever since I brought it home. The care instructions provided were clear and easy to follow, making it a joy to nurture. I highly recommend this plant to anyone looking for a beautiful and low-maintenance addition to their indoor space. It deserves a solid 5-star rating!",
        stars=5,
    )

    review9 = Review(
        user_id=6,
        product_id=4,
        review="This plant is a lovely addition to my home. The colors are vibrant and eye-catching, and the plant arrived in good condition. It has been growing well, and I enjoy taking care of it. The only reason I'm giving it 4 stars instead of 5 is that it requires a bit more attention and maintenance than I initially expected. Nonetheless, I'm still satisfied with my purchase and would recommend it to other plant enthusiasts.",
        stars=4,
    )

    review10 = Review(
      user_id=10,
      product_id=4,
      review="I am extremely disappointed with the Red Maranta prayer plant i recieved growers pot. The plant arrived in terrible condition, with wilted and yellowing leaves. Despite my best efforts to revive it, the plant did not survive. It was a waste of money, and I do not recommend purchasing this product.",
      stars=1,
    )    

    review11 = Review(
      user_id=1,
      product_id=5,
      review="I am absolutely in love with the PURPLE Hearts Tradescantia! This houseplant has exceeded my expectations in every way. The striking purple foliage is mesmerizing and adds a vibrant burst of color to my indoor space. Each heart-shaped leaf is a true work of art, creating a captivating and eye-catching display. Taking care of this plant is a breeze. It thrives in various lighting conditions, from bright indirect light to partial shade, making it versatile for any room. As someone who is new to plant care, I appreciate its low-maintenance nature, which makes it an ideal choice for beginners.Not only is the PURPLE Hearts Tradescantia visually stunning, but it also offers air-purifying properties, improving the air quality in my home. It's a beautiful and beneficial addition to my indoor sanctuary.I highly recommend the PURPLE Hearts Tradescantia to anyone looking to add a touch of enchantment and elegance to their space. It has truly brought joy and beauty to my everyday life. This remarkable plant deserves a solid 5-star rating!",
      stars=5,
    )

    review12 = Review(
    user_id=4,
    product_id=5,
    review="It's like having a moody teenager as a plant. The PURPLE Hearts Tradescantia is visually stunning, but it has a habit of being a bit dramatic with its care needs. It keeps me on my toes, but I guess that's what makes it interesting. Three stars for the gorgeous drama!",
    stars=3,
    )

    review13 = Review(
        user_id=3,
        product_id=5,
        review="This PURPLE Hearts Tradescantia is a heart-stealer! It's like having a tiny purple Valentine in my living room. Easy to care for and adds a pop of color. Giving it 4 stars because it hasn't written me a love letter yet. 😉",
        stars=4,
    )

    review14 = Review(
        user_id=10,
        product_id=5,
        review="It's an absolute disaster. The color is too vibrant and distracting. I can't handle all these heart-shaped leaves. It's too much! I want my money back and a lifetime supply of plain, boring plants. Absolutely disappointed!",
        stars=1,
    )

    review15 = Review(
        user_id=4,
        product_id=6,
        review="I love this plant, the sellers took great care when shipping. The stunning variegation adds elegance to my indoor jungle. The unique halfmoon-shaped leaves are like works of art. Caring for this plant is a joy, with bright, indirect light and moderate watering. It has become the centerpiece of my botanical haven. Highly recommended with a solid 5-star rating!",
        stars=5,
        )

    review16 = Review(
        user_id=5,
        product_id=6,
        review="The Rare ALBO Variegated Monstera Deliciosa Halfmoon: a plant that steals the show! Its variegation is so fancy, it's like the Monstera is wearing a tuxedo. Almost gave it 5 stars, but it keeps asking for autographs like a diva. Still, it's a stunning addition to my indoor jungle!",
        stars=4,
    )

    review17 = Review(
        user_id=5,
        product_id=6,
        review="This Rare ALBO Variegated Monstera Deliciosa Halfmoon is the Beyoncé of my plant collection! It's fierce, fabulous, and absolutely stunning. I can't help but feel like a proud plant parent with this beauty in my home. 5 stars for bringing superstar vibes to my indoor jungle!",
        stars=5,
    )

    review18 = Review(
        user_id=6,
        product_id=6,
        review="This plant is like having a diva in my indoor jungle. It demands attention with its fancy variegation. While it's undeniably stunning, it can be a bit high-maintenance. I've had to keep up with its diva-like watering preferences. Overall, it's a unique plant, but be prepared to give it some extra love!",
        stars=3,
    )

    review19 = Review(
        user_id=10,
        product_id=6,
        review="Not a fan, this plant is too fancy for its own good! It's like the diva of plants, demanding all the attention with its fancy variegation. I couldn't keep up with its high-maintenance needs, and now it's just a sad reminder of my failed attempt at plant parenthood. Not for the faint of heart or the black thumbs!",
        stars=1,
    )

    review20 = Review(
    user_id=2,
    product_id=7,
    review="The Neanthe Bella Palm has its ups and downs. On one hand, it's a top air purification plant and adds a lush green touch to your decor. It's widely used in interior design settings. However, I found it a bit challenging to care for. Despite being touted as easy to care for, it required more attention than I expected. The preference for bright indirect lighting made it a bit tricky to find the perfect spot for it. Additionally, I struggled to find the right balance with watering. Overwatering led to yellow fronds, and underwatering made the plant look dry. While it has its benefits, it didn't quite meet my expectations. 2 stars.",
    stars=2,
    )

    review21 = Review(
    user_id=3,
    product_id=7,
    review="This Neanthe Bella Palm is the superhero of air purification! It's like having a tiny plant version of Captain Clean-Air in my living room. It effortlessly adds a touch of greenery and saves me from the perils of indoor pollutants. Plus, it's pet-safe, so my fur babies can enjoy the benefits too. Five stars for this green guardian!",
    stars=5,
    )

    review22 = Review(
    user_id=7,
    product_id=7,
    review="once I figured out its quirks, it became a great addition to my plant family. Just be prepared to give it some extra love and attention. 4 stars!",
    stars=4,
    )

    review23 = Review(
    user_id=4,
    product_id=7,
    review="The Neanthe Bella Palm is a green oasis in my home, but the shipping left me feeling a bit palm-slapped. The plant itself is lovely and adds a nice touch to my decor. However, it arrived with a few blemishes and wilted leaves due to poor packaging. I had to nurse it back to health, but it's doing okay now. So, 3 stars for the palm, but a gentle reminder to the shipping department to handle with care!",
    stars=3,
    )

    review24 = Review(
    user_id=2,
    product_id=8,
    review="The Aphelandra Squarrosa is a vibrant delight! Its bold patterns, bright yellow flowers, and tropical vibes bring joy to my space. Easy to care for, it thrives in bright light and regular watering. It also acts as a natural air purifier, improving indoor air quality. Highly recommended for a touch of tropical paradise. 5 stars!",
    stars=5,
    )

    review25 = Review(
    user_id=10,
    product_id=8,
    review="I am absolutely livid about this Aphelandra Squarrosa! It arrived looking like it had been through a plant tornado. The leaves were all wilted and sad, as if it had gone on a wild bumpy ride during shipping. It's like they played a game of 'hot potato' with my poor plant! I demand to speak to the manager of the shipping department! This is not how you treat a delicate green goddess. One star for the disastrous handling and shipping debacle!",
    stars=1,
    )

    review26 = Review(
    user_id=8,
    product_id=8,
    review="The Aphelandra Squarrosa is a tropical gem! Its vibrant colors and striking patterns bring paradise into my home. It's low maintenance, thriving in bright light with regular watering. This plant is not only visually stunning but also acts as a natural air purifier. I'm delighted with my purchase and give it 5 stars!",
    stars=5,
    )

    review27 = Review(
    user_id=4,
    product_id=9,
    review="The Coffee Plant is a lovely addition to any indoor space. Its pale green leaves create a soothing atmosphere, and the fragrance during blooming adds a delightful touch. I appreciate that it helps purify the indoor air and brings positive energy to the house.The care instructions provided were helpful. Placing it in a well-lit area without direct sunlight and watering moderately when the topsoil dries have worked well for me. The high humidity requirement and regular misting have been manageable, except during the blooming period.The only reason I'm giving it 4 stars is because the fertilizing frequency feels a bit high. Once every 2 weeks from spring to fall seems a bit demanding. However, overall, I'm pleased with this Coffee Plant and its contribution to my indoor space.",
    stars=4,
    )

    review28 = Review(
    user_id=6,
    product_id=9,
    review="Move over, morning coffee! The Coffee Plant is my new energy booster. It's like having a tiny barista in my living room. The pale green leaves bring a refreshing vibe, and the fragrance during blooming is a wake-up call for my senses. Plus, it cleans the air and adds some serious java joy to my space. 5 stars, no decaf!",
    stars=5,
    )

    review29 = Review(
    user_id=8,
    product_id=9,
    review="The Coffee Plant is like my own personal barista, but without the actual coffee. It's a lovely plant with pale green leaves and a fragrant blooming period. However, I have to admit, I was hoping for a side of espresso with it. Three stars for being a good-looking plant, but it's a bit of a tease without the caffeine!",
    stars=3,
    )

    review30 = Review(
    user_id=10,
    product_id=9,
    review="I am utterly disappointed with this Coffee Plant! I was expecting it to be bigger, but it arrived looking like it had been through a coffee grinder. The poor thing was damaged and much smaller than I anticipated. I guess it's true what they say, 'big things come in small packages,' but in this case, it's a small disappointment. One star for the underwhelming size and damaged condition on arrival.",
    stars=1,
    )

    review31 = Review(
    user_id=1,
    product_id=10,
    review="I am absolutely thrilled with the Philodendron Black Cherry Pink Princess Starter Plant! The anticipation was worth it as I watched it grow into a beautiful addition to my plant collection. I followed the instructions and provided it with low light and fertilization, and the result is stunning. The variegation on each plant is unique, adding to its charm. The packaging was secure, ensuring the safe arrival of the soil pod. While the actual plant may vary from the picture, it exceeded my expectations. Thank you for offering such a delightful starter plant!",
    stars=5,
    )

    review32 = Review(
    user_id=7,
    product_id=10,
    review="The Philodendron Black Cherry Pink Princess Starter Plant is a gem! It has exceeded my expectations with its unique variegation and beautiful growth. I'm thrilled to have it in my collection.",
    stars=5,
    )

    review33 = Review(
    user_id=8,
    product_id=10,
    review="The Philodendron Black Cherry Pink Princess Starter Plant is decent. It grew fine, but the variegation was not as pronounced as I had hoped. The packaging was secure, but the actual plant looked different from the picture. It's an okay addition to my collection, but not exceptional.",
    stars=3,
    )

    review34 = Review(
    user_id=8,
    product_id=10,
    review="good lookin plant!",
    stars=4,
    )

    reviews = [review1,review2,review3,review4,review5,review6, review7, review8, review9, review10, review11, review12, review13, review14, review15, review16, review17, review18, review19, review20, review21, review22, review23, review24, review25, review26, review27, review28, review29, review30, review31, review32, review33, review34  ]
    [db.session.add(review) for review in reviews]
    db.session.commit()
    
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()