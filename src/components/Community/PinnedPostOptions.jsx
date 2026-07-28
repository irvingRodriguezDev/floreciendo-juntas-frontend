import React from "react";
import {
  Box,
  Grid,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import TimeSelectPinnedPost from "../Selects/TimeSelectPinnedPost";

const themeColors = {
  primary: "#D82E7A",
  borderLight: "rgba(216, 46, 122, 0.12)",
};

const PinnedPostOptions = ({ isPinned, setIsPinned, setTime }) => {
  return (
    <Box
      sx={{
        p: 2,
        mb: 2.5,
        bgcolor: "rgba(216,46,122,0.04)",
        borderRadius: "16px",
        border: `1px solid ${themeColors.borderLight}`,
      }}
    >
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={6}>
          <Typography
            variant='caption'
            fontWeight='800'
            sx={{
              color: themeColors.primary,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              textTransform: "uppercase",
            }}
          >
            <PushPinOutlinedIcon sx={{ fontSize: 16 }} /> ¿Anclar Post?
          </Typography>

          <RadioGroup
            row
            value={isPinned}
            onChange={(e) => setIsPinned(e.target.value)}
          >
            <FormControlLabel
              value='yes'
              control={
                <Radio
                  size='small'
                  sx={{
                    color: themeColors.primary,
                    "&.Mui-checked": { color: themeColors.primary },
                  }}
                />
              }
              label={<Typography variant='body2'>Sí</Typography>}
            />
            <FormControlLabel
              value='no'
              control={
                <Radio
                  size='small'
                  sx={{
                    color: themeColors.primary,
                    "&.Mui-checked": { color: themeColors.primary },
                  }}
                />
              }
              label={<Typography variant='body2'>No</Typography>}
            />
          </RadioGroup>
        </Grid>

        {isPinned === "yes" && (
          <Grid item xs={6}>
            <TimeSelectPinnedPost
              detectarCambiosTimePinned={(val) => setTime(val.value)}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PinnedPostOptions;
