import React from 'react';
import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/mern/" element={<Home />} />
          <Route path="/mern/posts/:id" element={<FullPost />} />
          <Route path="/mern/posts/:id/edit" element={<AddPost />} />
          <Route path="/mern/add-post" element={<AddPost />} />
          <Route path="/mern/login" element={<Login />} />
          <Route path="/mern/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
