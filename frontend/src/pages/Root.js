import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    };

    if (token === 'EXPIRED') {
      submit(null, { action: '/action', method: 'post' });
      return;
    };

    const tokenduration = getTokenDuration();


    setTimeout(() => {
      submit(null, { action: '/action', method: 'post' });
    }, tokenduration);

  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
