import React, { useEffect, useState } from "react";
import MethodGet from "../../config/Service";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import FormacionDetalleModal from "./FormacionDetalleModal";

const FormationsOnline = () => {
  const [formations, setFormations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formationId, setFormationId] = useState(null);

  const handleOpenModal = (id) => {
    setFormationId(id);
    setModalOpen(true);
  };
  useEffect(() => {
    let url = "/formations/active";
    MethodGet(url)
      .then((res) => {
        setFormations(res.data.data);
      })
      .catch((error) => {
        console.log(
          error,
          "Ocurrio un error al obtener las formaciones online",
        );
      });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={{ color: "#D82F7A", fontWeight: "bold" }} variant='h4'>
          💅🏻 Formaciones Online 📝
        </Typography>
      </Grid>
      <Grid size={12}>
        <Paper
          elevation={0}
          sx={{ padding: 3, borderRadius: 2, bgcolor: "#FFE6EE" }}
        >
          <Grid container spacing={2}>
            {formations &&
              formations.map((f) => (
                <>
                  <Grid
                    size={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 2,
                      borderRadius: 2,
                      bgcolor: "#F7C6D8",
                    }}
                  >
                    <Typography variant='h5' sx={{ color: "#D82F7A" }}>
                      {f.name}
                    </Typography>
                    <Button
                      variant='contained'
                      sx={{
                        bgcolor: "#D82F7A",
                        borderRadius: 2,
                        "&:hover": { bgcolor: "#D82F7A" },
                      }}
                      onClick={() => handleOpenModal(f.id)}
                    >
                      Ver Detalles
                    </Button>
                  </Grid>
                </>
              ))}
          </Grid>
        </Paper>
      </Grid>
      {formationId && (
        <FormacionDetalleModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          id={formationId}
        />
      )}
    </Grid>
  );
};

export default FormationsOnline;
