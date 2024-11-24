import { useColors } from "./useColors";
import { ColorsType } from "./useColors";

const textFiledStyles = (colors: ColorsType) => {
  return {
    outlinedInput: {
      borderRadius: "8px",
      "& fieldset": {
        borderColor: colors.grey,
      },
      "&:hover fieldset": {
        borderColor: colors.palette.primary.dark,
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.palette.primary.main,
      },

      "& .MuiInput-underline": {
        color: colors.grey,
      },
      "& .MuiInput-underline:before": {
        borderColor: colors.grey,
      },
    },
    filledInput: {
      borderRadius: "8px 8px 0 0",
      "&:before": {
        // Default underline
        borderBottom: `2px solid ${colors.contrast}`,
      },
      "&:hover:before": {
        // Underline on hover
        borderBottom: `2px solid ${colors.contrast}`,
      },
      "&:after": {
        // Underline when focused
        borderBottom: `2px solid ${colors.bg}`,
      },
    },
    outlinedInputContrast: {
      borderRadius: "8px",
      backgroundColor: colors.bg,
      "& fieldset": {
        borderColor: colors.bg,
      },
      "&:hover fieldset": {
        borderColor: colors.palette.primary.dark,
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.palette.primary.main,
      },
    },
    filledInputContrast: {
      borderRadius: "8px 8px 0 0",
      backgroundColor: colors.bg,
      "&:before": {
        // Default underline
        borderBottom: `2px solid ${colors.contrast}`,
      },
      "&:hover:before": {
        // Underline on hover
        borderBottom: `2px solid ${colors.contrast}`,
      },
      "&:after": {
        // Underline when focused
        borderBottom: `2px solid ${colors.bg}`,
      },
    },
  };
};

export const useStyles = () => {
  const colors = useColors();

  const styles = {
    textField: textFiledStyles(colors),
  };

  return styles;
};
