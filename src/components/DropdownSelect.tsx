import {
  Autocomplete,
  createTheme,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { type DropdownOption } from "../utils/types";
const DropdownSelect = ({
  value,
  options,
  placeholder,
  onChange,
}: {
  value: DropdownOption;
  options: DropdownOption[];
  placeholder: string;
  onChange: (value: DropdownOption) => void;
}) => {
  const styles = {
    styleOverrides: {
      root: {
        maxHeight: "32px",
      },
      input: {
        maxHeight: "3px",
      },
    },
  };
  const theme = createTheme({
    components: {
      MuiAutocomplete: {
        ...styles,
      },
      MuiInputBase: {
        ...styles,
      },
    },
  });

  const allOptions = [{ label: "Select Option", id: "0" }].concat(
    options.map((option) => {
      return option;
    })
  );

  const selectedOption = value.label === "" ? "Select Option" : value.label;

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        disablePortal
        options={allOptions.map(({ label }) => {
          return label;
        })}
        onChange={(_, value) => {
          const selectedOption = allOptions.find(
            ({ label }) => label === value
          ) || { label: "", id: "0" };
          onChange({
            ...selectedOption,
          });
        }}
        sx={{
          width: 1 / 1,
        }}
        value={selectedOption}
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} />
        )}
      />
    </ThemeProvider>
  );
};

export { DropdownSelect };
