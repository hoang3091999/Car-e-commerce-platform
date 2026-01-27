import { Form, Button, Input, message, Space, Select } from "antd";
import { useNavigate } from "react-router";

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
    <Form
      form={form}
      name="SignUp"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
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
              style={{ width: "35%" }}
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
              { pattern: /^[0-9]{9,10}$/, message: "Invalid phone number" },
            ]}
          >
            <Input placeholder="000-000-000" />
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
  );
};

export default SignUp;
