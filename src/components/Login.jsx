import React from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/light-bootstrap-dashboard.css";
import "../assets/css/demo.css";
import axios from "axios";
import Footer from "./Footer";
// SERVICIO LOGIN
import { ApiUrl } from "../services/apiRest";

class Login extends React.Component {
  manejarSubmit(e) {
    e.preventDefault();
  }

  state = {
    form: {
      username: "",
      password: "",
    },
    error: false,
    errorMsg: "Error",
  };

  manejarChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  manejadorButton = () => {
    let url = ApiUrl + "login/validateuser";
    axios
      .post(url, this.state.form)
      .then((response) => {
        console.log(response.data);
        console.log(response.data.message);

        if (response.data.message.toLowerCase() === "user finded ") {
          localStorage.setItem("rol", response.data.rol);
          localStorage.setItem("username", this.state.form.username);
          if (response.data.rol === "admin") {
            window.location = "/Dashboard";
          } else if (response.data.rol === "employee") {
            window.location = "/DashboardEmployee";
          } else if (response.data.rol === "customer") {
            window.location = "/DashBoardCustomer";
          }
          this.setState({
            error: true,
            errorMsg: "User OK",
          });
        } else if (
          response.data.message.toLowerCase() ===
          "Error, user is not registered"
        ) {
          console.log("No Encontrado");
          this.setState({
            error: true,
            errorMsg: "Invalid user or role",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: true,
          errorMsg: "Error al conectar al API",
        });
      });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row m-5 no-gutters shadow-lg">
            <div className="col-md-6 d-none d-md-block">
              <img
                src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
                className="img-fluid"
                style={{ minHeight: "100%" }}
              />
            </div>
            <div className="col-md-6 bg-white p-5">
              <h3 className="pb-3">Login</h3>
              <div className="form-style">
                <form onSubmit={this.manejarSubmit}>
                  <div className="form-group pb-3">
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-control"
                      id="exampleInputEmail1"
                      name="username"
                      aria-describedby="emailHelp"
                      onChange={this.manejarChange}
                    />
                  </div>
                  <div className="form-group pb-3">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      name="password"
                      id="exampleInputPassword1"
                      onChange={this.manejarChange}
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <a href="#">Forget Password?</a>
                    </div>
                  </div>

                  {this.state.error === true && (
                    <div className="alert alert-danger" role="alert">
                      {this.state.errorMsg}
                    </div>
                  )}

                  <div className="pb-2">
                    <button
                      type="submit"
                      className="btn btn-dark w-100 font-weight-bold mt-2"
                      onClick={this.manejadorButton}
                    >
                      Submit
                    </button>
                  </div>
                </form>

                <div></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
