import { useEffect, useContext, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { getDocs, collection } from 'firebase/firestore'
import { PostContext } from '../../store/PostContext';
import {useNavigate} from 'react-router-dom'

function Posts() {
  const { Fstore } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(Fstore, 'products')); // Fetch products from Firestore
        const productsList = snapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID
          ...doc.data(), // Include document data
        }));
        setProducts(productsList); // Set the fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [Fstore]);

  return (
    <div className="postParentDiv">
      {/* Quick Menu Section */}
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((doc) => (
            <div
              key={doc.id}
              className="card"
              onClick={() => {
                setPostDetails(doc);
                navigate('/view');
              }}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={doc.image} alt={doc.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {doc.price}</p>
                <span className="kilometer">{doc.category}</span>
                <p className="name">{doc.name}</p>
              </div>
              <div className="date">
                <span>
                  {doc.timestamp &&
                    doc.timestamp.toDate().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fresh Recommendations Section */}
      <div className="recommendations">
        <div className="heading">
          <span>Fresh Recommendations</span>
        </div>
        <div className="cards">
          {products.map((doc) => (
            <div
              key={doc.id}
              className="card"
              onClick={() => {
                setPostDetails(doc);
                navigate('/view');
              }}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={doc.image} alt={doc.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {doc.price}</p>
                <span className="kilometer">{doc.category}</span>
                <p className="name">{doc.name}</p>
              </div>
              <div className="date">
                <span>
                  {doc.timestamp &&
                    doc.timestamp.toDate().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
