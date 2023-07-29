import React from "react";
import Footer from "../Footer";
import axios from "axios";
import { Dropdown, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ApiUrl } from "../../services/apiRest";
class ListEmployee extends React.Component {
  state = {
    data: [],
    error: false,
    errorMsg: "Error",
    form: {
      id: "",
      username: "",
      password: "",
      rol: "",
      Name: "",
      lastName: "",
      documentType: "",
      documentNumber: "",
      cellphone: "",
      address: "",
      birthday: "",
    },
  };

  getLoans = () => {
    let url = ApiUrl + "dashBoard/loansManagement";
    axios.get(url).then((response) => {
      const allLoans = response.data.customers.reduce((acc, customer) => {
        const loans = customer.loans.map((loan) => ({
          id: loan.id,
          isbn: loan.isbn,
          startDate: loan.startDate,
          endDate: loan.endDate,
          state: loan.state,
          _id: loan._id,
          customerUsername: customer.username,
        }));
        return [...acc, ...loans];
      }, []);

      console.log(allLoans);

      this.setState({ data: allLoans });
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

  sendData = (username, id) => {
    let url =
      ApiUrl + "dashBoard/loansManagement/changeStatus/" + username + "/" + id;
    console.log(url);
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.message);

        if (data.message === "Loan status updated successfully") {
          console.log(data.message);
          this.setState({
            error: true,
            errorMsg: "Loan status updated successfully",
          });
          this.getLoans();
        } else if (data.error === "Error updating loan status") {
          console.log("Error");
          this.setState({
            error: true,
            errorMsg: "Error updating loan status",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: true,
          errorMsg: "Error",
        });
      });
  };

  componentDidMount() {
    this.getLoans();
  }

  formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  render() {
    const { data, isModalOpen, form } = this.state;

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
                    <div className="card strpied-tabled-with-hover">
                      <div className="card-header ">
                        <h4 className="card-title">Customers</h4>
                      </div>
                      <div className="card-body table-full-width table-responsive">
                        <table className="table table-hover table-striped">
                          <thead>
                            <tr>
                              <th>Username</th>
                              <th>ISBN</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>State</th>
                              <th>Change Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((loans) => (
                              <tr key={loans._id}>
                                <td>{loans.id}</td>
                                <td>{loans.isbn}</td>
                                <td>{this.formatDate(loans.startDate)}</td>
                                <td>{this.formatDate(loans.endDate)}</td>
                                <td>{loans.state ? "Active" : "Inactive"}</td>
                                <td>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                      this.sendData(
                                        loans.customerUsername,
                                        loans.id
                                      )
                                    }
                                  >
                                    Change
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {this.state.error === true && (
                      <div className="alert alert-danger" role="alert">
                        {this.state.errorMsg}
                      </div>
                    )}
                  </div>
                  {/*END TABLE*/}
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

export default ListEmployee;
