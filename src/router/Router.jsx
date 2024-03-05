import { Routes, Route, Navigate } from "react-router-dom";
//
import { useQuery } from "@tanstack/react-query";
// component
import AdminPage from "src/pages/AdminPage";
import DashboardPage from "src/pages/DashboardPage";
import HomePage from "src/pages/HomePage";
// api
import { getProfile } from "src/services/user";
import NotFoundPage from "src/pages/404";
import Loader from "src/components/modules/Loader";

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
    </Routes>
  );
}

export default Router;
