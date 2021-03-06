import React, { useState } from "react";
import { db, storage } from "./firebase";
import { Button, Input } from "@material-ui/core";
import firebase from "firebase";
import "./ImageUpload.css";

function ImageUpload({ username, setOpenToPost }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  // const [openToPost, setOpenToPost] = useState(false);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress functions
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(progress);
      },
      (error) => {
        // error function
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // this will post the imag inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(), 
              caption: caption,
              imageUrl: url,
              username: username
            });
            setCaption("");
            setImage(null);
            setProgress(0);
            setOpenToPost(false);
            
          });
      }
    );
  };

  return (
    <div className="ImageUpload">
      {/* {progess} */}
      <progress className="ImageUpload__progress" value={progress} max="100" />
      {/* {caption} */}
      <Input
        className="ImageUpload__caption"
        type="text"
        placeholder="Enter Caption here..."
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      {/* {ifile picker} */}
      <Input
        className="ImageUpload__file"
        type="file"
        onChange={handleChange}
      />
      {/* {button} */}
      <Button onClick={handleUpload} variant="contained" color="primary">
        Upload
      </Button>
    </div>
  );
}

export default ImageUpload;
