import React, { useState, useEffect } from "react";
import UserTable from "./usertable/index"; // Adjust the path as needed
import "./Index.scss"; // Adjust the path as needed

const Index = () => {
  const [userData, setUserData] = useState([
    // {
    //   profileImage: "/public/pic1",
    //   firstName: "John",
    //   lastName: "Doe",
    //   Designation: "System Admin",
    //   email: "john.doe@example.com",
    //   phoneNumber: "123-456-7890",
    //   LinkedinURL: "https://linkedin.com/in/johndoe",
    //   status: "Active",
    // },
    // {
    //   profileImage: "./public/pic2",
    //   firstName: "Jane",
    //   lastName: "Smith",
    //   Designation: "User Admin",
    //   email: "jane.smith@example.com",
    //   phoneNumber: "098-765-4321",
    //   LinkedinURL: "https://linkedin.com/in/janesmith",
    //   status: "Inactive",
    // },
    // Add more user data here
  ]);

  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [newUser, setNewUser] = useState({
    profileImage: "",
    firstName: "",
    lastName: "",
    Designation: "",
    email: "",
    phoneNumber: "",
    LinkedinURL: "",
    status: "Active",
  });

  useEffect(() => {
    updateCounts();
  }, [userData]);

  const updateCounts = () => {
    const activeUsers = userData.filter((user) => user.status === "Active");
    const inactiveUsers = userData.filter((user) => user.status === "Inactive");
    setActiveCount(activeUsers.length);
    setInactiveCount(inactiveUsers.length);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setNewUser({
      ...newUser,
      profileImage: imageUrl,
    });
  };

  const handleAddUser = () => {
    setUserData([...userData, newUser]);
    setNewUser({
      profileImage: "",
      firstName: "",
      lastName: "",
      Designation: "",
      email: "",
      phoneNumber: "",
      LinkedinURL: "",
      status: "Active",
    });
    setShowModal(false);
  };

  return (
    <div>
      <h4>User Management</h4>
      <div className="kg-button">
        <p>Active Users: {activeCount}</p>
        <p>Inactive Users: {inactiveCount}</p>
        <button onClick={() => setShowModal(true)}>Add New User</button>
      </div>
      <UserTable
        userData={userData}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />

      {showModal && (
        <div className="user-form-container">
          <h4>
            User Management&nbsp; ᐳ &nbsp; <span>Add users</span>
          </h4>
          <div className="profile-picture-selector">
            <label htmlFor="profile-picture-input">
              <div className="profile-picture-preview">
                {newUser.profileImage ? (
                  <img src={newUser.profileImage} alt="Profile" />
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

          <div className="user-info-form">
            <div className="form-row">
              <select
                name="gender"
                value={newUser.gender}
                onChange={handleChange}
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
                name="firstName"
                value={newUser.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
              />
              <input
                type="text"
                name="lastName"
                value={newUser.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
              />
            </div>

            <div className="form-row">
              <select name="phoneCountry" onChange={handleChange}>
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
                name="phoneNumber"
                value={newUser.phoneNumber}
                onChange={handleChange}
                placeholder="Enter Phone Number"
              />
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </div>
            <hr></hr>

            <div className="form-row">
              <input
                type="text"
                name="Designation"
                value={newUser.Designation}
                onChange={handleChange}
                placeholder="Enter Designation"
              />
              <select
                name="status"
                value={newUser.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="form-row" style={{ width: "165rem" }}>
              <input
                type="text"
                name="LinkedinURL"
                value={newUser.LinkedinURL}
                onChange={handleChange}
                placeholder="Enter LinkedIn URL"
              />
            </div>

            <div className="form-buttons">
              <button onClick={() => setShowModal(false)}>
                Discard Creation
              </button>
              <button onClick={handleAddUser}>Add New User</button>
            </div>
            <div className="form-buttons">
              <ul>
                <li>Click on add new user button to add details.</li>
                <li>
                  A onboarding link will be sent to the user over above email
                  address
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
