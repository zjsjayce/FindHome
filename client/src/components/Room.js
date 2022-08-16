import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Carousel } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

export default function Room({ room }) {
  const { Meta } = Card;
  const card_ratio = 0.75;
  const width = 100;
  const height = 400 * card_ratio;
  const navigate = useNavigate();

  return (
    <>
      <Card
        data-testid="test-card"
        style={{ width: 300 * card_ratio }}
        cover={
          room.home.pictures && room.home.pictures.length > 0 ? (
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
              src="image/errorPic.jpg"
              width={width}
              height={height}
            ></img>
          )
        }
        // actions={[
        //   <EllipsisOutlined
        //     onClick={() => {
        //       navigate(`/rooms/${room._id}`);
        //     }}
        //   />,
        // ]}
        hoverable
        extra={
          <EllipsisOutlined
            onClick={() => {
              navigate(`/rooms/${room._id}`);
            }}
          />
        }
      >
        <Meta
          onClick={() => {
            navigate(`/rooms/${room._id}`);
          }}
          title={room.home.title}
          description={<p>CAD {room.home.price}</p>}
        />
      </Card>
    </>
  );
}
