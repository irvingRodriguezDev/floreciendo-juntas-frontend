import { Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const LiveInfoCard = ({ title, html }) => {
  return (
    <>
      <div>
        <Accordion sx={{ bgcolor: "#FFF4FA" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#E53888" }} />}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            <Typography
              variant='subtitle1'
              fontWeight={600}
              textTransform='uppercase'
              color='#E53888'
            >
              {title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                color: "#4a3a50",
                lineHeight: 1.7,
                "& p": { mb: 1.5 },
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default LiveInfoCard;
