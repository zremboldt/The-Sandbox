// Great video by Michael Jackson: https://youtu.be/3XaXKiXtNjw?list=WL

import React from 'react';

function CompositionAvoidsPropDrilling() {
  // Often devs would put this in Context or Redux.
  // Let's use Composition to avoid "prop drilling" and Redux.
  const [currentUser, setCurrentUser] = React.useState('Zac');

  return (
    <div>
      <Header />
      {currentUser ? <Dashboard /> : <LoginScreen />}
      <Footer />
    </div>
  );
}

const Header = () => (
  <div>
    <h1>Header</h1>
  </div>
);

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
  </div>
);

const LoginScreen = () => (
  <div>
    <h1>LoginScreen</h1>
  </div>
);

const Footer = () => (
  <div>
    <h1>Footer</h1>
  </div>
);

export default CompositionAvoidsPropDrilling;
