from .db import db, environment, SCHEMA, add_prefix_for_prod

wishlist = db.Table(
"wishlist",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True
    ),
    db.Column(
        "product_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("products.id")),
        primary_key=True
    ),
    # db.UniqueConstraint('user_id', 'post_id')
)

if environment == "production":
    wishlist.schema = SCHEMA