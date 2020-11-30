import React, { useState, useEffect } from "react";
import { Row, Col, Card, Statistic, Icon } from "antd";
import { loadProduct } from "../../../store/actions/product";
import { connect } from "react-redux";
//import { loadProduct } from "../../../store/actions/product";
//{ useEffect }
function Index(props) {
  const { total, page, list } = props;

  useEffect(() => {
    props.dispatch(
      loadProduct({
        page: 1
      })
    );
  },[]);

  return (
    <div>
      <Card title="Data Summary" bordered={false}>
        <Row gutter={8}>
          <Col span={8}>
            <Card title="Total Product" color="red">
              <Statistic
                title="Total product"
                value= {total}
                prefix={<Icon type="arrow-up" />}
              ></Statistic>
            </Card>
          </Col>
        </Row>
      </Card>
      
    </div>
  );
}

export default connect(state => state.product)(Index);
