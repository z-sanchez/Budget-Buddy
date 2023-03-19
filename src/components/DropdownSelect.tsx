import {
  Autocomplete,
  createTheme,
  TextField,
  ThemeProvider,
} from "@mui/material";
const DropdownSelect = ({
  value,
  options,
  placeholder,
  onChange,
}: {
  value: string;
  options: { label: string }[];
  placeholder: string;
  onChange: (value: string) => void;
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

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        disablePortal
        options={options}
        onChange={(_, value) => onChange(value?.label || "")}
        sx={{
          width: 1 / 1,
        }}
        value={{ label: value }}
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} />
        )}
      />
    </ThemeProvider>
  );
};

export { DropdownSelect };
