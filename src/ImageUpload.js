import React, {useState} from 'react';
import { Button, Input} from '@material-ui/core';


function ImageUpload() {

    const [caption, setCaption] = useState("");
    return (
        <div>
        {/* {progess} */}
        {/* {caption} */}
        {/* {ifile picker} */}
        {/* {button} */}
        
        <input type="text" placeholder="Enter Caption here..." onChange={(e => setCaption(e.target.value))} value={caption}/>
        <input type="file" onChange={handleChange}/>
        <Button onChange={handleUpload}>Upload</Button>







            
        </div>
    )
}

export default ImageUpload

