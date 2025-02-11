import { Link } from "react-router";

const HomePage = () => {
  return (
    <div>
      <h1>I am the homepage</h1>
      <p>
        This will be a landing page with a nav with links to login and signup, and a hero section introducing
        the product
      </p>
      <Link to="/login">Login again</Link>
    </div>
  );
};

export default HomePage;
