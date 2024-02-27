import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import ScrollToTop from './core/scrollToTop';
import MockCharts from './pages/mock/mock';
import ProductionCharts from './pages/production/production';
import Header from './shared/components/header';
import { LightTheme } from './core/light-theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <React.Suspense fallback={<CircularProgress />}>
        <Router>
          <Header/>
          <ScrollToTop/>
          <Routes>
            <Route path={''} element={<Navigate to='project/t3FNxkFCS' replace/>}/>
            <Route path={'/mock'} element={<MockCharts/>}></Route>
            <Route path={'/project/:id'} element={<ProductionCharts/>}></Route>
          </Routes>
        </Router>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
