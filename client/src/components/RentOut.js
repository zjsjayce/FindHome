import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Input, Button, Radio, InputNumber } from "antd";
// import ImageUpload from "./ImageUpload";

export default function RentOut() {
  const { user } = useAuth0();
  const id = user.sub.split("|")[1];
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState(0);
  const [roomNum, setRoomNum] = useState("");
  const [roomType, setRoomType] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const rentOut = async (home, id) => {
    const data = await fetch(
      "https://findhomeservice.herokuapp.com/home/create",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(home),
      }
    );
    const newHome = await data.json();
    return newHome.insertedId;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title || !address || !details || !price || !roomNum || !roomType) {
      alert("Please enter rent out information");
      return;
    }
    const insertedId = await rentOut({
      home: {
        title: title,
        address: address,
        type: roomType,
        room_num: Number(roomNum),
        price: Number(price),
        details: details,
        pictures: [],
      },
      landlord: id,
    });
    setTitle("");
    setAddress("");
    setDetails("");
    setPrice(0);
    setRoomNum("");
    setRoomType("");
    navigate(`/profile/myroom/${insertedId}/my-room`);
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
  };

  return (
    <>
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
        <Form.Item label="Room Number" required tooltip="The number of rooms">
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
            data-testid="test-type"
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
        {/* <ImageUpload /> */}
        <Form.Item {...tailLayout}>
          <Button type="primary" onClick={onSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
