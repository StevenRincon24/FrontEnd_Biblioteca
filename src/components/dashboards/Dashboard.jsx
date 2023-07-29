import React from "react";
import Footer from "../Footer";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/light-bootstrap-dashboard.css";
import "../../assets/css/demo.css";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  render() {
    const rol = localStorage.getItem("rol");
    return (
      <div>
        <div className="wrapper">
          <div className="sidebar" data-image="../assets/img/sidebar-5.jpg">
            <div className="sidebar-wrapper">
              <div className="logo">
                <a className="simple-text">
                  <img
                    src="https://leonautas.files.wordpress.com/2019/10/biblioteca-logo.png"
                    style={{ height: "80px" }}
                    alt="Biblioteca Logo"
                  />
                </a>
              </div>
              <ul className="nav">
                <li className="nav-item dropdown">
                  <Dropdown>
                    <Dropdown.Toggle
                      as={Link}
                      variant="secondary"
                      id="dropdown-employees"
                      className="nav-link dropdown-toggle"
                    >
                      <i className="fa-solid fa-users" />
                      <span>Employees </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to="/dashBoard/employeeManagement"
                      >
                        Employees list
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item as={Link} to="/dashBoard/addEmployee">
                        Add employee
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="nav-item dropdown">
                  <Dropdown>
                    <Dropdown.Toggle
                      as={Link}
                      variant="secondary"
                      id="dropdown-books"
                      className="nav-link dropdown-toggle"
                    >
                      <i className="fa-solid fa-book" />
                      <span>Books </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/dashBoard/bookManagement">
                        Books list
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item as={Link} to="/dashBoard/createBook">
                        Add book
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>

                <li className="nav-item dropdown">
                  <Dropdown>
                    <Dropdown.Toggle
                      as={Link}
                      to="/"
                      variant="secondary"
                      id="dropdown-books"
                      className="nav-link dropdown-toggle"
                    >
                      <i className="fa-solid fa-book" />
                      <span>Logout </span>
                    </Dropdown.Toggle>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </div>
          <div className="main-panel">
            <nav
              className="navbar navbar-expand-lg"
              color-on-scroll="500"
              data-image="../assets/img/sidebar-5.jpg"
            >
              <div className="container-fluid">
                <div
                  className="collapse navbar-collapse justify-content-end"
                  id="navigation"
                >
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <a className="dropdown-item" href="#">
                          Update data
                        </a>
                        <div className="divider" />
                        <a className="dropdown-item" href="/">
                          Log out
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className="content"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Dashboard;
