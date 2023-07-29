import React from "react";
import "./assets/css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import DashBoard from "./components/dashboards/Dashboard";
import DashboardEmployee from "./components/dashboards/DashboardEmployee";
import DashBoardCustomer from "./components/dashboards/DashboardCustomer";
import Footer from "./components/Footer";
import AddBook from "./components/admin/AddBook";
import ListBook from "./components/admin/listBook";
import AddEmployee from "./components/employee/addEmployee";
import ListEmployee from "./components/employee/listEmployee";
import AddCustomer from "./components/customer/addCustomer";
import ListCustomer from "./components/customer/listCustomer";
import AddLoan from "./components/loans/AddLoan";
import ListLoans from "./components/loans/listLoans";
import LoansCustomer from "./components/loans/loansCustomer";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* Rutas dashboard ADMIN */}
          <Route exact path="/DashBoard" element={<DashBoard />} />
          {/* Rutas dashboard CUSTOMER */}
          <Route
            exact
            path="/DashBoardCustomer"
            element={<DashBoardCustomer />}
          />
          {/* Rutas dashboard EMPLOYEE */}
          <Route
            exact
            path="/DashBoardEmployee"
            element={<DashboardEmployee />}
          />

          {/* Rutas ADMIN */}
          <Route exact path="/dashBoard/createBook" element={<AddBook />} />

          <Route
            exact
            path="/dashBoard/bookManagement"
            element={<ListBook />}
          />
          <Route
            exact
            path="/dashBoard/addEmployee"
            element={<AddEmployee />}
          />
          <Route
            exact
            path="/dashBoard/EmployeeManagement"
            element={<ListEmployee />}
          />

          {/* Rutas dashboard EMPLOYEE */}
          <Route
            exact
            path="/dashBoardEmployee/addCustomer"
            element={<AddCustomer />}
          />

          <Route
            exact
            path="/dashBoardEmployee/CustomerManagement"
            element={<ListCustomer />}
          />

          <Route
            exact
            path="/dashBoardEmployee/createBook"
            element={<AddBook />}
          />

          <Route
            exact
            path="/dashBoardEmployee/bookManagement"
            element={<ListBook />}
          />

          <Route
            exact
            path="/dashBoardEmployee/addLoan"
            element={<AddLoan />}
          />

          <Route
            exact
            path="/dashBoardEmployee/loanManagement"
            element={<ListLoans />}
          />

          <Route
            exact
            path="/dashBoardCustomer/loans"
            element={<LoansCustomer />}
          />

          {/* Rutas dashboard para el CUSTOMER */}

          {/* Rutas dashboard PIE DE PAGINA */}
          <Route exact path="/Footer" element={<Footer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
