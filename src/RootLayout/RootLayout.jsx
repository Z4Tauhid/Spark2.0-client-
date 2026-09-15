import React from 'react';
import Navbar from '../Pages/SharedComponents/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/SharedComponents/Footer';
import useAuth from '../hooks/useAuth';

const RootLayout = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const isTraineeDashboard = pathname === '/dashboard' && user?.role === 'trainee';

  return (
    <div>
      {!isTraineeDashboard && <Navbar />}
      <div className={isTraineeDashboard ? '' : 'min-h-[calc(100vh-335px)]'}>
        <Outlet />
      </div>
      {!isTraineeDashboard && <Footer />}
    </div>
  );
};

export default RootLayout;