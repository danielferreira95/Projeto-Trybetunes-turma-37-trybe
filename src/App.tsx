import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import { createUser } from './services/userAPI';
import Fill from './components/Fill';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = async (userName: string) => {
    setLoading(true);
    await createUser({ name: userName });
    setLoading(false);
    navigate('/search');
  };

  return (
    <Routes>
      <Route path="/" element={ loading ? <Fill /> : <Login login={ login } /> } />
    </Routes>
  );
}

export default App;
