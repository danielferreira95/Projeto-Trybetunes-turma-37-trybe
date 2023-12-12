import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import { createUser } from './services/userAPI';
import Fill from './components/Fill';

function App() {
  const [fillling, setFilling] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = async (userName: string) => {
    setFilling(true);
    await createUser({ name: userName });
    setFilling(false);
    navigate('/search');
  };

  return (
    <Routes>
      <Route path="/" element={ fillling ? <Fill /> : <Login login={ login } /> } />
    </Routes>
  );
}

export default App;
