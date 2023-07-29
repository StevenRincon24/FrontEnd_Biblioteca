import React from "react";
import Footer from "./Footer";
import { ApiUrl } from "../services/apiRest";
class Format extends React.Component {

  sendData(e) {
    e.preventDefault();
  }

  state = {
    form: {
      
    },
    error: false,
    errorMsg: "Error",
  };


  render() {
    return (
      <div>
        <Footer />
      </div>
    );
  }
}

export default Format;
