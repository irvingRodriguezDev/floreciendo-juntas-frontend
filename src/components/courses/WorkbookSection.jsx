import { Box, Button, Stack, Typography } from "@mui/material";

const WorkbookSection = ({ workbookUrl }) => {
  return (
    <Box
      sx={{
        mt: 3,
        p: 2.5,
        borderRadius: "20px",
        backgroundColor: "#F9FAFB",
        border: "1px solid #F3F4F6",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Stack
        sx={{
          direction: "row",
          alignItems: "center",
        }}
        spacing={1.5}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "12px",
            backgroundColor: "#FFF5F7",
            color: "#E53888",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
            flexShrink: 0,
          }}
        >
          📖
        </Box>
        <Box>
          <Typography
            variant='subtitle2'
            sx={{ fontWeight: "800", color: "#1F2937", lineHeight: 1.2 }}
          >
            Material didáctico disponible
          </Typography>
          <Typography
            variant='caption'
            sx={{ color: "#6B7280", fontWeight: 500 }}
          >
            Este curso contiene un cuaderno de trabajo complementario en PDF.
          </Typography>
        </Box>
      </Stack>

      <Button
        variant='outlined'
        component='a'
        href={workbookUrl}
        target='_blank'
        rel='noopener noreferrer'
        sx={{
          width: { xs: "100%", sm: "auto" },
          borderColor: "#E53888",
          color: "#E53888",
          fontWeight: "bold",
          fontSize: "0.85rem",
          textTransform: "none",
          borderRadius: "12px",
          px: 3,
          py: 1,
          "&:hover": { borderColor: "#C2185B", backgroundColor: "#FFF5F7" },
        }}
      >
        Descargar Workbook
      </Button>
    </Box>
  );
};

export default WorkbookSection;
