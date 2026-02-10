import "./newcar.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Newcar = () => {
  return (
    <>
      <Header />
      <div className="newcar-container">
        <div className="newcar-navtab">
          <h1>New Cars</h1>
          <p>Homepage - New Cars</p>
        </div>
        <div className="newcar-content">
          <div className="left-clomun">
            <p>Filter</p>
            <div className="search-bar">
              <input type="text" placeholder="Search by car model" />              
            </div>
            <div className="Category-year">
            </div>
          </div>
          <div className="right-column"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Newcar;
