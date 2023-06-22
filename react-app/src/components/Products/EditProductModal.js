import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { editProductThunk } from "../../store/products";
import { useModal } from '../../context/Modal'


const EditProductModal = ({ product }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal()
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState(product?.title)
  const [description, setDescription] = useState(product?.description)
  const [price, setPrice] = useState(product?.price)

  const user = useSelector(state => state.session.user)
  console.log('🍎~~~~~~~~~~~~~~~~~edit product', product)
  let formErrors = {}

  const _handleErrors = () => {
    title || (formErrors.title = 'Title is required.');
    title.length < 255 || (formErrors.title = 'Title must be less than 50 character.');
    description || (formErrors.description = 'Description is required.');
    description.length < 2040 || (formErrors.description = 'Description must be less than 2040 character.');
    price || (formErrors.price = 'Price is required.');
    price > 1 || (formErrors.price = 'Price is must be greater than $1.')
    // image || (formErrors.image = 'At least one image is required.');

    // setErrors(formErrors)
  }

  const handleSubmit = async (e) => {
    console.log('🎃~~~~~~~~~~~~~~ submit button stuff', { title, description, price })
    e.preventDefault();
    _handleErrors();


    // const images = []
    // images.push(image)
    console.log('🌿~~~~~~~~~~~~~ form errors', formErrors)
    if (!Object.values(formErrors).length) {
      const productFormData = new FormData();
      productFormData.append("title", title);
      productFormData.append("description", description);
      productFormData.append("price", price);
      // productFormData.append("images", images);
      console.log('💩~~~~~~~~~~~~~~~~~~~~~~~~~~~>', { title, description, price })
      const data = await dispatch(editProductThunk(productFormData, product.id));

      if (data.errors) {
        formErrors.validations = data.errors;
        setErrors({ ...formErrors });
      } else {
        // history.push('/users')
        closeModal()

      }
    } else setErrors(formErrors)
  }

  return (
    <div className="product-form__wrapper">
      <h3>Create a new Product</h3>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <p className='errors form__errors'>{errors.validations}</p>
        <div className="product-form__title">
          <label>
            <input
              type="text"
              className="input-info product-form__title-input"
              placeholder="Product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="errors form__errors">{errors.title}</p>
          </label>
        </div>
        <div className="product-form__description">
          <label>
            <input
              type="text"
              className="input-info product-form__description-input"
              placeholder="Product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="errors form__errors">{errors.description}</p>
          </label>
        </div>
        <div className="product-form__price">
          <label>
            <input
              type="number"
              className="input-info product-form__price-input"
              placeholder="Product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <p className="errors form__errors">{errors.price}</p>
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
            Edit Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProductModal