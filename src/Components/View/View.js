import { useEffect, useContext, useState } from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs, query, where } from 'firebase/firestore';

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { Fstore } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log('Post Details:', postDetails); // Log postDetails here
        if (postDetails?.userID) {
          const userQuery = query(
            collection(Fstore, 'users'),
            where('id', '==', postDetails.userID)
          );
          const querySnapshot = await getDocs(userQuery);
          querySnapshot.forEach((doc) => {
            setUserDetails(doc.data()); // Assuming `doc.data()` contains user details
          });
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [Fstore, postDetails]); // Log and fetch whenever postDetails changes

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails?.image || "../../../Images/R15V3.jpg"} alt="Post" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price || 'Price not available'}</p>
          <span>{postDetails?.name || 'Product Name'}</span>
          <p>{postDetails?.category || 'Category not specified'}</p>
          <span>{postDetails?.timestamp?.toDate().toLocaleDateString() || 'Date not available'}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username || 'No name available'}</p>
          <p>{userDetails?.phone || 'No phone available'}</p>
        </div>
      </div>
    </div>
  );
  
}

export default View;
