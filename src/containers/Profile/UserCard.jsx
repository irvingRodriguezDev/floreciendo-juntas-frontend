import React, { useContext } from "react";
import {
  Box,
  Typography,
  Avatar,
  Rating,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AuthContext from "../../context/Auth/AuthContext";
const UserCard = () => {
  const { usuario } = useContext(AuthContext);
  return (
    <Box
      sx={{
        fontFamily: "Poppins, sans-serif",
        // background: "linear-gradient(to bottom, #F8E8F0, #fff)",
        minHeight: "100vh",
        py: 15,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(to right, #FFB8E0, #FFB8E0)",
          borderRadius: 3,
          mx: "auto",
          width: "80%",
          px: 4,
          py: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          color: "white",
          overflow: "hidden",
        }}
      >
        {/* Decorative Flowers (pseudo) */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            backgroundImage:
              'url("https://www.svgrepo.com/show/387636/leaf.svg")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            opacity: 0.2,
            width: 120,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            backgroundImage:
              'url("https://www.svgrepo.com/show/387636/leaf.svg")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            opacity: 0.2,
            width: 120,
            transform: "scaleX(-1)",
          }}
        />

        {/* Left Content */}
        <Box>
          <Typography variant='overline' sx={{ fontSize: 14 }}>
            Mi perfil
          </Typography>
          <Typography variant='h4' sx={{ fontWeight: "bold", mt: 1 }}>
            {usuario.name}
          </Typography>
          <Chip
            label='Floreciendo Juntas'
            sx={{
              mt: 2,
              fontWeight: "bold",
              background: "linear-gradient(to right, #e3b2ff, #d4c0ff)",
              color: "#000",
            }}
          />

          {/* <Stack direction='row' spacing={2} mt={3} alignItems='center'>
            <Box>
              <Typography variant='subtitle1' sx={{ fontWeight: "600" }}>
                John Due
              </Typography>
              <Stack direction='row' spacing={1} alignItems='center'>
                <Rating value={5} readOnly size='small' />
                <Typography variant='caption'>(15 Reviews)</Typography>
              </Stack>
              <Typography variant='caption'>
                📘 20 Courses | 👨‍🎓 40 Students
              </Typography>
            </Box>
          </Stack> */}
        </Box>

        {/* Right Image */}
        <Box>
          <img
            src='https://randomuser.me/api/portraits/men/32.jpg'
            alt='Instructor'
            style={{ borderRadius: "10px", height: "220px" }}
          />
        </Box>
      </Box>

      {/* Biography */}
      <Box
        sx={{
          background: "#fff",
          mx: "auto",
          mt: 4,
          p: 4,
          width: "80%",
          borderRadius: 2,
          boxShadow: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box maxWidth='75%'>
          <Typography variant='h6' fontWeight='bold' mb={1}>
            Biography
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            I'm the Front-End Developer for #Pixcels IT in India, OR. I have
            serious passion for UI effects, animations and creating intuitive,
            dynamic user experiences.
          </Typography>

          {/* Social Icons */}
          <Stack direction='row' spacing={2} mt={2}>
            <FacebookIcon />
            <TwitterIcon />
            <InstagramIcon />
            <LinkedInIcon />
          </Stack>

          {/* Contact */}
          <Stack direction='row' spacing={3} mt={2} alignItems='center'>
            <Stack direction='row' spacing={1} alignItems='center'>
              <LocalPhoneIcon fontSize='small' />
              <Typography variant='body2'>+1-202-555-0174</Typography>
            </Stack>
            <Stack direction='row' spacing={1} alignItems='center'>
              <EmailIcon fontSize='small' />
              <Typography variant='body2'>example@gmail.com</Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Badge */}
        <Chip
          label='Bestseller'
          color='warning'
          icon={<StarIcon />}
          sx={{ fontWeight: "bold", fontSize: 14 }}
        />
      </Box>
    </Box>
  );
};

export default UserCard;
