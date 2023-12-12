import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Hunt from './components/Hunt';
import { createUser } from './services/userAPI';
import Fill from './components/Fill';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import { AlbumType } from './types';
import Collections from './components/Collections';

function App() {
  const [filling, setFilling] = useState<boolean>(false);
  const navigate = useNavigate();
  const [collections, setCollections] = useState<AlbumType[] | null>(null);

  const login = async (userName: string) => {
    setFilling(true);
    await createUser({ name: userName });
    setFilling(false);
    navigate('/search');
  };

  const hunt = async (artist: string) => {
    setFilling(true);
    const collectionsData = await searchAlbumsAPI(artist);
    setFilling(false);
    setCollections(collectionsData);
  };

  return (
    <Routes>
      <Route path="/" element={ filling ? <Fill /> : <Login login={ login } /> } />
      <Route
        path="/search"
        element={ <Hunt search={ hunt } albums={ collections } loading={ false } /> }
      />
      <Route path="/collections/:id" element={ <Collections /> } />
    </Routes>
  );
}

export default App;
