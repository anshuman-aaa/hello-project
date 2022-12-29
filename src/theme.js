/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import { createTheme } from '@mui/material/styles';

// https://material-ui.com/customization/themes/
// https://material-ui.com/style/color/
export default createTheme({
  palette: {
    primary: {
      main: '#FF7F50',
      // https://stackoverflow.com/a/55534820/9793171
      contrastText: '#ffffff',
    },
  },

  typography: {
    monoFamily: '"Roboto Mono", "Helvetica", "Arial", sans-serif',
  },

  mixins: {
    content: {
      paddingTop: '1.5rem',
      paddingRight: '1rem',
      paddingBottom: '1.5rem',
      paddingLeft: '1rem',
      '@media (min-width: 600px)': {
        paddingTop: '2rem',
        paddingRight: '1.5rem',
        paddingBottom: '2rem',
        paddingLeft: '1.5rem',
      },
      '@media (min-width: 828px)': {
        paddingLeft: 0,
        paddingRight: 0,
        maxWidth: 780,
        margin: '0 auto',
      },
    },
  },
});
