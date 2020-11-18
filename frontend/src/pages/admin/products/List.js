import React, { useEffect } from "react";
import { Card, Table, Button, Popconfirm } from "antd";
import { connect } from "react-redux";
import { loadProduct } from "../../../store/actions/product";
import { delOne } from "../../../services/products";
import "./list.css";

function List(props) {
  //console.log(props);
  const { list, page, total } = props;

  useEffect(() => {
    props.dispatch(
      loadProduct({
        page: 1
      })
    );
  },[]);

  const loadData = () => {
    props.dispatch(
      loadProduct({
        page: page
      })
    );
  };

  // execute when initialize component
  const columns = [
    {
      title: "id",
      key: "id",
      width: 80,
      align: "center",
      render: (txt, record, index) => index + 1
    },
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Price",
      dataIndex: "price"
    },
    {
      title: "Inventory",
      dataIndex: "inventory"
    },
    {
      title: "Operation",
      render: (txt, record, index) => {
        return (
          <div>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                // jump to edit page，id as para
                props.history.push(`/admin/products/edit/${record.id}`);
              }}
            >
              Update
            </Button>
            <Popconfirm
              title="Confirm"
              onCancel={() => console.log("Cancel")}
              onConfirm={() => {
                // wanna cancel??
                // api call
                delOne(record.id).then(res => {
                  loadData();
                });
              }}
            >
              <Button style={{ margin: "0 1rem" }} type="danger" size="small">
                Delete
              </Button>
            </Popconfirm>
              
              <Button style={{ margin: "0 1rem" }} type="primary" size="small"
              onClick={() => {
                // jump to edit page，id as para
                props.history.push(`/admin/products/view/${record.id}`);
              }}>
                View
              </Button>
          </div>
        );
      }
    }
  ];
  return (
    <Card
      title="Product List"
      extra={
        <Button
          type="primary"
          size="small"
          onClick={() => props.history.push("/admin/products/edit")}
        >
          Add
        </Button>
      }
    >
      <Table
        rowKey="id"
        rowClassName={record => (record.onSale ? "" : "bg-red")}
        pagination={{
          total,
          defaultPageSize: 2,
          onChange: p => {
            props.dispatch(loadProduct({ page: p }));
          }
        }}
        columns={columns}
        bordered
        dataSource={list}
      />
    </Card>
  );
}

export default connect(state => state.product)(List);
