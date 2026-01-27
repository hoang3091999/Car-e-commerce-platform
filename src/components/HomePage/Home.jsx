import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      <Link to={"/Login"}>login</Link>
      <br />
      <Link to={"/SignUp"}>SignUp</Link>
    </>
  );
};

export default HomePage;
