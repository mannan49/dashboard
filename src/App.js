import { Routes, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Layout from "./components/utils/Layout";
import DashboardContent from "./components/dashboard/DashboardContent";
import BusesPage from "./pages/BusesPage";
import AdminRegistrationPage from "./pages/AdminRegistrationPage";
import UserTable from "./pages/RegUserTable";
import BusRoutes from "./pages/BusRoutes";
import Companies from "./pages/Companies";
import PaymentPage from "./pages/PaymentPage";
import EditBus from "./pages/busCRUD/EditBus";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import AddBusFormPage from "./pages/AddBusFormPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardContent />}></Route>
          <Route path="/companies" element={<Companies />}></Route>
          <Route path="/buses" element={<BusesPage />}></Route>
          <Route path="/newadmin" element={<AdminRegistrationPage />}></Route>
          <Route path="/regusers" element={<UserTable />}></Route>
          <Route path="/routes" element={<BusRoutes />}></Route>
          <Route path="/payments" element={<PaymentPage />}></Route>
          <Route path="/add-bus" element={<AddBusFormPage />}></Route>
          <Route path="/edit-bus/:busId" element={<EditBus />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
