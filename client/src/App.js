import RoomsList from "./components/RoomsList";
import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import RoomDetails from "./components/RoomDetails";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileLayout from "./components/ProfileLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import WelcomePage from "./components/WelcomePage";
import MyRoomDetails from "./components/MyRoomDetails";
import UpdateMyRoom from "./components/UpdateMyRoom";
import { Layout, Menu, Dropdown, Spin, Button } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import ErrorPage from "./components/ErrorPage";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const { Header, Footer } = Layout;
  const navigate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Button
          onClick={() => {
            navigate("/profile");
          }}
        >
          Profile
        </Button>
      </Menu.Item>
      <Menu.Item key="login">
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Spin spinning={isLoading}>
        <Layout className="layout">
          <Header>
            <h1 className="logo">Find Home</h1>
            <div className="loginArea">
              <Dropdown overlay={menu} trigger={["click", "hover"]}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                  href="/profile"
                >
                  <UserOutlined className="profile" /> <DownOutlined />
                </a>
              </Dropdown>
            </div>
          </Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["Home"]}>
            <Menu.Item key="Home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="Room">
              <Link to="/rooms">Room</Link>
            </Menu.Item>
          </Menu>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/rooms" element={<RoomsList />} />
            <Route path="/rooms/:roomId" element={<RoomDetails />} />
            <Route path="*" element={<ErrorPage />} />
            <Route
              path="/profile"
              element={<ProtectedRoute protectedComponent={ProfileLayout} />}
            />
            <Route
              path="/profile/:key"
              element={<ProtectedRoute protectedComponent={ProfileLayout} />}
            />
            <Route
              path="/profile/myroom/:roomId/:key"
              element={<MyRoomDetails />}
            />
            <Route
              path="/profile/myroom/:roomId/update"
              element={<UpdateMyRoom />}
            />
          </Routes>
          <Footer className="footer">
            Find Home ©2022 Created by Chengyu Zhang, Jiesi Zhang, and Bingyan
            Li
          </Footer>
        </Layout>
      </Spin>
    </>
  );
}

export default App;
