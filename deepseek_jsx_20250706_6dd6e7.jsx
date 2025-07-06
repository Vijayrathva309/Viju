// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { auth, db, storage } from './firebase';
import { Header, Posts, Upload, Profile, Login, Signup } from './components';

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
  }, []);

  return (
    <Router>
      <div className="app">
        <Header user={user} />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/upload">
            <Upload user={user} />
          </Route>
          <Route path="/profile/:username">
            <Profile user={user} />
          </Route>
          <Route exact path="/">
            <div className="app__posts">
              {posts.map((post) => (
                <Posts
                  key={post.id}
                  postId={post.id}
                  user={user}
                  username={post.username}
                  caption={post.caption}
                  imageUrl={post.imageUrl}
                  comments={post.comments}
                />
              ))}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;