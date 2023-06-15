import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const EditProductModal = ({ product }) => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { title, description, price } = product
  console.log('👾~~~~~~~~~~~~~~~~~product~~~~~~~~~~~', title)

  const [newTitle, setNewTitle] = useState(product?.title)
  console.log('🎃~~~~~~~~~~~~~~~~~product~~~~~~~~~~~', newTitle)

  const [newDescription, setNewDescription] = useState(description)
  const [newPrice, setNewPrice] = useState(price)
  const user = useSelector(state => state.session.user)


  return (

    <div className="product-form__wrapper">
      <h3>Create a new Product</h3>
      {/* <form encType="multipart/form-data" onSubmit={handleSubmit}> */}
      <form encType="multipart/form-data" >
        <div className="product-form__title">
          <label>
            <input
              type="text"
              className="input-info product-form__title-input"
              placeholder="Product title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            {/* <p className="errors form__errors">{errors.title}</p> */}
          </label>
        </div>
        <div className="product-form__description">
          <label>
            <input
              type="text"
              className="input-info product-form__description-input"
              placeholder="Product description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            {/* <p className="errors form__errors">{errors.description}</p> */}
          </label>
        </div>
        <div className="product-form__price">
          <label>
            <input
              type="number"
              className="input-info product-form__price-input"
              placeholder="Product price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
            {/* <p className="errors form__errors">{errors.price}</p> */}
          </label>
        </div>
        {/* <div className="product-form__image">
          <label>
            <input
              type="text"
              className="input-info product-form__image-input"
              placeholder="Product image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <p className="errors form__errors">{errors.image}</p>
          </label>
        </div> */}
        <div className="product-form-btn-wrapper">
          <button className="signup-btn" type='submit'>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProductModal