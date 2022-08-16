import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Menu, Drawer, Button, Affix } from "antd";
import {
  EditOutlined,
  UserOutlined,
  SendOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  InboxOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Profile from "./Profile";
import RentOut from "./RentOut";
import MyApplicationList from "./MyApplicationList";
import MyRoomsList from "./MyRoomsList";
import ReceivedApplicationList from "./ReceivedApplicationList";
import UpdateProfile from "./UpdateProfile";

export default function ProfileLayout() {
  const { key } = useParams();
  const { Content, Sider } = Layout;
  const { SubMenu } = Menu;
  const [contentKey, setContentKey] = useState(key ? key : "profile");
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const content = () => {
    switch (contentKey) {
      case "profile":
        return <Profile />;
      case "update-profile":
        return <UpdateProfile />;
      case "my-application":
        return <MyApplicationList />;
      case "my-room":
        return <MyRoomsList />;
      case "received-application":
        return <ReceivedApplicationList />;
      case "rent-out":
        return <RentOut />;
      default:
        return <p>No info</p>;
    }
  };

  const profileMenu = (theme) => {
    return (
      <Menu
        theme={theme}
        mode="inline"
        defaultSelectedKeys={[contentKey]}
        defaultOpenKeys={["profile-menu", "room-menu"]}
      >
        <SubMenu key="profile-menu" icon={<UserOutlined />} title="My Profile">
          <Menu.Item
            key="profile"
            icon={<UserOutlined />}
            onClick={(e) => setContentKey(e.key)}
          >
            My Profile
          </Menu.Item>
          <Menu.Item
            key="update-profile"
            icon={<EditOutlined />}
            onClick={(e) => setContentKey(e.key)}
          >
            Update Profile
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key="my-application"
          icon={<SendOutlined />}
          onClick={(e) => setContentKey(e.key)}
        >
          My Application
        </Menu.Item>
        <SubMenu key="room-menu" icon={<HomeOutlined />} title="My Room">
          <Menu.Item
            key="my-room"
            icon={<HomeOutlined />}
            onClick={(e) => setContentKey(e.key)}
          >
            My Room
          </Menu.Item>
          <Menu.Item
            key="rent-out"
            icon={<PlusCircleOutlined />}
            onClick={(e) => setContentKey(e.key)}
          >
            Rent Out
          </Menu.Item>
          <Menu.Item
            key="received-application"
            icon={<InboxOutlined />}
            onClick={(e) => setContentKey(e.key)}
          >
            Received Application
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  };

  return (
    <Layout>
      <Sider
        data-testid="test-sider"
        breakpoint="lg"
        collapsedWidth="0"
        width="220"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
      >
        <div className="logo" />
        {profileMenu("dark")}
      </Sider>

      <Drawer

        title="Profile"
        placement="left"
        onClose={onClose}
        visible={visible}
        width={280}
      >
        {profileMenu("light")}
      </Drawer>
      <Layout>
        <Affix offsetTop={10} className="drawer-menu-btn">
          <Button type="primary" onClick={showDrawer}>
            <MenuUnfoldOutlined />
          </Button>
        </Affix>
        <Content data-testid="test-content" style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {content()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
