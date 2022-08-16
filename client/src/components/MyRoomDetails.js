import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Descriptions,
  PageHeader,
  Image,
  Row,
  Button,
  Skeleton,
  Statistic,
} from "antd";
import { EditOutlined } from "@ant-design/icons";

export default function MyRoomDetails() {
  const navigate = useNavigate();
  const { key, roomId } = useParams();
  const [room, setRoom] = useState({});
  const { Content } = Layout;

  useEffect(() => {
    async function fetchRoom() {
      const data = await fetch(
        `https://findhomeservice.herokuapp.com/home/${roomId}`
      );
      const jsonData = await data.json();
      console.log("room details", jsonData);
      setRoom(jsonData);
    }
    fetchRoom();
    return () => {};
  }, []);

  function getExtra() {
    console.log(key);
    if (key === "my-room" || key === "received-application") {
      return (
        <Button
          key="edit"
          onClick={() => {
            navigate(`/profile/myroom/${room._id}/update`);
          }}
        >
          <EditOutlined />
        </Button>
      );
    }
  }

  return (
    <>
      {room._id ? (
        <>
          <PageHeader
            className="site-page-header"
            onBack={() => navigate(`/profile/${key}`)}
            title={room.home.title}
            extra={getExtra()}
          >
            <Row>
              <Statistic
                title="Price"
                prefix="CAD$"
                value={room.home.price}
                style={{
                  margin: "0 32px",
                }}
              />
            </Row>
          </PageHeader>
          <Content className="page-content">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Title">
                {room.home.title}
              </Descriptions.Item>
              <Descriptions.Item label="Room Number">
                {room.home.room_num}
              </Descriptions.Item>
              <Descriptions.Item label="Room Type">
                {room.home.type}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {room.home.address}
              </Descriptions.Item>
              <Descriptions.Item label="Details">
                {room.home.details}
              </Descriptions.Item>
            </Descriptions>
            {room.home.pictures ? (
              <Image.PreviewGroup>
                <Row justify="space-around" gutter={[16, 16]}>
                  {room.home.pictures.map((pic) => (
                    <Image width={300} src={pic} key={pic} alt="Room" />
                  ))}
                </Row>
              </Image.PreviewGroup>
            ) : (
              <></>
            )}
          </Content>
        </>
      ) : (
        <Skeleton active />
      )}
    </>
  );
}
