import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "Pages/Home/Home";
import EventDetail from "Pages/EventDetail/EventDetail";
import Events from "Pages/Admin/Events/Events";
import AdminPage from "Components/AdminPage/AdminPage";
import AdminEventDetail from "Pages/Admin/EventDetail/EventDetail";
import Checkout from "../Pages/Checkout/Checkout";
import { useEffect } from "react";
import { oauth } from "../lib/OAuth";
import { userService } from "../services/user/user.service";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../store/user/user.slice";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Logout from "../Pages/Logout/Logout";
import CreateEventQrcode from "../Pages/Admin/EventDetail/CreateEventQrcode/CreateEventQrcode";

export default function AppRoutes() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const onInit = async () => {
    const isAuthenticated = await oauth.isAuthenticated();

    if (isAuthenticated && !user) {
      const _user = await userService.getOne("me");

      dispatch(setUser(_user));
    }
  };

  useEffect(() => {
    onInit().then();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/cadastro" element={<Register />} />

        <Route path="/" element={<Home />} />
        <Route path="/evento/:eventId" element={<EventDetail />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} scopes={["admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<Events />} />
          <Route path="evento/:eventId" element={<AdminEventDetail />} />
          <Route
            path="evento/:eventId/qrcode"
            element={<CreateEventQrcode />}
          />
        </Route>

        <Route path="/checkout" element={<Checkout />} />

        <Route
          path="/ingressos"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
