import { Form, Button, Checkbox, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./login.css";
const LoginPage = () => {
  const [form] = Form.useForm();
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
    } else {
      message.error("mật khẩu hoặc tài khoản chưa đúng hoặc chưa tồn tại");
      form.resetFields();
    }
  };

  return (
    <div className="page">
      <Header />
      <div className="content">
        <Form
          form={form}
          name="Login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
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

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              <Link to={"/SignUp"}>SignUp</Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </div>
  );
};
export default LoginPage;
