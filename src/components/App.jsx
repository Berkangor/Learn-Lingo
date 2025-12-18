import { lazy, Suspense} from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.jsx";


const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const TeachersPage = lazy(() =>
  import("../pages/TeachersPage/TeachersPage.jsx")
);
const FavoritesPage = lazy(() =>
  import("../pages/FavoritesPage/FavoritesPage.jsx")
);

function App() {
 
  return (
    <div >
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;