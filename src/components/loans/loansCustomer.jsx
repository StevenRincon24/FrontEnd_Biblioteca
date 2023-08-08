import React from "react";
import Footer from "../Footer";
import axios from "axios";
import { Dropdown, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ApiUrl } from "../../services/apiRest";
class LoansCustomer extends React.Component {
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
    let email = localStorage.getItem("username");
    let url = ApiUrl + "dashBoard/loansHistoryManagement/" + email;
    axios
      .get(url)
      .then((response) => {
        const { customerData } = response.data;
        if (customerData && customerData.customer.loans) {
          const allLoans = customerData.customer.loans.map((loan) => ({
            id: loan.id,
            isbn: loan.isbn,
            startDate: loan.startDate,
            endDate: loan.endDate,
            state: loan.state,
            _id: loan._id,
            customerUsername: customerData.email,
          }));

          console.log(allLoans);

          this.setState({ data: allLoans });
        } else {
          console.log("No se encontraron préstamos para el cliente.");
        }
      })
      .catch((error) => {
        // Manejar el error en caso de fallo en la solicitud
        console.log("Error al obtener los préstamos:", error);
        this.setState({ data: [] });
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
                      <span>Loans </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/dashBoardCustomer/loans">
                        Loans
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
            ></nav>
            <div className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card strpied-tabled-with-hover">
                      <div className="card-header ">
                        <h4 className="card-title">List Loans</h4>
                      </div>
                      <div className="card-body table-full-width table-responsive">
                        <table className="table table-hover table-striped">
                          <thead>
                            <tr>
                              <th>ISBN</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>State</th>
                              <th>Debt</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((loans) => (
                              <tr key={loans._id}>
                                <td>{loans.isbn}</td>
                                <td>{this.formatDate(loans.startDate)}</td>
                                <td>{this.formatDate(loans.endDate)}</td>
                                <td>{loans.state ? "Active" : "Inactive"}</td>
                                <td>
                                  {this.formatDate(loan.startDate) -
                                    this.formatDate(loan.endDate) >
                                  8
                                    ? "Mayor a 8 días"
                                    : "No mayor a 8 días"}
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

export default LoansCustomer;
