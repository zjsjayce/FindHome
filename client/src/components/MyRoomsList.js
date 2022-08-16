import React, { useEffect, useState } from "react";
import MyRoom from "./MyRoom";
import { useAuth0 } from "@auth0/auth0-react";
import { Layout, Row, Col, Empty, Skeleton, Pagination } from "antd";

export default function MyRoomsList() {
  const { user } = useAuth0();
  const id = user.sub.split("|")[1];
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { Content } = Layout;
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function fetchRooms() {
      const data = await fetch(
        `https://findhomeservice.herokuapp.com/home/landlord/${id}`
      );
      const jsonData = await data.json();
      console.log("use effect", jsonData);
      setRooms(jsonData);
      setIsLoading(false);
    }
    fetchRooms();
    return () => {
      setRooms([]);
    };
  }, []);

  const deleteRoom = async (id) => {
    console.log("delete", id);
    await fetch(`https://findhomeservice.herokuapp.com/home/${id}`, {
      method: "DELETE",
    });
    setRooms(rooms.filter((room) => room._id !== id));
    console.log(rooms);
  };

  return (
    <>
      <Content className="roomGrid">
        {isLoading ? (
          <Skeleton active />
        ) : rooms.length > 0 ? (
          <>
            <Row justify="space-around" gutter={[16, 16]}>
              {rooms
                .slice(pageSize * (page - 1), pageSize * page)
                .map((item) => (
                  <Col key={item._id}>
                    <MyRoom room={item} deleteRoom={deleteRoom} />
                  </Col>
                ))}
            </Row>
            <br />
            <Row justify="space-around">
              <Pagination
                defaultCurrent={page}
                pageSize={pageSize}
                total={rooms.length}
                onChange={(page) => {
                  setPage(page);
                  console.log(page);
                }}
              />
            </Row>
          </>
        ) : (
          <Empty />
        )}
      </Content>
    </>
  );
}
