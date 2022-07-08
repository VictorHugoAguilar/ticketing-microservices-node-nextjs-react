const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>You are signed in </h1> : <h1>Your not signed in</h1>
};

LandingPage.getInitialProps = async (context) => {
  return {};
};

export default LandingPage;