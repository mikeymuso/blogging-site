import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ProfileMenu from '../components/ProfileMenu';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import PostsTable from '../components/PostsTable';
import Loader from '../components/Loader';
import CommentsTable from '../components/CommentsTable';
import axios from 'axios';
import EditPostForm from '../components/EditPostForm';
import NewPostForm from '../components/NewPostForm';
import AdminPostsTable from '../components/AdminPostsTable';
import AdminUsersTable from '../components/AdminUsersTable';
import UserDetails from '../components/UserDetails';

const ProfileScreen = ({ user, categories }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [databaseDidChange, setDatabaseDidChange] = useState({});

  useEffect(() => {
    setLoading(true);

    try {
      const getPosts = async () => {
        const { data } = await axios.get(`/api/posts/profile/${user.id}`);

        setPosts(data);
        setLoading(false);
      };

      getPosts();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [user, databaseDidChange]);

  return (
    <Container className="m-0 p-0">
      <ProfileMenu
        options={[
          { title: 'New Post', link: 'create' },
          { title: 'My Posts', link: 'posts' },
          { title: 'My Comments ', link: 'comments' },
          { title: 'My Details', link: 'details' },
        ]}
        title={'PROFILE'}
      />

      {Boolean(user.isAdmin) && (
        <ProfileMenu
          style={{ backgroundColor: 'rgb(240,240,240)', marginBottom: '30px' }}
          options={[
            { title: 'All Posts', link: 'admin/posts' },
            { title: 'All Users ', link: 'admin/users' },
          ]}
          title={'ADMIN OPTIONS'}
        />
      )}
      <Route path={'/profile/comments'} component={() => <CommentsTable />} />
      <Route
        path={'/profile/create'}
        component={props => (
          <NewPostForm
            categories={categories}
            setDatabaseDidChange={setDatabaseDidChange}
            {...props}
          />
        )}
      />
      <Route
        path={'/profile/details'}
        component={props => (
          <UserDetails
            user={user}
            setDatabaseDidChange={setDatabaseDidChange}
            {...props}
          />
        )}
      />
      <Route
        path={'/profile/post/edit'}
        component={props => (
          <EditPostForm
            categories={categories}
            setDatabaseDidChange={setDatabaseDidChange}
            {...props}
          />
        )}
      />
      <Route
        exact
        path={['/profile', '/profile/posts']}
        component={props =>
          loading ? (
            <Loader />
          ) : (
            <PostsTable posts={posts} categories={categories} {...props} />
          )
        }
      />
      <Route
        exact
        path={'/profile/admin/posts'}
        component={props =>
          loading ? (
            <Loader />
          ) : Boolean(user.isAdmin) === true ? (
            <AdminPostsTable posts={posts} categories={categories} {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        exact
        path={'/profile/admin/users'}
        component={props =>
          loading ? (
            <Loader />
          ) : Boolean(user.isAdmin) === true ? (
            <AdminUsersTable {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    </Container>
  );
};

export default ProfileScreen;
