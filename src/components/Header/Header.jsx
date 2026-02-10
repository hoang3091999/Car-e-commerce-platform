import { Link, useSearchParams } from "react-router-dom";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import icon from "../../assets/icon.png";
import user_icon from "../../assets/user_icon.png";
import globe_icon from "../../assets/globe_icon.png";
import "./header.css";
import { use, useEffect, useState } from "react";

const getFirstName = (fullName) => {
  if (!fullName) return "";
  return fullName.trim().split(" ").pop();
  
}
const items = [
  {
    key: "1",
    label: <Link to="/CarReview">Car Review</Link>,
  },
  {
    key: "2",
    label: <Link to="/News">News</Link>,
  },
];

const lang = [
  {
    key: "1",
    label: "VI",
  },
  {
    key: "2",
    label: "EN",
  },
];
const Header = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("users");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <div className="out-side-nav-bar">
      <div className="nav-bar">
        <div className="logobox">
          <Link to="/">
            <img className="logo" src={icon} alt="logo" />
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/Newcar">New Cars</Link>
          <Link to="/UsedCars">Used Cars</Link>
          <Link to="/Compare">Compare</Link>
          <Link to="/Sell">Sell</Link>
          <Dropdown menu={{ items }} placement="bottom">
            <span className="nav-dropdown">
              <Link to="/Article">Article</Link>
              <DownOutlined />
            </span>
          </Dropdown>
        </div>

        <div className="profileBox">
          <div className="profile">
            <img src={user_icon} alt="user" />
            {user ? (
              <>
                <div className="nav-user">{getFirstName(user.name)}</div>
                <span className="Log-out" onClick={() => {
                  localStorage.removeItem("users");
                  setUser(null);
                }}>Log out</span>
              </>
            ) : (
              <Link to="/Login" className="nav-login">
                Sign In
              </Link>
            )}
          </div>
          <div className="language">
            <img src={globe_icon} alt="lang" />
            <Dropdown menu={{ items: lang }} placement="bottom">
              <span className="nav-dropdown">
                Language <DownOutlined />
              </span>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
