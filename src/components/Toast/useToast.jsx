// src/components/Toast/useToast.js
import { useSnackbar } from "notistack";

export const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const show = ({
    title,
    message,
    variant = "info",
    actionLabel,
    onAction,
  }) => {
    enqueueSnackbar(
      <div>
        <strong>{title}</strong>
        <div>{message}</div>
      </div>,
      {
        variant,
        action: actionLabel
          ? () => (
              <button
                onClick={onAction}
                style={{
                  color: "white",
                  fontWeight: 700,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {actionLabel}
              </button>
            )
          : null,
      },
    );
  };

  return { show };
};
