import React , {useState, useEffect} from 'react';
import './App.css';
import logo from './logo 2.png';
import Post from './Post';
import {db} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen]= useState(false)

  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()})))
    });
    
    
  }, []);
  
  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div className="App">
      <Modal
        open={open}
        onClose={handleClose}
      >
      <div style={modalStyle} className={classes.paper}>
        <h3>I am a modal</h3>
      </div>
      </Modal>

      <div className="App__header">
        <img className="App__headerImage" src={logo} alt="logo"/>
      </div>

      <Button onClick={() => setOpen(true)} >Sign Up</Button>
      

      {
        posts.map((id, post) => (
          <Post
            key={id}
            username={post.username}
            caption= {post.caption}
            imageUrl={post.imageUrl}
          />
      ))}


    </div>
  );
}

export default App;
