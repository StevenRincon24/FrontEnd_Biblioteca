import React from "react";
import axios from "axios";
import Footer from "../Footer";
import { ApiUrl } from "../../services/apiRest";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
class AddBook extends React.Component {
  sendSubmit(e) {
    e.preventDefault();
  }

  state = {
    form: {
      ISBN: "",
      name: "",
      author: "",
      genre: "",
      copies: "",
      publication: "",
      fine: "",
    },
    error: false,
    errorMsg: "Error",
  };
  sendData = () => {
    let url = ApiUrl + "book/createBook";
    axios
      .post(url, this.state.form)
      .then((response) => {
       

        if (
          response.data.message.toLowerCase() === "book registered successfully"
        ) {
          this.setState({
            error: true,
            errorMsg: "Book registered successfully",
            form: {
              ISBN: "",
              name: "",
              author: "",
              genre: "",
              copies: "",
              publication: "",
              fine: "",
            },
          });
        } else {
          
          this.setState({
            error: true,
            errorMsg: "Error registering book",
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
                {rol === "admin" && (
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

                    <Dropdown>
                      <Dropdown.Toggle
                        as={Link}
                        variant="secondary"
                        id="dropdown-employees"
                        className="nav-link dropdown-toggle"
                      >
                        <i className="fa-solid fa-users" />
                        <span>Employees</span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          as={Link}
                          to="/dashBoard/EmployeeManagement"
                        >
                          Employees list
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as={Link} to="/dashBoard/addEmployee">
                          Add employee
                        </Dropdown.Item>
                      </Dropdown.Menu>
                      <Dropdown.Toggle
                        as={Link}
                        to="/"
                        variant="secondary"
                        id="dropdown-employees"
                        className="nav-link dropdown-toggle"
                      >
                        <i className="fa-solid fa-users" />
                        <span>Logout</span>
                      </Dropdown.Toggle>
                    </Dropdown>
                  </li>
                )}
                {rol === "employee" && (
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
                          <Dropdown.Item
                            as={Link}
                            to="/dashBoardEmployee/addLoan"
                          >
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
                )}
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
                        <h4 className="card-title">Add book</h4>
                      </div>
                      <div className="card-body">
                        <form onSubmit={this.sendSubmit}>
                          <div class="row">
                            <div class="col-md-4 pr-1">
                              <div class="form-group">
                                <label>ISBN</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="ISBN"
                                  name="ISBN"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>

                            <div class="col-md-4 pl-1">
                              <div class="form-group">
                                <label>Name</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Name"
                                  name="name"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>

                            <div class="col-md-4 pl-1">
                              <div class="form-group">
                                <label>Author</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Author"
                                  name="author"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-6 pr-1">
                              <div class="form-group">
                                <label>Genre</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  name="genre"
                                  placeholder="Genre"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                            <div class="col-md-6 pl-1">
                              <div class="form-group">
                                <label>Number of copies</label>
                                <input
                                  type="number"
                                  class="form-control"
                                  name="copies"
                                  placeholder="Number of copies"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-6 pr-1">
                              <div class="form-group">
                                <label>Date publication</label>
                                <input
                                  type="date"
                                  class="form-control"
                                  placeholder="Username"
                                  name="publication"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                            <div class="col-md-6 pl-1">
                              <div class="form-group">
                                <label>Fine value</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Fine value"
                                  name="fine"
                                  required
                                  onChange={this.manejarChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div class="text-center">
                            <button
                              type="submit"
                              class="btn btn-info btn-fill"
                              onClick={this.sendData}
                            >
                              Add
                            </button>
                            <button
                              type="submit"
                              class="btn btn-danger btn-fill"
                            >
                              Cancel
                            </button>
                          </div>
                          <div class="clearfix"></div>
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

export default AddBook;
