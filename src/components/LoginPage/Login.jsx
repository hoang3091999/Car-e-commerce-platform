import { Form, Button, Checkbox, Input, message } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Icon from "../../assets/icon.png";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import facebook_icon from "../../assets/facebook_icon.png";
import instagram_icon from "../../assets/instagram_icon.png";
import twitter_icon from "../../assets/youtube_icon.png";
import "./login.css";
const LoginPage = () => {
  const [form] = Form.useForm();
  const navigator = useNavigate();
  const onFinish = async (values) => {
    const username = values.username.trim().toLowerCase();
    const password = values.password;
    if (!username || !password) return;

    const response = await fetch(
      "https://mindx-mockup-server.vercel.app/api/resources/users?apiKey=69513732fdb0c381f6e2b976",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    const users = Array.isArray(data.data)
      ? data.data
      : Array.isArray(data.data?.data)
        ? data.data.data
        : [];
    console.log(users);
    const validUser = users.find(
      (u) => u.username === username && u.password === values.password,
    );

    if (validUser) {
      message.success("đăng nhập thành công");
      navigator("/");
      localStorage.setItem("users", JSON.stringify(validUser));
    } else {
      message.error("mật khẩu hoặc tài khoản chưa đúng hoặc chưa tồn tại");
      form.resetFields();
    }
  };

  return (
    <>
      <Header />
      <div className="login-page">
        <div className="login-wrapper">
          <div className="login-left">
            <Form
              form={form}
              className="login-form"
              name="Login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                className="form-item-email"
                label="Email"
                name="username"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter your email correctly!",
                  },
                ]}
              >
                <Input className="inputEmail" placeholder="name@gmail.com" />
              </Form.Item>

              <Form.Item
                className="form-item-password"
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                  {
                    pattern:
                      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
                    message:
                      "Password requires a minimum of 8 characters, including at least one uppercase letter and one special character.",
                  },
                ]}
              >
                <Input.Password className="inputPass" placeholder="password" />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                className="remember-item"
                label={null}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
              <Form.Item className="resister-link">
                <p>
                  Don't have account yet?{" "}
                  <Link to="/SignUp" className="forgot-pass-link">
                    Sign Up here
                  </Link>
                </p>
              </Form.Item>
            </Form>
          </div>
          <div className="login-right">
            <div className="brand-box">
              <img src={Icon} className="icon-img" alt="" />
              <h2>Login</h2>
              <h3>Welcome to Autohunt</h3>
              <div className="icon">
                <img src={facebook_icon} alt="facebook" />
                <img src={instagram_icon} alt="instagram" />
                <img src={twitter_icon} alt="twitter" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
