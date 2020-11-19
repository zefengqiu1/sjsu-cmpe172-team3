import React, { useState, useEffect } from "react";
import { Form, Card, Input, Button, message, } from "antd";
import { createApi, getOneById, modifyOne } from "../../../services/orders";

function EditOrder(props) {
  // console.log(props);
  // props.match.params.id exist update,otherwise add

  const { getFieldDecorator } = props.form;
  const [currentData, setCurrentData] = useState({});
 
  // execute when initialize
  useEffect(() => {
    if (props.match.params.id) {
      getOneById(props.match.params.id).then(res => {
        setCurrentData(res);
      });
    }
  },[props.match.params.id]);


  const priceValidate = (rule, value, callback) => {
    if (value * 1 > 100) {
      callback("need less than 100");
    } else {
      callback();
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    //  validate
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log(values);
        //  api call
        if (props.match.params.id) {
          modifyOne(props.match.params.id, {
            ...values,
          })
            .then(res => {
              // console.log(res);
              props.history.push("/admin/orders");
            })
            .catch(err => {
              // console.log(err);
            });
        } else {
          createApi({
            ...values,
          })
            .then(res => {
              // console.log(res);
              props.history.push("/admin/orders");
            })
            .catch(err => {
              // console.log(err);
            });
        }
      } else {
        message.error("Error");
      }
    });
  };
  return (
    <Card
      title="Order Edit"
      extra={
        <Button onClick={() => props.history.push("/admin/orders")}>
          Back
        </Button>
      }
    >
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please fill in order name"
              }
            ],
            initialValue: currentData.name
          })(<Input placeholder="Please fill in order name" />)}
        </Form.Item>
        <Form.Item label="Supplier">
          {getFieldDecorator("Supplier", {
            rules: [
              {
                required: true,
                message: "Please fill in supplier"
              },
              {
                validator: priceValidate
              }
            ],
            initialValue: currentData.price
          })(<Input placeholder="Please fill in product supplier" />)}
        </Form.Item>
        <Form.Item label="Count">
          {getFieldDecorator("count", {
            rules: [
              {
                required: true,
                message: "Please fill in count of product being ordered"
              },
            ],
            initialValue: currentData.inventory
          })(<Input placeholder="Please fill in order count" />)}
        </Form.Item>
        <Form.Item name={['user', 'introduction']} label="Description">
        {getFieldDecorator("description", {
            initialValue: currentData.description
          })(<Input.TextArea />)}
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

export default Form.create({ name: "editOrder" })(EditOrder);