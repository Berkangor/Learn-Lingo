import { lazy, Suspense} from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.jsx";
import Loader from './Loader/Loader';



const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const TeachersPage = lazy(() =>
  import("../pages/TeachersPage/TeachersPage.jsx")
);
const FavoritesPage = lazy(() =>
  import("../pages/FavoritesPage/FavoritesPage.jsx")
);

function App() {
 
 return (
    <div>
      <Routes>
        <Route 
          path="/" 
          element={
            <Suspense fallback={<Loader />}>
              <HomePage />
            </Suspense>
          } 
        />

        <Route 
          path="/teachers" 
          element={
            <Suspense fallback={null}>
              <TeachersPage />
            </Suspense>
          } 
        />

        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Suspense fallback={null}>
                <FavoritesPage />
              </Suspense>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;