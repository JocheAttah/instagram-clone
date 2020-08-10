import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import {db} from './firebase';
import firebase from  'firebase';
import './Post.css';


function Post({postId, user, username, caption, imageUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot =>{
                setComments(snapshot.docs.map(doc => (doc.data())))
            })
        }
        return () =>{
            unsubscribe();
        }
    }, [postId]);

    
    const postComment = (e) =>{
        e.preventDefault();

        db
        .collection("posts")
        .doc(postId)
        .collection('comments')
        .add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setComment('');

    }



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

            {
                comments.map(comment => (
                  <p className="Post__comment">
                    <strong>{comment.username}</strong> <span>{comment.text}</span>
                  </p>
            ))
            }

            <form className="Post__form">
                <input 
                    type="text"
                    className="Post__input"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e)=> setComment(e.target.value)}
                />

                <button
                    className= "Post__button"
                    type="submit"
                    onClick={postComment}
                    disabled={!comment}
                >
                Post
                </button>
            </form>
        </div>
    )
}

export default Post;
