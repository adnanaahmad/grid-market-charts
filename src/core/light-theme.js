import { createTheme } from '@mui/material/styles';

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00A4FF',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#2C546A',
    },
  },
});