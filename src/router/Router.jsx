import { Routes, Route, Navigate } from "react-router-dom";
//
import { useQuery } from "@tanstack/react-query";
// component
import AdminPage from "src/pages/AdminPage";
import DashboardPage from "src/pages/DashboardPage";
import HomePage from "src/pages/HomePage";
import NotFoundPage from "src/pages/404";
// api
import { getProfile } from "src/services/user";
// loader spinner
import Loader from "src/components/modules/Loader";
import AdvertisingPage from "src/pages/AdvertisingPage";

function Router() {
  const { isLoading, data } = useQuery(["profile"], getProfile);
  if (isLoading) return <Loader />;

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="/dashboard"
        element={data ? <DashboardPage /> : <Navigate to="/" />}
      />
      <Route
        path="/admin"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/*" element={<NotFoundPage />} />
      <Route path="/advertising/:id" element={<AdvertisingPage />} />
    </Routes>
  );
}

export default Router;
