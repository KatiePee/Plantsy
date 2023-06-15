import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createProductThunk } from "../../store/products";

export default function CreateProduct() {
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState({});



  const dispatch = useDispatch();
  let formErrors = {}

  const _handleErrors = () => {
    title || (formErrors.title = 'Title is required.');
    title.length < 50 || (formErrors.title = 'Title must be less than 50 character.');
    description || (formErrors.description = 'Description is required.');
    description.length < 2040 || (formErrors.description = 'Description must be less than 2040 character.');
    price || (formErrors.price = 'Price is required.');
    price > 1 || (formErrors.price = 'Price is must be greater than $1.')
    image || (formErrors.image = 'At least one image is required.');

    setErrors(formErrors)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    _handleErrors();
    console.log('✏️~~~~~~', title, description, price, image)
    console.log(errors)
    const images = []
    images.push(image)

    console.log('👹~~👹~~👹~~👹~~ handle submit images', images)
    if (!Object.values(errors).length) {
      const productFormData = new FormData();
      productFormData.append("title", title);
      productFormData.append("description", description);
      productFormData.append("price", price);
      productFormData.append("images", images);

      const data = await dispatch(createProductThunk(productFormData));

      if (data) {
        formErrors.validationErrors = data;
        setErrors({ ...formErrors });
      } else {
        history.push('/')
      }
    } else setErrors(formErrors)
  }


  return (
    <div className="product-form__wrapper">
      <h3>Create a new Product</h3>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
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
        <div className="product-form__image">
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
        </div>
        <div className="product-form-btn-wrapper">
          <button className="signup-btn" type='submit'>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}