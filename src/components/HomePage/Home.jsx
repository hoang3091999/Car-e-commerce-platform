import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
const HomePage = () => {
  return (
    <>
      <Header />
      <Link to={"/Login"}>login</Link>
      <br />
      <Link to={"/SignUp"}>SignUp</Link>
      <Footer />
    </>
  );
};

export default HomePage;
