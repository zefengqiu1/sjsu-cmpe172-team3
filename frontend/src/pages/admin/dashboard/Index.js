import React from "react";
import { Row, Col, Card, Statistic, Icon } from "antd";
//import { loadProduct } from "../../../store/actions/product";
//{ useEffect }
function Index(props) {
  return (
    <div>
      <Card title="Data Summary" bordered={false}>
        <Row gutter={8}>
          <Col span={8}>
            <Card title="Total Product" color="red">
              <Statistic
                title="Total product"
                value="80"
                prefix={<Icon type="arrow-up" />}
              ></Statistic>
            </Card>
          </Col>
        </Row>
      </Card>
      
    </div>
  );
}

export default Index;
