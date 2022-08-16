import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Collapse, Space, Popconfirm, message, Empty, Skeleton } from "antd";
import { DeleteOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function ReceivedApplicationList() {
  const { user } = useAuth0();
  const id = user.sub.split("|")[1];
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { Panel } = Collapse;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchApplications() {
      const data = await fetch(
        `https://findhomeservice.herokuapp.com/application/landlord/${id}`
      );
      const jsonData = await data.json();
      console.log("use effect", jsonData);
      setApplications(jsonData);
      setIsLoading(false);
    }
    fetchApplications();
  }, []);

  const deleteApplication = async (application_id) => {
    console.log("delete", application_id);
    await fetch(
      `https://findhomeservice.herokuapp.com/application/${application_id}`,
      {
        method: "DELETE",
      }
    );
    setApplications(
      applications.filter((application) => application._id !== application_id)
    );
    console.log(applications);
  };

  const genExtra = (application) => (
    <Space>
      <EllipsisOutlined
        onClick={(event) => {
          event.stopPropagation();
          navigate(
            `/profile/myroom/${application.home_id}/received-application`
          );
        }}
      />

      <Popconfirm
        title="Are you sure to delete this application?"
        onConfirm={(event) => {
          deleteApplication(application._id);
          event.stopPropagation();
          message.success("Delete Successfully!");
        }}
        onCancel={(event) => {
          event.stopPropagation();
          message.success("Cancel Delete!");
        }}
        okText="Delete"
        cancelText="Cancel"
        placement="topRight"
      >
        <DeleteOutlined />
      </Popconfirm>
    </Space>
  );

  return (
    <>
      {isLoading ? (
        <Skeleton active />
      ) : applications.length > 0 ? (
        <Collapse>
          {applications.map((application) => (
            <Panel
              header={
                (application.room_title
                  ? application.room_title
                  : application._id) +
                " Applied by " +
                application.applicant.nickname
              }
              key={application._id}
              extra={genExtra(application)}
            >
              <p>Applicant Name: {application.applicant.nickname}</p>
              <p>Applicant Phone: {application.applicant.phone}</p>
              <p>Applicant Email: {application.applicant.email}</p>
              <p>Applicant Occupation: {application.applicant.career}</p>
              <p>Message: {application.message}</p>
            </Panel>
          ))}
        </Collapse>
      ) : (
        <Empty />
      )}
    </>
  );
}
