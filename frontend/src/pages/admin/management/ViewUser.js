import React, { useEffect, useState } from "react";
import { Card, Table, Button } from "antd";
import { getUserById} from "../../../services/auth";


function ViewUser(props) {
    //console.log(props);

    const [currentData, setCurrentData] = useState({});
 
  // execute when initialize
  useEffect(() => {
    if (props.match.params.id) {
      getUserById(props.match.params.id).then(res => {
        setCurrentData(res.password);
        
      });
    }
  },[props.match.params.id]);
    
    const columns = [
        {
            title: "Password",
            dataIndex: "password"
          }
    ]

    return (
      <Card
        title="Password View"
        extra={
          <Button
            type="primary"
            size="small"
            onClick={() => props.history.push("/admin/management")}
          >
            Back
          </Button>
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          bordered
          dataSource={[{"password":currentData}] }
        />
      </Card>
    );
  }
export default ViewUser;
  