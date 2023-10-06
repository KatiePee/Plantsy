import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createProductThunk } from "../../store/products";
import './Products.css'
export default function CreateProduct() {
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');

  const [errors, setErrors] = useState('123');
  console.log('👤~~~~~~~~~ first error', errors)


  const dispatch = useDispatch();
  let formErrors = {}

  //form validations and errors
  const _handleErrors = () => {
    title || (formErrors.title = 'Title is required.');
    title.length < 225 || (formErrors.title = 'Title must be less than 50 character.');
    description || (formErrors.description = 'Description is required.');
    description.length < 2040 || (formErrors.description = 'Description must be less than 2040 character.');
    price || (formErrors.price = 'Price is required.');
    price > 1 || (formErrors.price = 'Price is must be greater than $1.')
    image || (formErrors.image = 'At least one image is required.');

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await _handleErrors();
    console.log('🎃~~~~in handle submite after err fun call ~~', errors)


    console.log('👹~~👹~~👹~~👹~~ form errors', formErrors)
    console.log('👹~~👹~~👹~~👹~~ des . length', title.length)
    console.log('👹~~👹~~👹~~👹~~ des . length', description.length)
    if (!Object.values(formErrors).length) {
      const productFormData = new FormData();
      productFormData.append("title", title);
      productFormData.append("description", description);
      productFormData.append("price", price);
      productFormData.append("image", image);
      // image1 && productFormData.append("image", image1);
      // image2 && productFormData.append("image", image2);
      // image3 && productFormData.append("image", image3);
      // image4 && productFormData.append("image", image4);

      const data = await dispatch(createProductThunk(productFormData));

      if (data.errors) {
        formErrors.validations = data.errors;
        setErrors({ ...formErrors });
      } else {
        history.push('/users')
      }
    } else setErrors(formErrors)
  }


  //add image styling to image files for users to preview image
  const imageStyle = {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: 'var(--shadow)'
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
        <div className="input-wrapper product-form">
           <label>
            Photos:
          </label>
          <p className="form-sublabel">
            Use a photo to show your item's most important qualities.
          </p>
          <label for="image0" className="custom-file-upload">   
            <input 
                className="image-test-input"
                id="image0"
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files[0] && setImage(e.target.files[0])}
                />
            {image && (<img src={URL.createObjectURL(image)} style={imageStyle} />)}
          </label>

        </div>
  
        <button className=" form-button signup-btn" type='submit'>
          Create Product
        </button>
        
      </form>
    </div>
  )
}