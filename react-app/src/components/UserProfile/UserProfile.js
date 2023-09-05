import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import ProductCard from "../Products/ProductCard";
import EditProductModal from "../Products/EditProductModal";
import DeleteProductModal from "../Products/DeleteProductModal";
import OpenModalButton from "../OpenModalButton";
import { myWishlistThunk } from "../../store/wishlist";
import { currentProductsThunk } from "../../store/products";
import { useModal } from "../../context/Modal";

import "./UserProfile.css";

export default function UserProfile() {
  const { setModalContent, setOnModalClose } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const productsState = useSelector((state) => state.products.userProducts);
  const wishlistState = useSelector((state) => state.wishlist);
  const [nav, setNav] = useState("products");
  const [isLoading, setIsLoading] = useState(true);
  const wishlist = wishlistState ? Object.values(wishlistState) : [];
  const products = productsState ? Object.values(productsState) : [];

  useEffect(() => {
    async function fetchData() {
      await dispatch(myWishlistThunk());
      await dispatch(currentProductsThunk());
      setIsLoading(false);
    }
    fetchData();
  }, [dispatch]);

  if (!user) {
    return <Redirect to="/" />;
  }

  if (isLoading) return <div>Loading...</div>;

  // const products = user.Products

  return (
    // <h1>user profile page!</h1>
    <div className="user-profile__wrapper">
      <div className="user-profile__header">
        <nav className="user-profile__nav-bar">
          <h3
            className={`user-profile__nav-buttons ${
              nav === "products" && "profile-active"
            }`}
            onClick={() => setNav("products")}
          >
            My Products
          </h3>
          <h3
            className={`user-profile__nav-buttons `}
            onClick={() => setNav("wishlist")}
          >
            My Wishlist
          </h3>
        </nav>
      </div>
      {/* 
      <NavLink className="user-profile__new-product" to="/products/new">
        List a new product
      </NavLink> */}
      <div className="user-profile__body">
        {nav === "products" &&
          products.map((product) => (
            <div className="user-profile__products-cards">
              <ProductCard product={product} key={product.id} />

              <ul className="product-buttons">
                <li
                  onClick={() =>
                    setModalContent(<EditProductModal product={product} />)
                  }
                >
                  <i class="fa-regular fa-pen-to-square"></i>Edit
                </li>
                <li
                  onClick={() =>
                    setModalContent(<DeleteProductModal product={product} />)
                  }
                >
                  <i class="fa-solid fa-trash-can"></i>Delete
                </li>
              </ul>
            </div>
          ))}
        {nav === "wishlist" &&
          wishlist.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
}
