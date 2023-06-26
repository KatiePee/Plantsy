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
  const [image, setImage] = useState(product?.productImages[0].imageUrl);

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
      <div className="modal-form__header">
        <h2>Create a new Product</h2>
      </div>

      <form encType="multipart/form-data" onSubmit={handleSubmit} className="modal-form__form">
        <p className='errors form__errors'>{errors.validations}</p>
        <div className="input-wrapper product-form">
          <label>
            Title:
          </label>
          <p className="form-sublabel">
            Include keywords that buyers would use to search for your item.
          </p>
          <input
            type="text"
            className="input-info product-form__title-input"
            placeholder="Product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className="errors form__errors">{errors.title}</p>
        </div>
        <div className="input-wrapper product-form">
          <label>
            Description:
          </label>
          <p className="form-sublabel">
            Start with a brief overview that describes your item’s finest features. Shoppers will only see the first few lines of your description at first, so make it count!
          </p>
          <input
            type="text"
            className="input-info product-form__description-input"
            placeholder="Product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="errors form__errors">{errors.description}</p>
        </div>
        <div className="input-wrapper product-form">
          <label>
            Price:
          </label>
          <p className="form-sublabel">
            Remember to factor in the costs of materials, labor, and other business expenses.
          </p>
          <input
            type="number"
            className="input-info product-form__price-input"
            placeholder="Product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <p className="errors form__errors">{errors.price}</p>
        </div>
        {/* <div className="input-wrapper product-form">
          <label>
            Photos:
          </label>
          <p className="form-sublabel">
            Use a photo to show your item's most important qualities.
          </p>
          <input
            type="text"
            className="input-info product-form__image-input"
            placeholder="Product image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <p className="errors form__errors">{errors.image}</p>
        </div> */}
        {/* <div className="product-form-btn-wrapper"> */}
        <button className="form-button signup-btn" type='submit'>
          Save Changes
        </button>
        {/* </div> */}
      </form>
    </div>
  )


}

export default EditProductModal