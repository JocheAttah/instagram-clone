import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./logo 2.png";
import AddSvg from "./assets/icons/plus.svg";
import Post from "./Post";
import { db, auth } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";

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
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [openToPost, setOpenToPost] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user loged in
        console.log(authUser);
        setUser(authUser);
      } else {
        // no change
        setUser(null);
      }
      return () => {
        unsubscribe();
      };
    });
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        //desc means descending by timstamp value from firebase
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })

      .catch((error) => alert(error.message));

    setOpen(false);
    setLoggedIn(true);
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
    setLoggedIn(true);
  };

  return (
    <div className="App">
      {/* modal pop up for signup w username input */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <div>
              <img className="App__headerImage" src={logo} alt="logo" />
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

      {/* modal pop up for signin */}
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <div>
              <img className="App__headerImage" src={logo} alt="logo" />
            </div>
          </center>

          <form className="App__form">
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

            <Button onClick={handleSignIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

      <Modal open={openToPost} onClose={() => setOpenToPost(false)}>
        <div style={modalStyle} className={classes.paper}>
          <ImageUpload />
        </div>
      </Modal>

      {/* header containiing logo */}
      <div className="App__header">
        <div className="App__header--container">
          <img className="App__headerImage" src={logo} alt="logo" />

          {/* sign in/ out n log in button */}
          {user ? (
            <Button
              className="App__loginContainer--logout"
              onClick={() => auth.signOut()}
            >
              Log out
            </Button>
          ) : (
            <div className="App__loginContainer">
              <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
              <Button onClick={() => setOpen(true)}>Sign Up</Button>
            </div>
          )}
        </div>
      </div>

      <div className="App__posts">
        {/* posts */}

        <div>
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
        <div className="App__embed">
          <InstagramEmbed
            url="https://www.instagram.com/p/BeAn3s0l-im/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>

      <div className="App__footer">
        {/* login */}
        {user?.displayName ? (
          <Button onClick={() => setOpenToPost(true)}>
            {" "}
            Click Here to Add Photo{" "}
          </Button>
        ) : (
          <h4>Login to Upload</h4>
        )}
      </div>
      {/* <Button onClick={() => setOpenToPost(true)}> <img className="App__addButton" src={AddSvg} alt="Add Photo"/></Button> */}
    </div>
  );
}

export default App;
