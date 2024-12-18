import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context'
import { collection,addDoc,Timestamp } from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

const Create = () => {
  const { Fstore } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const handleSubmit = () => {
    if (!name || !category || !price || !image) {
      alert('Please fill all fields....')
      return
    }
    // Convert the image to Base64
    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      addDoc(collection(Fstore,'products'), {
        name,
        category,
        price,
        image:base64Image,
        userID:user?.uid,
        timestamp:Timestamp.now(),
      });
      alert('Product upload successfully....')
      navigate('/')
    }
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            id="fname"
            onChange={(e) => setName(e.target.value)}
            name="Name"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            id="fname"
            onChange={(e) => setCategory(e.target.value)}
            name="category"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            id="fname"
            onChange={(e) => setPrice(e.target.value)}
            name="Price"
          />
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''} ></img>
          <br />
          <input onChange={(e) => {
            setImage(e.target.files[0])
          }} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
