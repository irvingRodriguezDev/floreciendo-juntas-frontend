import React from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  Typography,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchCourse = ({ setSearch }) => {
  return (
    <Box
      sx={{
        // background: "linear-gradient(135deg, #FAD0C4 0%, #FFD1FF 100%)",
        p: 4,
        backgroundColor: "transparent",
        borderRadius: "20px",
        textAlign: "center",
      }}
    >
      <Typography
        variant='h5'
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: "#D82E7A",
          letterSpacing: "0.5px",
        }}
      >
        🌸 Encuentra tu curso ideal
      </Typography>

      <Grid container justifyContent='center'>
        <Grid size={{ xs: 12, sm: 8 }}>
          <TextField
            label=''
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Ej. Curso básico de acrílicos'
            variant='outlined'
            fullWidth
            type='text'
            name='name'
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "& fieldset": {
                  borderColor: "#E53888",
                },
                "&:hover fieldset": {
                  borderColor: "#E53888",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#E53888",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon sx={{ color: "#E53888" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchCourse;
