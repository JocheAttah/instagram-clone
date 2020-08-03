import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './Post.css';

function Post({username, caption, imageUrl}) {
    return (
        <div className='Post'>
            
            {/* avartar + username */}
            <div className="Post__header">
                <Avatar 
                    className="Post__avatar"
                    alt="Jusername"
                    src="/assets/"
                />
                <h3 className="Post__username">{username}</h3>
            </div>

            {/* image */}
            <img className="Post__image" src={imageUrl} alt="post"/>

            {/* username + caption */}
            <div className="Post__text"> <strong>{username}:</strong> {caption}</div>
        </div>
    )
}

export default Post;
