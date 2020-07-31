import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import postImage from './assets/images/9.jpg';
import './Post.css';

function Post() {
    return (
        <div className='Post'>
            
            {/* avartar + username */}
            <div className="Post__header">
                <Avatar 
                    className="Post__avatar"
                    alt="Jusername"
                    src="./assets"
                />
                <h3 className="Post__username">JocheAttah</h3>
            </div>

            {/* image */}
            <img className="Post__image" src={postImage} alt="post"/>

            {/* username + caption */}
            <div className="Post__text"> <strong>JocheAttah:</strong> Here's something from Jos</div>
        </div>
    )
}

export default Post
