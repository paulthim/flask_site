import React, { Component } from 'react';
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';


class Menu extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentItem: props.currentItem,
      menuItems: [
        {id: 1, title: "Home"},
        {id: 2, title: "Practices & Examples"},
        {id: 3, title: "About"}
      ]
    };
  }

  render() {
    return (
      <Collapse isOpen={ this.props.menuOpen }>
        <div id='menu'>
        <Nav tabs >
          {this.state.menuItems.map((menuItem) =>
          <NavItem key={menuItem.id}>
            <NavLink
              className={classnames({ active: this.props.currentItem === menuItem.id})}
              onClick={() => { this.props.handleSelect(menuItem.id); }}
            >
            {menuItem.title}
            </NavLink>
          </NavItem>
          )}
        </Nav>
        </div>
      </Collapse>
    );
  }
}

export default Menu;
