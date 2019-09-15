import React from 'react';
import { Router } from '@reach/router';
import Layout from '../components/Layout';
import Details from '../components/Details';
import Home from '../components/Home';
import Login from '../components/Login';
import PrivateRoute from '../components/PrivateRoute';
import Status from '../components/Status';

const Support = () => (
  <Layout>
    <Status />
    <h1>different component</h1>
    <Router>
      <PrivateRoute path="/support" component={Home} />
      <PrivateRoute path="/support/details" component={Details} />
      <Login path="support/login" />
    </Router>
  </Layout>
);

export default Support;