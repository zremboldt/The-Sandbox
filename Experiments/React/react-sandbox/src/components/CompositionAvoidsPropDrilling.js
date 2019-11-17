// Great video by Michael Jackson: https://youtu.be/3XaXKiXtNjw?list=WL

import React from 'react';

function CompositionAvoidsPropDrilling() {
  // Often we would put this in Context or Redux.
  // Let's use Composition to avoid "prop drilling" and Redux.
  const [currentUser, setCurrentUser] = React.useState();

  return (
    <div className="sectionComposition">
      <Header />
      <main>
        {currentUser ? (
          <Dashboard>
            <DashboardNav />
            <DashboardContent>
              <WelcomeMessage user={currentUser} />
            </DashboardContent>
          </Dashboard>
        ) : (
          <LoginScreen onLogin={() => setCurrentUser({ name: 'Zac' })} />
        )}
      </main>
      <Footer />
    </div>
  );
}

const Header = () => (
  <header>
    <h1>Header</h1>
  </header>
);

const Dashboard = ({ children }) => (
  <React.Fragment>
    <h2>The Dashboard</h2>
    {children}
  </React.Fragment>
);

const DashboardNav = () => <h3>Dashboard nav</h3>;

const DashboardContent = ({ children }) => (
  <React.Fragment>
    <h3>Dashboard content</h3>
    {children}
  </React.Fragment>
);

const WelcomeMessage = ({ user }) => <h4>Welcome, {user.name}</h4>;

const LoginScreen = ({ onLogin }) => (
  <React.Fragment>
    <h2>Please login</h2>
    <button onClick={onLogin}>Login</button>
  </React.Fragment>
);

const Footer = () => (
  <footer>
    <h1>Footer</h1>
  </footer>
);

export default CompositionAvoidsPropDrilling;
