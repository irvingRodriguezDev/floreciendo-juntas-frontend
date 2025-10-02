import React from "react";
import Layout from "../../components/Layout/Layout";
import FullScreenVideo from "../../components/FullScreenVideo";

import NewCourses from "../../components/courses/newCourses/NewCourses";
import TopCourses from "../../components/courses/topCourses/TopCourses";
const Courses = () => {
  return (
    <Layout>
      <FullScreenVideo />
      <div
      // style={{
      //   background:
      //     "linear-gradient(135deg, #1a0029 0%, #2d0f40 40%, #000000 100%)",
      //   backgroundAttachment: "fixed",
      //   backgroundSize: "cover",
      //   color: "#fff",
      // }}
      >
        <NewCourses />
        <TopCourses />
      </div>
    </Layout>
  );
};

export default Courses;
