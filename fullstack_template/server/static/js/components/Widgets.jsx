import React, { Component } from 'react';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem, Tooltip } from 'reactstrap';
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

export class ToolTipText extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    return (
      <Tooltip placement="bottom" target={this.props.target} isOpen={this.state.tooltipOpen} autohide={false} toggle={this.toggle}><small>{this.props.children}</small></Tooltip>
    )
  }
}

export class CodeInputsField extends Component {
  render() {
    let values = this.props.values;
    console.log(values);
    let rows = (typeof values === "string" ? 1 : values.length);
    if (rows > 1) {
      values = values.join('\n');
    }
    return (
      <textarea
        name="inputField"
        disabled
        className="form-control"
        rows={rows}
        value={values}></textarea>
    )
  }
}

export class PortfolioNav extends Component {
  constructor(props) {
    super(props);
    const openSections = {};
    this.state = {
      navMapping: props.navItems,
    };
  }

  render() {
    const navMapping = this.state.navMapping;
    return (
      <Accordion>
        {this.state.navMapping.map((navSection, index) =>
          <AccordionItem key={navSection.label} expanded={index==0 ? true : false}>
            <AccordionItemTitle className="port-nav-title">
              <div className="port-nav-label">
                <div className="accordion__arrow" role="presentation" />
                {navSection.label}
              </div>
            </AccordionItemTitle>
            <AccordionItemBody>
            <ListGroup className="port-nav-list">
            {navSection.items.map(navItem =>
              <PortfolioNavItem key={navItem.id} content={navItem} onClick={this.props.onClick}/>
            )}
            </ListGroup>
            </AccordionItemBody>
          </AccordionItem>
        )}
      </Accordion>
    )
  }
}

function PortfolioNavItem(props) {
  function handleClick(e) {
    e.preventDefault();
    console.log(props.content.id);
    props.onClick(props.content.id);
  };

  return (
    <ListGroupItem className="port-nav-item" onClick={handleClick}>
      {props.content.title}
    </ListGroupItem>
  )
}

export class PortfolioNavDropdown extends Component {
  render() {
    const navMapping = this.props.navItems;
    return (
      <div>
      {navMapping.map((navSection, index) =>
        <PortfolioNavDropdownSection key={index} label={navSection.label} navItems={navSection.items} onClick={this.props.onClick}/>
      )}
      </div>
    )
  }
}

export class PortfolioNavDropdownSection extends Component {
  constructor(props) {
    super(props);
    const openSections = {};
    this.state = {
      label: props.label,
      navItems: props.navItems,
      activeItem: props.active,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.props.onClick(event.target.value);
  }

  render() {
    const {label, navItems, activeItem}  = this.state;
    console.log(this.props.active);
    return (
      <div>
        <label>
          {label}
          <select id={label + "-select"} value={activeItem} onChange={this.handleChange}>
          {navItems.map(navItem =>
            <option key={navItem.id} value={navItem.id}>{navItem.title}</option>
          )}
          </select>
        </label>
      </div>
    )
  }
}

function PortfolioDropdownItem(props) {
  function handleClick(e) {
    e.preventDefault();
    console.log(props.content.id);
    props.onClick(props.content.id);
  };

  return (
    <button className="dropdown-item" type="button" onClick={handleClick}>
      {props.content.title}
    </button>
  )
}
