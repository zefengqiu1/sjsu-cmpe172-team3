import React, { useState, useEffect } from "react";
import { Form, Card, Input, Button, message, } from "antd";
import { getUserById, modifyUser } from "../../../services/auth";
import Password from "antd/lib/input/Password";

function EditUser(props) {
  // console.log(props);
  // props.match.params.id exist update,otherwise add

  const { getFieldDecorator } = props.form;
  const [currentData, setCurrentData] = useState({});
 
  // execute when initialize
  useEffect(() => {
    if (props.match.params.id) {
      getUserById(props.match.params.id).then(res => {
        setCurrentData(res);
      })
  };
    }
  ,[props.match.params.id]);

  const handleSubmit = e => {
    e.preventDefault();

    //  validate
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log(values);
        //  api call
        if (props.match.params.id) {
          modifyUser(props.match.params.id, {
            ...values,
          })
          .then(res => {
            if (res.code === "202") {
              message.success(res.message);
              //console.log(res.token)
              props.history.push("/admin/management");
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
      } else {
        message.error("Error");
      }
    });
  };
  return (
    <Card
      title="User Edit"
      extra={
        <Button onClick={() => props.history.push("/admin/management")}>
          Back
        </Button>
      }
    >
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Item label="Username">
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "Please fill in user name"
              }
            ],
            initialValue: currentData.username
          })(<Input placeholder="Please fill in user name" />)}
        </Form.Item>
        <Form.Item label="Password">
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please fill in password"
              }
            ],
            initialValue: currentData.password
          })(<Input placeholder="Please fill in password" />)}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Form.create({ name: "userEdit" })(EditUser);
