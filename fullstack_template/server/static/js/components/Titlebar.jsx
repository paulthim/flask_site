import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { IconContext } from 'react-icons';
import { MdViewHeadline } from "react-icons/md";

function Burger(props) {
  return (
    <div className={props.toggled ? "burger rotate" : "burger"} onClick={ props.onClick }>
      <IconContext.Provider value={{verticalAlign: "middle", className: "menu-button"}}>
        <MdViewHeadline />
      </IconContext.Provider>
    </div>
  )
}

class Titlebar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: props.menuOpen
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.setState(state => ({
      headerClass: (this.props.height === 400 ? "header-full" : "header-min"),
      mobileView: (window.innerWidth <= 760)
    }));
  }

  resize() {
    let currentMobileView = (window.innerWidth <= 760);
    if (currentMobileView !== this.state.mobileView) {
      this.setState({
        mobileView: currentMobileView
      });
    }
  }

  render() {
    let headerClass = (this.state.mobileView ? "header-mobile " : "header-desktop ");
    headerClass += this.state.headerClass;
    return (
      <div className={ headerClass }>
        <Media>
          <Media left top>
            <Burger onClick={ this.props.handleMenuClick } toggled={ this.props.menuOpen }/>
          </Media>
          <Media body top>
            <Media heading>Paul Thim</Media>
          </Media>
        </Media>
      </div>
    );
  }
}

export default Titlebar;
