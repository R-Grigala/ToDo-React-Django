import React, { useState } from "react";
import Avatar from "react-avatar-edit"

const Singup = () => {

  const [preview, setPreview] = useState(null);

  function onClose() {
    setPreview(null);
  }

  function onCrop(pv) {
    setPreview(pv);
  }

  function onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  return (
    <div className="container-singup">
      <div className="update-img"></div>      
      <Avatar
        width={122}
        height={122}
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        src={null}
      />
      {preview && <img src={preview} alt="Preview" />}
    </div>
  );
}

export default Singup