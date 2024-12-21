import { Routes, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Layout from "./components/utils/Layout";
import DashboardContent from "./components/dashboard/DashboardContent";
import BusesPage from "./pages/BusesPage";
import AdminRegistrationPage from "./pages/AdminRegistrationPage";
import BusRoutes from "./pages/BusRoutes";
import Companies from "./pages/Companies";
import PaymentPage from "./pages/PaymentPage";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import AddBusFormPage from "./pages/AddBusFormPage";
import DriverMap from "./components/gps/MapView";
import ScannerPage from "./pages/ScannerPage";
import BookingPage from "./pages/BookingPage";
import UserTablePage from "./pages/UserTablePage";
import DriverRegistrationPage from "./pages/DriverRegistrationPage";
import RouteFormPage from "./pages/RouteFormPage";
import NotFoundPage from "./pages/NotFoundPage";
import VehiclesPage from "./pages/VehiclesPages";
import VehiclesFormPage from "./pages/VehiclesFormPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin", "driver"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardContent />}></Route>
          <Route path="/companies" element={<Companies />}></Route>
          <Route path="/buses" element={<BusesPage />}></Route>
          <Route path="/newadmin" element={<AdminRegistrationPage />}></Route>
          <Route
            path="/add-driver"
            element={<DriverRegistrationPage />}
          ></Route>
          <Route path="/regusers" element={<UserTablePage />}></Route>
          <Route path="/routes" element={<BusRoutes />}></Route>
          <Route path="/payments" element={<PaymentPage />}></Route>
          <Route path="/vehicles" element={<VehiclesPage />}></Route>
          <Route path="/add-bus" element={<AddBusFormPage />}></Route>
          <Route path="/edit-bus/:id" element={<AddBusFormPage />}></Route>
          <Route path="/map" element={<DriverMap />}></Route>
          <Route path="/scanner" element={<ScannerPage />}></Route>
          <Route path="/add-vehicle" element={<VehiclesFormPage />}></Route>
          <Route path="/add-vehicle/:id" element={<VehiclesFormPage />}></Route>
          <Route path="/add-route" element={<RouteFormPage />}></Route>
          <Route path="/add-route/:id" element={<RouteFormPage />}></Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/user/bookings/:userId"
            element={<BookingPage />}
          ></Route>
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
