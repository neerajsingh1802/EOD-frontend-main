import React, {useState } from "react";
import "./index.scss";

const index = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [gender, setGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [status, setStatus] = useState("");
  const [linkedinURL, setLinkedinURL] = useState("");


    // Function to handle image selection
    const handleImageSelect = (event) => {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
  };

  const handleFormSubmit = () => {
    // Handle form submission logic here (not implemented in this example)
  };

  const handleDiscard = () => {
    // Handle discard button logic here (not implemented in this example)
  };

  return (
    <div className="user-form-container">
      <h4>User Management&nbsp; ᐳ &nbsp; <span>Add users</span></h4>
      {/* Profile Picture Section */}
      <div className="profile-picture-selector">
            <label htmlFor="profile-picture-input">
                <div className="profile-picture-preview">
                    {selectedImage ? (
                        <img src={selectedImage} alt="Profile" />
                    ) : (
                        <div className="placeholder">Select Picture</div>
                    )}
                </div>
            </label>
            <input
                id="profile-picture-input"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
            />
        </div>



      {/* User Information Form */}
      <div className="user-info-form">
        {/* First Row */}
        <div className="form-row">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Select Gender"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
          />
        </div>

        {/* Second Row */}
        <div className="form-row">
          <select>
            <option value="" selected disabled hidden>
              Select Phone Number
            </option>
            <option value="+1234567890">+91 (IND)</option>
            <option value="+1987654321">+55 (AFG)</option>
            <option value="+1122334455">+255 (BEL)</option>
            <option value="+1122334455">+135 (AUS)</option>
          </select>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter Phone Number"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>
        <hr></hr>

        {/* Third Row */}
        <div className="form-row">
          <select
            value={isAdmin}
            onChange={(e) => setIsAdmin(e.target.value)}
            placeholder="Select Admin Status"
          >
            <option value="" disabled>
              System Admin
            </option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={isAdmin}
            onChange={(e) => setIsAdmin(e.target.value)}
            placeholder="Select Admin Status"
          >
            <option value="" disabled>
              Active
            </option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        {/* fourth row */}
        <div className="form-row" style={{width:"165rem"}}>
          <input
            type="text"
            value={linkedinURL}
            onChange={(e) => setLinkedinURL(e.target.value)}
            placeholder="Enter LinkedIn URL"
            
          />
        </div>
        {/* Buttons */}
        <div className="form-buttons" >
          <button onClick={handleDiscard}>Discard Creation</button>
          <button onClick={handleFormSubmit}>Add New User</button>
        </div>
        <div className="form-buttons" >
         <ul>
          <li>Click on add new user button to add details.</li>
          <li>A onboarding link will be sent to the user over above email address</li>
         </ul>
        </div>
      </div>
    </div>
  );
};

export default index;
