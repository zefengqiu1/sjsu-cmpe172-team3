import React from "react";
import { Form, Icon, Input, Button, Card, message } from "antd";
import { setToken } from "../utils/auth";
import { loginApi } from "../services/auth";
import "./login.css";

function Login(props) {
  const { getFieldDecorator } = props.form;
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        loginApi({
          username: values.username,
          password: values.password
        })
          .then(res => {
            if (res.code === "200") {
              message.success(res.message);
              setToken(res.token);
              props.history.push("/admin");
            } else {
              message.info(res.message);
            }
          })
          .catch(err => {
            message.error("user not exist");
          });
      }
    });
  };
  return (
    <Card title="Product admin system" className="login-form">
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "please fill in username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="username:admin"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "please fill in password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="password:admin"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Form.create({ name: "loginForm" })(Login);
