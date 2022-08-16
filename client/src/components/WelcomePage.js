import React, { useState } from "react";
import { Layout, Image, Button, Col, Row, Carousel, Typography } from "antd";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";

export default function WelcomePage() {
  const { Content } = Layout;
  const [showDetail1, setDetail1] = useState(false);
  const [showDetail2, setDetail2] = useState(false);
  const [showDetail3, setDetail3] = useState(false);
  const { Title, Paragraph } = Typography;
  // const height = 500;
  // const width = 800;
  return (
    <Layout className="layout">
      <Content className="page-content">
        <div className="site-layout-content">
          {/* <Row justify="space-around" gutter={[16, 16]}> */}
          <Row justify="space-around" align="middle">
            <Col className="gutter-row">
              <Title>
                Find Home
                <br />
                Smarter and Easier
              </Title>
              <Paragraph>
                Experience an easier way to rent or rent out
                <br />
                Easy-to-use features are always free
              </Paragraph>
              <br />
              <Button shape="round">
                <Link to="/rooms">Show Room Listings</Link>
              </Button>
            </Col>
            <Col className="gutter-row" span={16}>
              <Carousel className="welcome-carousel" autoplay vertical>
                <Image
                  src="image/welcomePic1.jpg"
                  alt="rent"
                  // height={height}
                  // width={width}
                  preview={false}
                />
                <Image
                  src="image/welcomePic2.jpg"
                  alt="rent"
                  // height={height}
                  // width={width}
                  preview={false}
                />
                <Image
                  src="image/welcomePic3.jpg"
                  alt="rent"
                  // height={height}
                  // width={width}
                  preview={false}
                />
                <Image
                  src="image/welcomePic4.jpg"
                  alt="rent"
                  // height={height}
                  // width={width}
                  preview={false}
                />
              </Carousel>
            </Col>
          </Row>
        </div>

        <div className="site-layout-content">
          <Row justify="space-around" gutter={[16, 16]}>
            <Col>
              <div>
                <Image
                  src="image/application.jpg"
                  alt="rent"
                  height={200}
                  // width={350}
                  preview={false}
                ></Image>
                <p className="featureTitle">
                  Easy to apply
                  <DownOutlined
                    onClick={() => {
                      setDetail1(!showDetail1);
                    }}
                  />
                </p>
              </div>
              {showDetail1 ? (
                <Paragraph italic>
                  <p>Complete your renter profile once</p>
                  <p>Apply to multiple listings with just a few clicks</p>
                </Paragraph>
              ) : (
                <></>
              )}
            </Col>
            <Col>
              <div>
                <Image
                  src="image/massiveroom.jpg"
                  alt="rent"
                  height={200}
                  // width={350}
                  preview={false}
                ></Image>
                <p className="featureTitle">
                  Numbers of rooms with qulity assurance
                  <DownOutlined
                    onClick={() => {
                      setDetail2(!showDetail2);
                    }}
                  />
                </p>
              </div>
              {showDetail2 ? (
                <Paragraph italic>
                  <p>All room in the listing is verified</p>
                  <p>Safety is always the first priority</p>
                </Paragraph>
              ) : (
                <></>
              )}
            </Col>
            <Col>
              <div>
                <Image
                  src="image/rentout.jpg"
                  alt="rent"
                  height={200}
                  // width={350}
                  preview={false}
                ></Image>
                <p className="featureTitle">
                  Convenient for both rent and rent out
                  <DownOutlined
                    onClick={() => {
                      setDetail3(!showDetail3);
                    }}
                  />
                </p>
              </div>
              {showDetail3 ? (
                <Paragraph italic>
                  <p>Our system is both landlord and renter friendly</p>
                  <p>You can easily manage your rental application,</p>
                  <p> and/or your own room</p>
                </Paragraph>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
