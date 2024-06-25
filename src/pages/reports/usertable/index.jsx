import React from "react";
import "./index.scss"; // Adjust the path as needed

const UserTable = ({ userData, searchTerm, handleSearch }) => {
  const filteredData = userData.filter((item) =>
    item.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-table">
      <p>Total Users: {userData.length}</p>
      <input
        type="text"
        placeholder="Search by user name..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Profile Pic</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Email</th>
            <th>Phone</th>
            <th>LinkedIn</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, index) => (
            <tr key={index}>
              <td>
                <img
                  src={user.profileImage}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="profile-image"
                />
              </td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.Designation}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <a
                  href={user.LinkedinURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </td>
              <td style={{ color: user.status === "Active" ? "green" : "red" }}>
                {user.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
