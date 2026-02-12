import {
  ConfigProvider,
  Form,
  Button,
  Input,
  message,
  Space,
  Select,
} from "antd";
import { useNavigate } from "react-router";
import facebook_icon from "../../assets/facebook_icon.png";
import instagram_icon from "../../assets/instagram_icon.png";
import twitter_icon from "../../assets/youtube_icon.png";
import Icon from "../../assets/icon.png";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./signup.css";
import { DownOutlined } from "@ant-design/icons";
const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const username = values.username.trim().toLowerCase();
    const phoneNum = `${values.countryCode}${values.phone}`.replace(/\s/g, "");

    const res = await fetch(
      "https://mindx-mockup-server.vercel.app/api/resources/users?apiKey=69513732fdb0c381f6e2b976",
    );
    const data = await res.json();
    const users = Array.isArray(data.data)
      ? data.data
      : Array.isArray(data.data?.data)
        ? data.data.data
        : [];

    const isEmailExist = users.some(
      (u) => u.username?.toLowerCase() === username,
    );

    if (isEmailExist) {
      message.error("Email đã tồn tại");
      form.resetFields(["username"]);
      return;
    }

    const isPhoneExist = users.some((u) => {
      const savedPhone = `${u.countryCode}${u.phone}`.replace(/\s/g, "");
      return savedPhone === phoneNum;
    });

    if (isPhoneExist) {
      message.error("Số điện thoại đã tồn tại");
      form.resetFields(["countryCode", "phone"]);
      return;
    }

    await fetch(
      "https://mindx-mockup-server.vercel.app/api/resources/users?apiKey=69513732fdb0c381f6e2b976",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          username,
        }),
      },
    );
    setTimeout(() => {
      message.success("Đăng ký thành công");
      form.resetFields();
      navigate("/Login");
    }, 2000);
  };

  return (
    <>
      <Header />
      <div className="auth-page">
        <div className="auth-wrapper">
          <div className="auth-left">
            <ConfigProvider
              theme={{
                token: {
                  colorIcon: "#ffffff",
                },
                components: {
                  Select: {
                    colorBgContainer: "#0f2a3d",
                    colorText: "#1677ff",
                    colorTextPlaceholder: "#fff",
                  },
                },
              }}
            >
              <Form
                form={form}
                name="SignUp"
                onFinish={onFinish}
                layout="vertical"
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your name",
                    },
                  ]}
                >
                  <Input placeholder="Full name" />
                </Form.Item>
                <Form.Item
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
                  <Input placeholder="name@gmail.com" />
                </Form.Item>
                <Form.Item label="Phone number">
                  <Space.Compact style={{ width: "100%" }}>
                    <Form.Item
                      name="countryCode"
                      noStyle
                      rules={[{ required: true, message: "Select code" }]}
                    >
                      <Select
                        suffixIcon={<DownOutlined style={{ color: "#fff" }} />}
                        className="phone-select"
                        style={{ width: "35%" }}
                        dropdownStyle={{ backgroundColor: "#0f2a3a" }}
                        options={[
                          { label: "🇻🇳 +84", value: "+84" },
                          { label: "🇺🇸 +1", value: "+1" },
                          { label: "cn +86", value: "+86" },
                          { label: "kr +82", value: "+82" },
                          { label: "jb +81", value: "+81" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="phone"
                      noStyle
                      rules={[
                        { required: true, message: "Enter phone number" },
                        {
                          pattern: /^[0-9]{9,10}$/,
                          message: "Invalid phone number",
                        },
                      ]}
                    >
                      <Input className="dark-input" placeholder="000-000-000" />
                    </Form.Item>
                  </Space.Compact>
                </Form.Item>
                <Form.Item
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
                  <Input.Password placeholder="password" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Create My Account
                  </Button>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </div>
          <div className="auth-right">
            <div className="brand-box">
              <img src={Icon} className="img-icon" alt="" />
              <h2>Register</h2>
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

export default SignUp;
