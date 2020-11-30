import React, { useEffect, useState } from "react";
import { Card, Table, Button } from "antd";
import { getOneById} from "../../../services/orders";


function ViewOrder(props) {
    //console.log(props);

    const [currentData, setCurrentData] = useState({});
 
  // execute when initialize
  useEffect(() => {
    if (props.match.params.id) {
      getOneById(props.match.params.id).then(res => {
        setCurrentData(res.description);
        console.log(res)
      });
    }
  },[props.match.params.id]);
    
    const columns = [
        {
            title: "Description",
            dataIndex: "description"
          }
    ]

    return (
      <Card
        title="Order View"
        extra={
          <Button
            type="primary"
            size="small"
            onClick={() => props.history.push("/admin/orders")}
          >
            Back
          </Button>
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          bordered
          dataSource={[{"description":currentData}] }
        />
      </Card>
    );
  }
export default ViewOrder;
  