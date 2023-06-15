import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createListingThunk } from "../../store/listings";

export default function CreateListing() {
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

    if (!Object.values(errors).length) {
      // const listingFormData = new FormData();
      // listingFormData.append("title", title);
      // listingFormData.append("description", description);
      // listingFormData.append("price", price);
      // listingFormData.append("image", image);
      // for (let image of images) {
      //   postFormData.append("images", image);
      // }
      // console.log('🍎~🍎~🍎~🍎~🍎~~~ create listing listingFormData', listingFormData)
      const data = await dispatch(createListingThunk({ title, description, price, image }));

      if (data) {
        formErrors.validationErrors = data;
        setErrors({ ...formErrors });
      } else {
        history.push('/')
      }
    } else setErrors(formErrors)
  }


  return (
    <div className="listing-form__wrapper">
      <h3>Create a new Listing</h3>
      <form encType="multipart/form-data">
        <div className="listing-form__title">
          <label>
            <input
              type="text"
              className="input-info listing-form__title-input"
              placeholder="Product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="errors form__errors">{errors.title}</p>
          </label>
        </div>
        <div className="listing-form__description">
          <label>
            <input
              type="text"
              className="input-info listing-form__description-input"
              placeholder="Product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="errors form__errors">{errors.description}</p>
          </label>
        </div>
        <div className="listing-form__price">
          <label>
            <input
              type="number"
              className="input-info listing-form__price-input"
              placeholder="Product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <p className="errors form__errors">{errors.price}</p>
          </label>
        </div>
        <div className="listing-form__image">
          <label>
            <input
              type="text"
              className="input-info listing-form__image-input"
              placeholder="Product image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <p className="errors form__errors">{errors.image}</p>
          </label>
        </div>
        <div className="listing-form-btn-wrapper">
          <button className="signup-btn" onClick={handleSubmit}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}