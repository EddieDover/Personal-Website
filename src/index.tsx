import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SimpleReactLightbox from 'simple-react-lightbox';

ReactDOM.render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <SimpleReactLightbox>
              <App/>
            </SimpleReactLightbox>
        </ThemeProvider>
      </React.StrictMode>,
  document.querySelector('#app')
);

