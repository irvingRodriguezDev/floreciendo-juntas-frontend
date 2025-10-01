import React from "react";
import Layout from "../../components/Layout/Layout";
import FullScreenVideo from "../../components/FullScreenVideo";

import NewCourses from "../../components/courses/newCourses/NewCourses";
import TopCourses from "../../components/courses/topCourses/TopCourses";
const Courses = () => {
  return (
    <Layout>
      <FullScreenVideo />
      <div style={{ backgroundColor: "#000" }}>
        <NewCourses />
        <TopCourses />
      </div>
    </Layout>
  );
};

export default Courses;
