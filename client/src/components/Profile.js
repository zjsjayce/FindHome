import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDebouncedCallback } from "use-debounce";
import { Avatar, Descriptions, Space, Skeleton } from "antd";

export default function Profile() {
  const { user } = useAuth0();
  const id = user.sub.split("|")[1];
  const [profile, setProfile] = useState({});

  const fetchProfile = useDebouncedCallback(async () => {
    const data = await fetch(
      `https://findhomeservice.herokuapp.com/profile/${id}`
    );
    let jsonData = await data.json();
    console.log(jsonData);
    if (!jsonData) {
      const profile = {
        auth0: {
          picture: user.picture,
          email: user.email,
          email_verified: user.email_verified,
          sub: id,
        },
        user: { nickname: user.nickname, phone: "", career: "" },
      };
      await fetch("https://findhomeservice.herokuapp.com/profile/create", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(profile),
      });
      jsonData = profile;
      console.log("New user:", jsonData);
    }
    setProfile(jsonData);
  }, 100);

  useEffect(() => {
    fetchProfile();
    return () => {
      setProfile({});
    };
  }, []);

  return (
    <>
      {profile.user ? (
        <Space direction="vertical" size="large" style={{ display: "flex" }}>
          <Avatar size={80} src={profile.auth0.picture} alt="avatar" />
          <Descriptions bordered column={{ md: 2, sm: 1, xs: 1 }}>
            <Descriptions.Item label="Name">
              {profile.user.nickname}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {profile.auth0.email}
            </Descriptions.Item>
            <Descriptions.Item label="Occupation">
              {profile.user.career}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {profile.user.phone}
            </Descriptions.Item>
          </Descriptions>
        </Space>
      ) : (
        <Skeleton avatar paragraph={{ rows: 4 }} active />
      )}
    </>
  );
}
