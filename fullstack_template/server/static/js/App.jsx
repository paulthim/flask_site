import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';
import Contact from './components/Contact.jsx';
import Portfolio from './components/Portfolio.jsx';
import Footbar from './components/Footbar.jsx';
import Menu from './components/Menu.jsx';
import Titlebar from './components/Titlebar.jsx';
const linkedInIcon = require('../images/In-2C-128px-TM.png')

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      menuOpen: false,
      headerHeight: 400,
      currentView: 1
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
  }

  toggleMenu(e) {
    this.setState(state => ({
      menuOpen: !this.state.menuOpen
    }));
  }

  handleMenuSelect(selectedKey) {
    if (selectedKey !== this.state.currentView) {
      this.setState(state=> ({
        menuOpen: (selectedKey !== 1),
        currentView: selectedKey,
        headerHeight: selectedKey > 1 ? 70 : 400
      }));
    }
  }

  render() {
    let menuState = this.state.menuOpen;
    let currentViewKey = this.state.currentView;
    let currentView;
    if (currentViewKey === 2) {
      currentView = <Portfolio />;
    } else if (currentViewKey === 3){
      currentView = <Contact />;
    } else {
      currentView = <div><p></p></div>;
    }

    return (
      <div className="app">
        <AnimateHeight duration={ 500 } height={ this.state.headerHeight }>
          <Titlebar
          height={ this.state.headerHeight }
          handleMenuClick={ this.toggleMenu }
          menuOpen={ menuState }/>
        </AnimateHeight>
        <Menu menuOpen={ menuState } currentItem={ currentViewKey } handleSelect={ this.handleMenuSelect }/>
        <div className="content">
          {currentView}
        </div>
        <Footbar />
      </div>
    );
  }
}

export default App;
