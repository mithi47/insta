import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const existingData = JSON.parse(localStorage.getItem("insta")) || [];
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from local storage based on session storage username
    const sessionData = JSON.parse(sessionStorage.getItem("instaa")) || [];
    const username = sessionData[0].username;
    const user = existingData.find(user => user.username === username);
    setUserData(user);
  }, []);

  // Function to handle posting new images
  const handlePostImage = (event) => {
    event.preventDefault();
    // Get the image data and append it to the user's post object
    const image = event.target.elements.image.files[0];
    if (!image) return; // Do nothing if no image selected
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const imageData = reader.result; // Base64-encoded image data
      const updatedUser = { ...userData, post: { ...userData.post, [Date.now()]: imageData } };
      // Update the user data in local storage
      const updatedData = existingData.map(user => user.username === userData.username ? updatedUser : user);
      localStorage.setItem("insta", JSON.stringify(updatedData));
      // Update state to reflect changes
      setUserData(updatedUser);
    };
  };

  // Function to handle logout
  const logout = () => {
    sessionStorage.removeItem("instaa");
    navigate('/login');
  };

  // Function to handle image click
  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  // Function to handle deleting an image
  const handleDeleteImage = (timestamp) => {
    const updatedPost = { ...userData.post };
    delete updatedPost[timestamp];
    const updatedUser = { ...userData, post: updatedPost };
    const updatedData = existingData.map(user => user.username === userData.username ? updatedUser : user);
    localStorage.setItem("insta", JSON.stringify(updatedData));
    setUserData(updatedUser);
    setSelectedImage(null); // Close modal after deleting
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: 'black', color: 'white' }}>
      <div className="row">
   
        <div className="col-6">
          {userData && (
            <div>
            <img src={userData.image} alt="Profile Pic" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
            <br/>
            <br/>
            <span><h2>Hello!! {userData.username}        
            </h2></span>
            </div>
          )}
        </div>
        <div className="col-6 text-end">
          <h1>HeHe</h1>
          <br/>
          <button className="btn btn-danger justify-content-center" onClick={logout}>
                Logout
              </button>
        </div>
      </div>
      <hr/>
      <div className="row mt-3 justify-content-center">       
       <div className="col-md-9">
          {/* Post new images form */}
          <h2>Post New Image</h2>
          <form onSubmit={handlePostImage}>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image:</label>
              <input type="file" id="image" className="form-control" accept="image/*" required />
            </div>
            <button type="submit" className="btn btn-primary">Post</button>
          </form>

          <hr/>
          {/* Display user's posted images */}
          <h2>Posted Images</h2>
          {userData && Object.keys(userData.post).map(timestamp => (
            <div key={timestamp} style={{ display: 'inline-block', margin: '70px' }}>
              <img
                src={userData.post[timestamp]}
                alt={`Posted Image ${timestamp}`}
                style={{ width: '200px', height: '200px', cursor: 'pointer' }}
                onClick={() => handleImageClick(userData.post[timestamp])}
              />
              {/* Modal to display enlarged image and delete button */}
              {selectedImage === userData.post[timestamp] && (
                <div className="modal" style={{ display: 'block', position: 'fixed', zIndex: 1, left: 0, top: 0, width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                  <div className="modal-content" style={{ margin: '15% auto', padding: '20px', border: '1px solid #888', width: '40%', backgroundColor: 'black', borderRadius: '5px' }}>
                    <span className="close" style={{ color: 'white', float: 'right', fontSize: '28px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setSelectedImage(null)}>&times;</span>
                    <img src={selectedImage} alt="Enlarged Image" style={{ width: '100%', height: 'auto' }} />
                    <button className="btn btn-danger" onClick={() => handleDeleteImage(timestamp)}>Delete</button>
                  </div>
                </div>
                
              )}
              
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default Home;
