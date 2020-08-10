import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import {db} from './firebase';
import './Post.css';

function Post({postId, username, caption, imageUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .onSnapshot(snapshot =>{
                setComments(snapshot.docs.map(doc => (doc.data())))
            })
        }
        return () =>{
            unsubscribe();
        }
    }, [postId]);



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

            <form action="">
                <input 
                    type="text"
                    className="Post__input"
                    placeholder="Add a comment..."
                    value={comment}
                    onchange={(e)=> setComment (e.target.value)}
                />
            </form>
        </div>
    )
}

export default Post;
