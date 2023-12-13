import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import { createUser } from './services/userAPI';
import Loading from './components/Loading';
import { AlbumType } from './types';
import searchAlbumsAPI from './services/searchAlbumsAPI';

function App() {
  const [filling, setFilling] = useState<boolean>(false);
  const navigate = useNavigate();
  const [record, setRecord] = useState<AlbumType[] | null>(null);

  const signIn = async (userName: string) => {
    setFilling(true);
    await createUser({ name: userName });
    setFilling(false);
    navigate('/search');
  };

  const hunt = async (artist: string) => {
    setFilling(true);
    const albumsData = await searchAlbumsAPI(artist);
    setFilling(false);
    setRecord(albumsData);
  };

  return (
    <Routes>
      <Route path="/" element={ filling ? <Loading /> : <Login signIn={ signIn } /> } />

      <Route path="/" element={ <Layout /> }>
        <Route
          path="/search"
          element={ <Search hunt={ hunt } records={ record } charging={ filling } /> }
        />
        <Route path="/album/:id" element={ <Album /> } />
      </Route>
    </Routes>
  );
}

export default App;
