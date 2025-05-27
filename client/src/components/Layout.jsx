// components/Layout.js
import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar /> {/* This will be visible on all pages */}
      <div style={{ padding: '1rem' }}>
        <Outlet /> {/* Renders the content of the matched route */}
      </div>
    </>
  );
};

export default Layout;