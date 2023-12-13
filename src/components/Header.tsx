import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';

function Header() {
  const [client, setClient] = useState<UserType>();
  const [filling, setFilling] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setClient(await getUser());
      setFilling(false);
    };

    fetchData();
  }, []);

  return (
    <header data-testid="header-component">
      {filling ? <Loading /> : <p data-testid="header-user-name">{client?.name}</p>}
      <Link to="/search" data-testid="link-to-search">
        Pesquisar
      </Link>
      {' '}
      <Link to="/favorites" data-testid="link-to-favorites">
        Favoritas
      </Link>
      {' '}
      <Link to="/profile" data-testid="link-to-profile">
        Perfil
      </Link>
    </header>
  );
}

export default Header;
