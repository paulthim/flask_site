import React, { Component } from 'react';
import { Media, Panel } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'reactstrap';
import { IconContext } from 'react-icons';
import { IoIosMail } from "react-icons/io";

class Footbar extends Component {
  render() {
    return (
      <div className="footer fixed-bottom">
        <ul className="nav justify-content-end p-2">
            <li className="nav-item ml-2">
              <a className="footer-link" href="mailto:paul.thim@gmail.com" rel="noopener noreferrer" target="_top">
                <IconContext.Provider value={{ size: "2em", color: "#21259" }}>
                  <IoIosMail width={30}/>
                </IconContext.Provider>
              </a>
            </li>
            <li className="nav-item ml-2">
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/paulthim/">
              <img width={30} src="dist/images/In-2C-128px-TM.png" alt="LinkedIn" />
            </a>
            </li>
          </ul>
      </div>
    );
  }
}

export default Footbar;
