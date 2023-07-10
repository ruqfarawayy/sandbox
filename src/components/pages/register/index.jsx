import { Button, Form, Input } from "antd";

const { useForm } = Form;
const Register = () => {
  const [form] = useForm();

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        sm: {
          span: 6,
        },
      }}
      wrapperCol={{
        sm: {
          span: 18,
        },
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          sm: {
            offset: 6,
            span: 18,
          },
        }}
      >
        <Button
          shape="round"
          size="large"
          style={{
            background: "#001253",
          }}
          type="primary"
          htmlType="submit"
        >
          Daftar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
