import { Routes, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Layout from "./components/utils/Layout";
import DashboardContent from "./components/dashboard/DashboardContent";
import CompaniesPage from "./pages/CompaniesPage";
import BusesPage from "./pages/BusesPage";
import AdminRegistrationPage from "./pages/AdminRegistrationPage";
import UserTable from "./pages/RegUserTable";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardContent />}></Route>
          <Route path="/companies" element={<CompaniesPage />}></Route>
          <Route path="/buses" element={<BusesPage/>}></Route>
          <Route path="/newadmin" element={<AdminRegistrationPage/>}></Route>
          <Route path="/regusers" element={<UserTable/>}></Route>

        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
