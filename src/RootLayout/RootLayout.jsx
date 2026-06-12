import React from 'react';
import Navbar from '../Pages/SharedComponents/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/SharedComponents/Footer';

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <div className='min-h-[calc(100vh-335px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;