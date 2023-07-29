import React from "react";
import Footer from "../Footer";
import { ApiUrl } from "../../services/apiRest";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
class AddCustomer extends React.Component {
  sendSubmit(e) {
    e.preventDefault();
  }

  state = {
    form: {
      name: "",
      lastName: "",
      author: "",
      documentType: "",
      documentNumber: "",
      birthday: "",
      cellphone: "",
      address: "",
      username: "",
      password: "",
    },
    error: false,
    errorMsg: "",
  };

  sendData = (e) => {
    e.preventDefault();
    const requestData = {
      email: this.state.form.username,
      customer: {
        password: this.state.form.password,
        rol: "customer",
        name: this.state.form.name,
        lastName: this.state.form.lastName,
        documentType: this.state.form.documentType,
        documentNumber: this.state.form.documentNumber,
        cellphone: this.state.form.cellphone,
        address: this.state.form.address,
        birthday: this.state.form.birthday,
      },
    };

    

    const url = ApiUrl + "dashboard/registerCustomer/register";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message.toLowerCase() === "customer registered successfully") {
          this.setState({
            error: true,
            errorMsg: "customer registered successfully",
            form: {
              name: "",
              lastName: "",
              author: "",
              documentType: "",
              documentNumber: "",
              birthday: "",
              cellphone: "",
              address: "",
              username: "",
              password: "",
            },
          });
        } else {
          this.setState({
            error: true,
            errorMsg: "Error registering employee",
          });
        }
      })
      .catch((error) => {
        this.setState({
          error: true,
          errorMsg: "Error",
        });
      });
  };
  manejarChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  render() {
    const rol = localStorage.getItem("rol");
    return (
      <div>
        <div className="wraper">
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
                      id="dropdown-basic"
                      className="nav-link dropdown-toggle"
                    >
                      <i className="fa-solid fa-users" />
                      <span>Customers</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to="/dashBoardEmployee/CustomerManagement"
                      >
                        Customers list
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        as={Link}
                        to="/dashBoardEmployee/addCustomer"
                      >
                        Add Customer
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="nav-item dropdown">
                  <Dropdown>
                    <Dropdown.Toggle
                      as={Link}
                      variant="secondary"
                      id="dropdown-basic"
                      className="nav-link dropdown-toggle"
                    >
                      <i className="fa-solid fa-book" />
                      <span>Books</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to="/dashBoardEmployee/bookManagement"
                      >
                        Books list
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        as={Link}
                        to="/dashBoardEmployee/createBook"
                      >
                        Add book
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>

                <li className="nav-item dropdown">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="secondary"
                      id="dropdown-basic"
                      className="nav-link dropdown-toggle"
                    >
                      <i className="fa-solid fa-note-sticky" />
                      <span>Loans</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to="/dashBoardEmployee/loanManagement"
                      >
                        Loans list
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item as={Link} to="/dashBoardEmployee/addLoan">
                        Add loan
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
                      id="dropdown-basic"
                      className="nav-link dropdown-toggle"
                    >
                      <i className="fa-solid fa-note-sticky" />
                      <span>Logout</span>
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
            ></nav>
            <div className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Add Customer</h4>
                      </div>
                      <div className="card-body">
                        <form onSubmit={this.sendSubmit}>
                          <div className="row">
                            <div className="col-md-4 pr-1">
                              <div className="form-group">
                                <label>First Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="First Name"
                                  name="name"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>

                            <div className="col-md-4 pl-1">
                              <div className="form-group">
                                <label>Last Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Last Name"
                                  name="lastName"
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>

                            <div className="col-md-4 pl-1">
                              <div className="form-group">
                                <label>Document Type</label>
                                <select
                                  className="form-select form-control"
                                  name="documentType"
                                  required="required"
                                  onChange={this.manejarChange}
                                >
                                  <option value="">---Seleccione---</option>
                                  <option value="Citizenship card">
                                    Citizenship card
                                  </option>
                                  <option value="Foreigner ID">
                                    Foreigner ID
                                  </option>
                                  <option value="NIT">NIT</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 pr-1">
                              <div className="form-group">
                                <label>Document Number</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Document Number"
                                  name="documentNumber"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 pl-1">
                              <div className="form-group">
                                <label>Birthday</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="birthday"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 pr-1">
                              <div className="form-group">
                                <label>Cellphone</label>
                                <input
                                  ype="number"
                                  className="form-control"
                                  name="cellphone"
                                  placeholder="Cellphone"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 pl-1">
                              <div className="form-group">
                                <label>Address</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="address"
                                  placeholder="Address"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 pr-1">
                              <div className="form-group">
                                <label>Username</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Username"
                                  name="username"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 pl-1">
                              <div className="form-group">
                                <label>Password</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Password"
                                  name="password"
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-info btn-fill"
                              onClick={this.sendData}
                            >
                              Add
                            </button>
                            <button
                              type="submit"
                              className="btn btn-danger btn-fill"
                            >
                              Cancel
                            </button>
                          </div>
                          <div className="clearfix"></div>
                        </form>
                        <br></br>
                        {this.state.error === true && (
                          <div className="alert alert-success" role="alert">
                            {this.state.errorMsg}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default AddCustomer;
