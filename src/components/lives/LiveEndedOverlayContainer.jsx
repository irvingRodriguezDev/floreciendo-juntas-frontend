import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import LiveEndedOverlay from "../../components/lives/LiveEndedOverlay";

const LiveEndedOverlayContainer = ({ livePhase, onGoHome }) => {
  const isEnding = livePhase === "ending" || livePhase === "ended";

  return (
    <AnimatePresence>
      {isEnding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
          }}
        >
          <LiveEndedOverlay onGoHome={onGoHome} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveEndedOverlayContainer;
