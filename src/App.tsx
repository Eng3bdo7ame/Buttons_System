import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './css/style.css';

import Loader from './common/Loader';
import ButtonDashboard from './pages/ButtonControl/ButtonDashboard';
import ButtonArea from './pages/ButtonControl/ButtonPage/ButtonArea';

import DefaultLayout from './layout/DefaultLayout';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route element={<ButtonDashboard />}>
          <Route
            index
            element={
              <>
                <ButtonArea />
              </>
            }
          />
        </Route>
      </Routes>
    </DefaultLayout>
  );
}

export default App;
