import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { Form, Input, Button } from "antd";

export default function UpdateProfile() {
  const { user } = useAuth0();
  const id = user.sub.split("|")[1];
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const fetchProfile = useDebouncedCallback(async () => {
    const data = await fetch(
      `https://findhomeservice.herokuapp.com/profile/${id}`
    );
    const jsonData = await data.json();
    console.log("use effect", jsonData);
    setName(jsonData.user.nickname);
    setOccupation(jsonData.user.career);
    setPhone(jsonData.user.phone);
  }, 100);

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (profile) => {
    console.log("update", profile);
    const updateData = await fetch(
      `https://findhomeservice.herokuapp.com/profile/${id}/update`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(profile),
      }
    );
    const newProfile = await updateData.json();
    console.log("new profile", newProfile);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({ nickname: name, career: occupation, phone: phone });
    setName("");
    setOccupation("");
    setPhone("");
    navigate("/profile");
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };

  return (
    <Form {...layout} form={form} layout="horizontal">
      <Form.Item label="Name" required tooltip="Your name">
        <Input
          data-testid="test-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item label="Occupation" tooltip="Your occupation">
        <Input
          data-testid="test-occupation"
          value={occupation}
          onChange={(e) => {
            setOccupation(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item label="Phone" tooltip="Your Phone Number">
        <Input
          data-testid="test-phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
