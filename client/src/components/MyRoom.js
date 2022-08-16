import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Carousel, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

export default function MyRoom({ room, deleteRoom }) {
  const navigate = useNavigate();
  const { Meta } = Card;
  const card_ratio = 0.75;
  const width = 100;
  const height = 400 * card_ratio;
  const { confirm } = Modal;
  return (
    <Card
      data-testid="test-card"
      style={{ width: 300 * card_ratio }}
      cover={
        room.home.pictures && room.home.pictures.length > 0 > 0 ? (
          <Carousel autoplay>
            {room.home.pictures.map((picture) => (
              <img
                alt="Room"
                src={picture}
                width={width}
                height={height}
                key={picture}
              />
            ))}
          </Carousel>
        ) : (
          <img
            alt="Error"
            src="\image\errorPic.jpg"
            width={width}
            height={height}
          ></img>
        )
      }
      actions={[
        <EditOutlined
          key="edit"
          onClick={() => {
            navigate(`/profile/myroom/${room._id}/update`);
          }}
        />,
        <DeleteOutlined
          key="delete"
          onClick={() => {
            confirm({
              title: "Do you want to delete this room?",
              icon: <ExclamationCircleOutlined />,
              content: "When clicked the OK button, this room will be delete!",
              onOk() {
                deleteRoom(room._id);
              },
              onCancel() {},
            });
          }}
        />,
        <EllipsisOutlined
          key="ellipsis"
          onClick={() => {
            navigate(`/profile/myroom/${room._id}/my-room`);
          }}
        />,
      ]}
      hoverable
    >
      <Meta title={room.home.title} description={`CAD ${room.home.price}`} />
    </Card>
  );
}
