import React from "react";
class Footer extends React.Component {
  render() {
    return (
      <div>
        <footer className="footer">
          <div className="container-fluid">
            <nav>
              <ul className="footer-menu">
                <li>
                  <a href="#">Hovar Steven Rincón Vianchá</a>
                </li>
                <li>
                  <a href="#">Andrés Iván Sierra Espinel</a>
                </li>
              </ul>
              <p className="copyright text-center">
                ©<a>Made with Express and EJS</a>
              </p>
            </nav>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
