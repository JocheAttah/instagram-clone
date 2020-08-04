import React , {useState, useEffect} from 'react';
import './App.css';
import logo from './logo 2.png';
import Post from './Post';
import {db, auth} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input} from '@material-ui/core';


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
  const [open, setOpen]= useState(false);
  const [username, setUsername]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [user, setUser]= useState(null);
  
  
  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        // user loged in
        console.log(authUser)
        setUser(authUser)

      }else{
        // no change 
        setUser(null)

      }

      return () =>{
        unsubscribe()
      }
    })
  }, [user, username])

  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));   
      
    });   
   
  }, []);
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () =>{

  }

  const handleSignUp =(e) =>{
    e.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser){
      return authUser.user.updateProfile({
        displayName: username;
      })
    })
    .catch((error) => alert(error.message))
  }

  console.log(posts);

  return (
    <div className="App">
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          
          <center>
            <div>
              <img className="App__headerImage" src={logo} alt="logo"/>
            </div>
          </center>

          <form className="App__form">
            <Input 
              type="text"
              placeholder="Username"              
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input 
              type="email"
              placeholder="Email"              
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />  
            <Input 
              type="password"
              placeholder="Password"              
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={handleSignUp}>Create Account!!</Button>
          </form>
        </div>
      </Modal>

      <div className="App__header">
        <img className="App__headerImage" src={logo} alt="logo"/>
      </div>

      <Button onClick={() => setOpen(true)} >Sign Up</Button>
      

      {
        posts.map(({id, post}) => (
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
