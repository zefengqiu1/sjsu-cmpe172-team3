import React from "react";
import { Form, Icon, Input, Button, Card, message, Row, Col, Statistic  } from "antd";
import { setToken } from "../../../utils/auth";
import { registerApi } from "../../../services/auth";
import "../../login.css";

function Register(props) {

  const { getFieldDecorator } = props.form;
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        // setToken(values.username);
        // props.history.push("/admin");
        if(values.confirmPassword == values.password)
        {
          registerApi({
            username: values.username,
            password: values.password
          })
            .then(res => {
              if (res.code === "201") {
                message.success(res.message);
                //console.log(res.token)
                setToken(res.token);
                props.history.push("/admin/");
              } else {
                message.info(res.message);
              }
              // console.log(res);
            })
            .catch(err => {
              // console.log(err);
              message.error("Failed to register");
            });
        }
        else{
          message.error("Passwords are not the same!");
        }
      }
    });
  };

  // const validation = (rule, value, callback) => {
  //   if (!value || getFieldDecorator('password').password === value) {
  //     return callback();
  //   } else {
  //     return callback("Passwords do not match!");
  //   }
  // };

  return (
    <div>
      <Card title="Registration" bordered={false}>
      <Row gutter={8}>
          <Col span={8}>
          <Card title="Register new user" className="register-form">
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "please fill in username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="username"
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
              placeholder="password"
            />
          )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator("confirmPassword", {
              rules: [
                { 
                  required: true, 
                  message: "confirm password!"
                },
            ]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="password"
              />
            )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="register-button"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
          </Col>
        </Row>
      </Card>
      
    </div>
  );
}

export default Form.create({ name: "registerForm" })(Register);
