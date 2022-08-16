import React, { useEffect, useState } from "react";
import Room from "./Room";
import {
  Layout,
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  Row,
  Col,
  Slider,
  // InputNumber,
  Empty,
  Skeleton,
  Pagination,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function RoomsList() {
  const [rooms, setRooms] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [priceSort, setPriceSort] = useState(true);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [roomType, setRoomType] = useState(null);
  const [roomNum, setRoomNum] = useState(null);
  const { Content } = Layout;
  const [form] = Form.useForm();
  const [showSearch, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  async function fetchRooms() {
    let fetchUrl = "https://findhomeservice.herokuapp.com/search";
    const data = await fetch(fetchUrl);
    const jsonData = await data.json();
    console.log("use effect", jsonData);
    setRooms(jsonData);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  async function findRooms() {
    let fetchUrl = "https://findhomeservice.herokuapp.com/search";
    const conditions = [];
    if (keyword) {
      conditions.push(`keywords=${keyword}`);
    }
    if (priceSort) {
      conditions.push(`price_sort=1`);
    } else {
      conditions.push(`price_sort=-1`);
    }
    if (minPrice) {
      conditions.push(`price_min=${minPrice}`);
    }
    if (maxPrice) {
      conditions.push(`price_max=${maxPrice}`);
    }
    if (roomType) {
      conditions.push(`type=${roomType}`);
    }
    if (roomNum) {
      conditions.push(`room_num=${roomNum}`);
    }
    if (conditions.length) {
      fetchUrl += "?" + conditions.join("&");
    }
    console.log(fetchUrl);
    const data = await fetch(fetchUrl);
    const jsonData = await data.json();
    console.log("room search", jsonData);
    setRooms(jsonData);
    setPage(1);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    await findRooms();
  };
  const onReset = async () => {
    form.resetFields();
    setKeyword(null);
    setMinPrice(null);
    setMaxPrice(null);
    setRoomType(null);
    setRoomNum(null);
    setPriceSort(true);
    await fetchRooms();
  };

  return (
    <Layout>
      <Button
        data-testid="test-search"
        onClick={() => setSearch(!showSearch)}
        type="primary"
        icon={<SearchOutlined />}
        size="large"
      >
        Search
      </Button>
      {showSearch && (
        <Content className="page-content">
          <br></br>
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
            form={form}
          >
            <Form.Item label="Keyword" name="keyword">
              <Input
                type="text"
                placeholder="keyword"
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item label="Price" name="price">
              <Slider
                range
                defaultValue={[0, 10000]}
                initialValues={[0, 10000]}
                max={10000}
                min={0}
                step={10}
                value={[
                  typeof minPrice === "number" ? minPrice : 0,
                  typeof maxPrice === "number" ? maxPrice : 10000,
                ]}
                onChange={(e) => {
                  console.log(e);
                  setMinPrice(e[0]);
                  setMaxPrice(e[1]);
                }}
              />
            </Form.Item>

            {/* <Form.Item label="Min Price" name="minprice">
              <InputNumber
                min={0}
                max={maxPrice ? maxPrice : 10000}
                step={10}
                defaultValue={minPrice}
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e);
                }}
              />
            </Form.Item>

            <Form.Item label="Max Price" name="maxprice">
              <InputNumber
                min={maxPrice ? minPrice : 0}
                max={10000}
                step={10}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e);
                }}
              />
            </Form.Item> */}

            <Form.Item label="Home Type" name="hometype">
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

            <Form.Item label="Room Number" name="roomnumber">
              <Input
                type="number"
                min="0"
                max="10"
                onChange={(e) => {
                  setRoomNum(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              name="reversePrice"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox
                onChange={(e) => {
                  setPriceSort(!priceSort);
                }}
              >
                Reverse Price Sort
              </Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" onClick={onSubmit}>
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Content>
      )}
      <Content className="page-content">
        {isLoading ? (
          <Skeleton active />
        ) : rooms.length > 0 ? (
          <>
            <Row justify="space-around" gutter={[16, 16]}>
              {rooms
                .slice(pageSize * (page - 1), pageSize * page)
                .map((item) => (
                  <Col key={item._id}>
                    <Room key={item._id} room={item} />
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
    </Layout>
  );
}
