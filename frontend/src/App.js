import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import CategoryScreen from './screens/CategoryScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import CreateNewUserScreen from './screens/CreateNewUserScreen';
import Loader from './components/Loader';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);
  const [postWasUpdated, setPostWasUpdated] = useState(null);

  // ============================
  // GET POSTS
  useEffect(() => {
    try {
      const getPosts = async () => {
        const { data } = await axios.get('/api/posts');
        setPosts(data);
      };

      getPosts();
    } catch (error) {
      console.log(`There was an error retrieving the posts: ${error}`);
    }
  }, [postWasUpdated]);

  // ============================
  // GET CATEGORIES
  useEffect(() => {
    try {
      const getCategories = async () => {
        const { data } = await axios.get('/api/categories');
        setCategories(data);
      };

      getCategories();
    } catch (error) {
      console.log(`There was an error retrieving the categories: ${error}`);
    }
  }, []);

  // ============================
  // CHECK USER TOKEN
  useEffect(() => {
    setLoadingUser(true);
    const checkToken = async () => {
      const { data } = await axios.post('/api/users/checktoken');
      // console.log(data.token);

      if (data.token) {
        setUser(data);
        setLoadingUser(false);
      } else {
        setLoadingUser(false);
      }
    };

    checkToken();
  }, []);

  // ============================
  // LOGOUT USER
  const handleLogout = async () => {
    const response = await axios.post('/api/users/logout');

    console.log(response);
    setUser({});
  };

  // ============================
  // SUBMIT EDIT

  return (
    <>
      <Router>
        <Header userInfo={user} handleLogout={handleLogout} />
        <main>
          <Container>
            <Switch>
              <Route
                exact
                path="/"
                component={() => (
                  <HomeScreen posts={posts} categories={categories} />
                )}
              ></Route>
              <Route
                path="/posts/:id"
                component={props => (
                  <PostScreen
                    categories={categories}
                    user={user}
                    setPostWasUpdated={setPostWasUpdated}
                    {...props}
                  />
                )}
              />
              <Route
                path="/category/:id"
                component={props => (
                  <CategoryScreen categories={categories} {...props} />
                )}
              />
              <Route
                path="/login"
                component={props => (
                  <LoginScreen setUser={setUser} {...props} />
                )}
              />
              <Route
                path="/createuser"
                component={props => <CreateNewUserScreen {...props} />}
              />
              <Route
                path="/profile"
                component={props =>
                  loadingUser ? (
                    <Loader />
                  ) : user.id ? (
                    <ProfileScreen
                      user={user}
                      categories={categories}
                      {...props}
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
            </Switch>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
