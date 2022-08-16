import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Layout,
  Button,
  Form,
  Input,
  Space,
  Descriptions,
  PageHeader,
  Alert,
  Image,
  Row,
  Skeleton,
  Statistic,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";

export default function RoomDetails() {
  const { roomId } = useParams();
  const { user } = useAuth0();
  
  const [room, setRoom] = useState({});
  const { Content } = Layout;
  const id = user ? user.sub.split("|")[1] : null;
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState("");
  const navigate = useNavigate();
  const [showApply, setApply] = useState(false);
  const [applied, setApplied] = useState(false);
  const [applications, setApplications] = useState([]);

  useEffect(async () => {
    async function fetchRoom() {
      const data = await fetch(
        `https://findhomeservice.herokuapp.com/home/${roomId}`
      );
      const jsonData = await data.json();
      console.log("room details", jsonData);
      setLandlord(jsonData.landlord);
      setRoom(jsonData);
    }
    await fetchRoom();
    
    return () => {};
  }, []);

  useEffect(() => {
    function checkApply(applications) {
      
      for (let application of applications) {
        if (application.home_id === roomId) {
          
          setApplied(true);
          // return true;
        }
      }
      // return false;
    }
    checkApply(applications);
  }, [applications.length]);

  useEffect(async () => {
    async function fetchApplications() {
      
      const data = await fetch(
        `https://findhomeservice.herokuapp.com/application/applicant/${id}`
      );
      const jsonData = await data.json();
      console.log("my applications:", jsonData);
      setApplications(jsonData);
    }
    await fetchApplications();
  }, [user]);

  async function createApplication() {
    let userData = await fetch(
      `https://findhomeservice.herokuapp.com/profile/${id}`
    );
    userData = await userData.json();
    const applicantData = {
      // nickname: userData.user.nickname,
      // phone: userData.user.phone,
      // career: userData.user.career,
      sub: userData.auth0.sub,
      // email: userData.auth0.email,
    };
    console.log("use effect", applicantData);
    let landlordData = await fetch(
      `https://findhomeservice.herokuapp.com/profile/${landlord}`
    );
    landlordData = await landlordData.json();
    landlordData = {
      // nickname: landlordData.user.nickname,
      // phone: landlordData.user.phone,
      // career: landlordData.user.career,
      sub: landlordData.auth0.sub,
    };
    console.log("use effect", landlordData);
    const applicationData = {
      landlord: landlordData,
      applicant: applicantData,
      home_id: roomId,
      message: message,
      room_title: room.home.title,
    };
    console.log(applicationData);
    const updateData = await fetch(
      `https://findhomeservice.herokuapp.com/application/create`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(applicationData),
      }
    );
    const res = await updateData.json();
    console.log("new application", res);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      alert("Enter Message");
      return;
    }
    await createApplication();
    setMessage("");
    navigate("/profile/my-application");
  };

  return (
    <>
      {room._id ? (
        <>
          <PageHeader
            className="site-page-header"
            onBack={() => navigate("/rooms")}
            title={room.home.title}
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
            <br />
            {id ? (
              !applied ? (
                showApply ? (
                  <Content className="page-content">
                    <Form
                      name="basic"
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 10,
                      }}
                      initialValues={{
                        remember: true,
                      }}
                      autoComplete="off"
                    >
                      <Form.Item label="Messages" name="messages">
                        <Input.TextArea
                          type="text"
                          onChange={(e) => {
                            setMessage(e.target.value);
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{
                          offset: 8,
                          span: 16,
                        }}
                      >
                        <Space>
                          <Button
                            type="primary"
                            htmlType="submit"
                            onClick={onSubmit}
                          >
                            Submit
                          </Button>
                          <Button
                            type="primary"
                            onClick={() => setApply(!showApply)}
                          >
                            Cancel
                          </Button>
                        </Space>
                      </Form.Item>
                    </Form>
                  </Content>
                ) : (
                  <Alert
                    message="Want to Apply for This Room?"
                    description="Only ONE minute!"
                    type="info"
                    showIcon
                    action={
                      <Button
                        type="primary"
                        onClick={() => setApply(!showApply)}
                      >
                        Apply
                      </Button>
                    }
                  />
                )
              ) : (
                <Alert
                  message="Congratulations!"
                  description="You have already applied for this room successfully!"
                  type="success"
                  showIcon
                />
              )
            ) : (
              <Alert
                message="Want to Apply for This Room?"
                description="Please log in first."
                type="info"
                showIcon
                action={<LoginButton />}
              />
            )}
            <br />
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
