import React, { useState } from "react";

function FileUploadButton() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // Get the selected file(s)
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // Here, you can upload the selected file using APIs, send it to a server, etc.
    console.log("Uploading file:", selectedFile);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUploadButton;
