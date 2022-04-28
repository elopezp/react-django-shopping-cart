import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>
          <Link to="/login/">Login</Link>
        </p>
        <p>
          <Link to="/signup">Sign up</Link>
        </p>
        <p>
          <Link to="/cart">Cart</Link>
        </p>
        <p>
          <Link to="/products">Products</Link>
        </p>
        <p>
          <Link to="/orders">Orders</Link>
        </p>
      </div>
    );
}

export default Dashboard;
