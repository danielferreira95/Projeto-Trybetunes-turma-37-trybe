import React, { ChangeEvent, useEffect, useState } from 'react';

type PropType = {
  login: (b: string) => void
};

function Login(Props: PropType) {
  const { login } = Props;
  const [identification, setIdentification] = useState<string>('');
  const [isUnavailable, setIsUnavailable] = useState<boolean>(true);

  const playSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setIdentification(event.target.value);
  };

  useEffect(() => {
    setIsUnavailable(identification.length < 3);
  }, [identification]);

  return (
    <form>
      <input
        type="text"
        name="name"
        data-testid="login-name-input"
        onChange={ playSwitch }
        value={ identification }
      />
      <button
        data-testid="login-submit-button"
        disabled={ isUnavailable }
        onClick={ () => login(identification) }
      >
        Entrar agora
      </button>
    </form>
  );
}

export default Login;
