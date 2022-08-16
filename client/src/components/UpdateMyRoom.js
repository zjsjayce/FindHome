import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Radio,
  InputNumber,
  PageHeader,
  Layout,
  Skeleton,
  Image,
  Row,
} from "antd";

export default function UpdateMyRoom() {
  const [title, setTitle] = React.useState("");
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState(0);
  const [roomNum, setRoomNum] = useState("");
  const [roomType, setRoomType] = useState("");
  const [pictures, setPictures] = useState([]);
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [form] = Form.useForm();
  const { Content } = Layout;

  useEffect(() => {
    async function fetchRoom() {
      const data = await fetch(
        `https://findhomeservice.herokuapp.com/home/${roomId}`
      );
      const jsonData = await data.json();
      console.log("room details", jsonData);
      setTitle(jsonData.home.title);
      setAddress(jsonData.home.address);
      setDetails(jsonData.home.details);
      setPrice(jsonData.home.price);
      setRoomNum(jsonData.home.room_num);
      setRoomType(jsonData.home.type);
      setPictures([...jsonData.home.pictures]);
    }
    fetchRoom();
    return () => {};
  }, []);

  const updateMyRoom = async (home) => {
    const data = await fetch(
      `https://findhomeservice.herokuapp.com/home/${roomId}/update`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(home),
      }
    );
    const newHome = await data.json();
    console.log(newHome);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title || !address || !details || !price || !roomNum || !roomType) {
      alert("Please enter rent out information");
      return;
    }
    await updateMyRoom({
      title: title,
      address: address,
      type: roomType,
      room_num: Number(roomNum),
      price: Number(price),
      details: details,
      pictures: pictures,
    });
    setTitle("");
    setAddress("");
    setDetails("");
    setPrice(0);
    setRoomNum("");
    setRoomType("");
    navigate(`/profile/myroom/${roomId}/my-room`);
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };

  return (
    <>
      {title ? (
        <>
          <PageHeader
            className="site-page-header"
            onBack={() => navigate(`/profile/myroom/${roomId}/my-room`)}
            title="Edit Your Room"
          />
          <Content className="page-content">
            <Form {...layout} form={form} layout="horizontal">
              <Form.Item label="Title" required tooltip="Your post title">
                <Input.TextArea
                  data-testid="test-title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="Address" required tooltip="Your room address">
                <Input.TextArea
                  data-testid="test-address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="Price" required tooltip="Your room price">
                <InputNumber
                  data-testid="test-price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e);
                    console.log(price);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Room Number"
                required
                tooltip="The number of rooms"
              >
                <InputNumber
                  data-testid="test-roomNum"
                  value={roomNum}
                  onChange={(e) => {
                    setRoomNum(e);
                  }}
                />
              </Form.Item>
              <Form.Item label="Room Type" required tooltip="Your room type">
                <Radio.Group
                  value={roomType}
                  onChange={(e) => {
                    setRoomType(e.target.value);
                  }}
                >
                  <Radio value="condo">Condo</Radio>
                  <Radio value="house">House</Radio>
                  <Radio value="townhouse">TownHouse</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Details" required tooltip="Your room details">
                <Input.TextArea
                  data-testid="test-details"
                  value={details}
                  onChange={(e) => {
                    setDetails(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" onClick={onSubmit}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Content>
          {pictures ? (
            <Image.PreviewGroup>
              <Row justify="space-around" gutter={[16, 16]}>
                {pictures.map((pic) => (
                  <Image width={300} src={pic} key={pic} alt="Room" />
                ))}
              </Row>
            </Image.PreviewGroup>
          ) : (
            <></>
          )}
        </>
      ) : (
        <Skeleton active />
      )}
    </>
  );
}
