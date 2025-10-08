import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SystemContext from "../../context/System/SystemContext";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import TopCourses from "../../components/courses/topCourses/TopCourses";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const { systems, getAllSystems } = useContext(SystemContext);
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getAllSystems();
  }, []);

  return (
    <Box
      sx={{ bgcolor: "background.paper", width: "100%", borderRadius: "12px" }}
    >
      <AppBar
        position='static'
        sx={{
          borderRadius: "12px",
          backgroundColor: "white",
          color: "#E893B5",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='secondary'
          textColor='inherit'
          variant='fullWidth'
          aria-label='full width tabs example'
        >
          {systems.map((s, index) => (
            <Tab
              label={s.name}
              sx={{ fontWeight: "bold", fontSize: "40px" }}
              {...a11yProps(index)}
              key={index}
            />
          ))}
        </Tabs>
      </AppBar>
      <TabPanel
        value={value}
        index={0}
        dir={theme.direction}
        sx={{ backgroundColor: "#F7F6FA" }}
      >
        <TopCourses />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        Item Three
      </TabPanel>
    </Box>
  );
}
