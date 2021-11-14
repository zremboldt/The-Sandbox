// Great video by Michael Jackson: https://youtu.be/3XaXKiXtNjw?list=WL

import React from 'react';

function CompositionAvoidsPropDrilling() {
  // Often we would put user state in Context or Redux.
  // Let's use Composition to avoid "prop drilling" and Redux.
  const [currentUser, setCurrentUser] = React.useState();
  const [inputVal, setInputVal] = React.useState();

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
          <LoginScreen
            onInput={e => setInputVal(e.target.value)}
            onLogin={() => {
              if (inputVal) {
                setCurrentUser({ name: inputVal });
              }
            }}
          />
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

const DashboardNav = () => <h3>Dashboard Nav</h3>;

const DashboardContent = ({ children }) => (
  <React.Fragment>
    <h3>Dashboard Content</h3>
    {children}
  </React.Fragment>
);

const WelcomeMessage = ({ user }) => <p>Welcome, {user.name}!</p>;

const LoginScreen = ({ onInput, onLogin }) => (
  <React.Fragment>
    <h2>Please login</h2>
    <input onKeyUp={onInput} type="text" placeholder="Username" autoFocus />
    <button onClick={onLogin}>Login</button>
  </React.Fragment>
);

const Footer = () => (
  <footer>
    <h1>Footer</h1>
  </footer>
);

export default CompositionAvoidsPropDrilling;
