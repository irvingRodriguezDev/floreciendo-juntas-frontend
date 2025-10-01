import React from "react";
import Layout from "../../components/Layout/Layout";
import FullScreenVideo from "../../components/FullScreenVideo";

import NewCourses from "../../components/courses/newCourses/NewCourses";
import TopCourses from "../../components/courses/topCourses/TopCourses";
const Courses = () => {
  return (
    <Layout>
      <FullScreenVideo />
      <NewCourses />
      <TopCourses />
    </Layout>
  );
};

export default Courses;
