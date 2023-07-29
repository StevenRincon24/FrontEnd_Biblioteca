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
    dataCustomer: [],
    dataBooks: [],
    errorMsg: "",
  };

  sendData = (e) => {
    e.preventDefault();
    const requestData = {
      username: this.state.form.customer,
      ISBN: this.state.form.book,
    };
    const url = ApiUrl + "dashboard/registerLoan/register";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Loan register successfully") {
          this.setState({
            error: true,
            errorMsg: "Loan registered successfully",
            form: {
              username: "",
            },
          });
        } else {
          this.setState({
            error: true,
            errorMsg: "Error registering loan",
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

  componentDidMount() {
    this.getBooks();
    this.getCustomers();
  }

  getBooks = () => {
    let url = ApiUrl + "dashBoard/bookManagement";
    axios.get(url).then((response) => {
      this.setState({ dataBooks: response.data.books });
    });
  };

  getCustomers = () => {
    let url = ApiUrl + "dashBoard/customersManagement";
    axios.get(url).then((response) => {
      this.setState({ dataCustomer: response.data.customers });
    });
  };
  render() {
    const { dataCustomer, dataBooks } = this.state;

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
                      as={Link}
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
                        <h4 className="card-title">Add Loan</h4>
                      </div>
                      <div className="card-body">
                        <form onSubmit={this.sendSubmit}>
                          <div className="row">
                            <div className="col-md-6 pr-1">
                              <div className="form-group">
                                <label>Customer Username</label>
                                <select
                                  className="form-select form-control"
                                  id="customer"
                                  name="customer"
                                  required
                                  value={this.state.form.customer}
                                  onChange={this.manejarChange}
                                >
                                  <option value="">Seleccionar cliente</option>
                                  {dataCustomer.map((customer) => (
                                    <option
                                      key={customer.username}
                                      value={customer.username}
                                    >
                                      {customer.username}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="col-md-6 pr-1">
                              <div className="form-group">
                                <label>Book ISBN</label>
                                <select
                                  className="form-select form-control"
                                  id="book"
                                  name="book"
                                  required
                                  value={this.state.form.book}
                                  onChange={this.manejarChange}
                                >
                                  {" "}
                                  <option value="">Seleccionar cliente</option>
                                  {dataBooks.map((book) => (
                                    <option key={book.ISBN} value={book.ISBN}>
                                      {book.ISBN + " " + book.name}
                                    </option>
                                  ))}
                                </select>
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
