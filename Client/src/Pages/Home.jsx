import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center mt-5">
      <h2>Welcome to the Food Order App</h2>
      <p>Order your favorite meals in seconds!</p>
      <Link to="/login" className="btn btn-primary m-2">Login</Link>
      <Link to="/signup" className="btn btn-secondary m-2">Signup</Link>
    </div>
  );
};

export default Home;
