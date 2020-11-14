import React from "react";
import { withRouter } from "react-router-dom";
import {Layout,Menu,Icon,Dropdown,Badge} from "antd";
import { connect } from "react-redux";
import logo from "./logo.png";
import { adminRoutes } from "../../routes";
import "./frame.css";
import { clearToken } from "../../utils/auth";
const { Header, Content, Sider } = Layout;

const routes = adminRoutes.filter(route => route.isShow);

function Index(props) {
  console.log(props);
  const popMenu = (
    <Menu
      onClick={p => {
        if (p.key === "logOut") {
          clearToken();
          props.history.push("/login");
        } 
      }}
    >
      <Menu.Item key="logOut">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header
        className="header"
        style={{
          backgroundColor: "#428bca"
        }}
      >
        <div className="logo">
          <img src={logo} alt="logo" width="100px" height="70px" />
        </div>
        <Dropdown overlay={popMenu}>
          <div>
            <Badge >
              <span style={{ color: "#fff" }}>Welcome admin</span>
            </Badge>
            <Icon type="down" />
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[props.location.pathname]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {routes.map(route => {
              return (
                <Menu.Item
                  key={route.path}
                  onClick={p => props.history.push(p.key)}
                >
                  <Icon type={route.icon} />
                  {route.title}
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout style={{ padding: "16px" }}>
          <Content
            style={{
              background: "#fff",
              margin: 0,
              minHeight: 280
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = state => state.notice;

export default connect(mapStateToProps)(withRouter(Index));
