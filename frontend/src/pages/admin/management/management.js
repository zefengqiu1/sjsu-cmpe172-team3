import React, { useEffect } from "react";
import { Card, Table, Button, Popconfirm } from "antd";
import { connect } from "react-redux";
import { loadUsers } from "../../../store/actions/users";
import { delUser } from "../../../services/auth";

function Management(props) {
  //console.log(props);
  const { total, page, list } = props;

  useEffect(() => {
    props.dispatch(
      loadUsers({
        page: 1
      })
    );
  },[]);
  const loadData = () => {
    props.dispatch(
      loadUsers({
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
      title: "Username",
      dataIndex: "username"
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
                props.history.push(`/admin/users/edit/${record.id}`);
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
                delUser(record.id).then(res => {
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
                props.history.push(`/admin/users/view/${record.id}`);
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
      title="Authorization List"
    >
      <Table
        rowKey="id"
        pagination={{
          total,
          defaultPageSize: 5,
          onChange: p => {
            props.dispatch(loadUsers({ page: p }));
          }
        }}
        columns={columns}
        bordered
        dataSource={list}
      />
    </Card>
  );
}

export default connect(state => state.user)(Management);
