import "./footer.css";
import icon from "../../assets/icon.png";
import facebook_icon from "../../assets/facebook_icon.png";
import instagram_icon from "../../assets/instagram_icon.png";
import twitter_icon from "../../assets/youtube_icon.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-inner">
        <div className="Logo">
          <img className="Logo_icon" src={icon} alt="logo" />
        </div>
        <div className="info-container">
          <div className="info-items">
            <div className="column">
              <h3>ABOUT US</h3>
              <h3>FAQ</h3>
              <h3>CONTACT</h3>
            </div>
            <div className="column">
              <h3>CUSTOMER SERVICE</h3>
              <h3>info@car.com</h3>
              <h3>240-865-3730</h3>
            </div>
            <div className="column">
              <h3>
                3926 Calvin Street,
                <br />
                Baltimore, Maryland,
                <br />
                21201, United State
              </h3>
              <div className="icon">
                <img src={facebook_icon} alt="facebook" />
                <img src={instagram_icon} alt="instagram" />
                <img src={twitter_icon} alt="twitter" />
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <h3>2021 Autohunt. All Rights reserved</h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
