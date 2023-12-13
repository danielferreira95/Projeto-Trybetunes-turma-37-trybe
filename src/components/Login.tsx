import React, { ChangeEvent, useEffect, useState } from 'react';

type Kind = {
  signIn: (m: string) => void
};

function Login(Pr: Kind) {
  const { signIn } = Pr;
  const [client, setClient] = useState<string>('');
  const [isToggleOff, setIsToggleOff] = useState<boolean>(true);

  const playSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setClient(event.target.value);
  };

  useEffect(() => {
    setIsToggleOff(client.length < 3);
  }, [client]);

  return (
    <form>
      <input
        type="text"
        name="name"
        data-testid="login-name-input"
        onChange={ playSwitch }
        value={ client }
      />
      <button
        data-testid="login-submit-button"
        disabled={ isToggleOff }
        onClick={ () => signIn(client) }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
