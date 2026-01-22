import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CommunityRulesAccordion = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 640,
        mx: "auto",
        my: 4,
        borderRadius: "18px",
      }}
    >
      <Accordion defaultExpanded={false} style={{ borderRadius: "12px" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6' fontWeight='bold' color='#D82E7A'>
            🌸 Bienvenida a la Comunidad Floreciendo Juntas
            <Typography variant='subtitle1' sx={{ color: "gray" }}>
              📌 Haz click aqui para conocer las reglas de la comunidad
            </Typography>
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography sx={{ mb: 2 }}>
            ¡Hola, Wapizima! <br /> Bienvenida a nuestra comunidad, un espacio
            donde cada una de nosotras florece y crece juntas. Aquí, el respeto,
            el apoyo y el aprendizaje son la clave para construir un futuro
            brillante en el mundo de la belleza.
          </Typography>

          <List>
            {rules.map((rule, index) => (
              <ListItem key={index} alignItems='flex-start'>
                <ListItemText
                  primary={
                    <Typography fontWeight='bold' color='#D82E7A'>
                      {index + 1}. {rule.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant='body2'>{rule.description}</Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

const rules = [
  {
    title: "Respeto Mutuo",
    description:
      "Mantén siempre un tono respetuoso y amable. Los comentarios ofensivos, discriminatorios o negativos no serán tolerados.",
  },
  {
    title: "Comentarios Constructivos",
    description:
      "Fomenta la retroalimentación positiva y constructiva. Apoya a tus compañeras con sugerencias que las ayuden a mejorar.",
  },
  {
    title: "Privacidad y Confidencialidad",
    description:
      "No compartas información personal o privada de otras usuarias sin su consentimiento.",
  },
  {
    title: "Contenido Relevante",
    description:
      "Publica únicamente contenido relacionado con las capacitaciones y prácticas del sector de la belleza. Evita temas ajenos.",
  },
  {
    title: "Apoyo y Motivación",
    description:
      "Celebra los logros y avances de las demás. La comunidad crece cuando florecemos juntas.",
  },
  {
    title: "No Spam",
    description:
      "Evita la promoción de productos, servicios o enlaces externos que no estén relacionados con la plataforma.",
  },
  {
    title: "Interacción Positiva",
    description:
      "Reacciona y comenta con empatía. Un comentario positivo puede inspirar y motivar a otras usuarias.",
  },
  {
    title: "Responsabilidad en las Publicaciones",
    description:
      "Asegúrate de que el contenido compartido sea tuyo o tengas permiso para compartirlo. Respeta los derechos de autor.",
  },
  {
    title: "Seguridad y Bienestar",
    description:
      "Si detectas algún comportamiento inapropiado o dañino, repórtalo a los administradores de la comunidad.",
  },
  {
    title: "Crecimiento y Aprendizaje",
    description:
      "Aprovecha cada interacción como una oportunidad para aprender y crecer profesionalmente.",
  },
];

export default CommunityRulesAccordion;
