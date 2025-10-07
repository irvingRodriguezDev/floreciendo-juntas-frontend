import { Grid, TextField } from "@mui/material";
import React from "react";

const SearchCourses = () => {
  return (
    <Grid sx={{ border: "2px solid white", padding: 2 }}>
      <TextField
        label='Buscar curso'
        placeholder='Curso basico de acrilicos'
        variant='outlined'
        fullWidth
        type='text'
        name='name'
      />
    </Grid>
  );
};

export default SearchCourses;
