import React, { Component } from 'react';
import axios from 'axios';

import { Dropdown, NavItem, Navbar, PageHeader, Panel } from 'react-bootstrap';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Container, Input, InputGroup, InputGroupAddon, Nav, Row } from 'reactstrap';
import { MdRefresh } from "react-icons/md";
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles/hljs';

import { getSnippetBodyById } from './ServerUtils';
import { CodeInputsField, PortfolioNav, PortfolioNavDropdown } from  './Widgets';

class Portfolio extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      doneLoading: false,
      // portfolioMap will contain a mapping of navigational subheaders to portfolio items
      portfolioMap: {
        "Exercises": [],
      },
      values: [""],
      result: "Hit 'Run Code'...",
      activeItemID: 1,
      title: "",
      description: "",
      codeBlock: ""
    };
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.handleNavItemClick = this.handleNavItemClick.bind(this);
    this.runCode = this.runCode.bind(this);
  }

  componentDidMount() {
    let exerciseList = []
    let values = "";
    axios.get('/api/exercises').then((listResponse) => {
      // console.log(listResponse.data);
      listResponse.data.forEach(exercise => {
        exerciseList.push(exercise);
      });
      // console.log(exerciseList);
      const currentSnippetID = exerciseList[0].id;
      const snippetBlock = getSnippetBodyById(currentSnippetID).then(response => {
        const snippetBody = response.data;
        // console.log(response.data);
        this.setState({
          portfolioMap: [
            {label: "Exercises", items: exerciseList}
          ],
          values: snippetBody.values,
          title: snippetBody.title,
          description: snippetBody.description,
          codeBlock: snippetBody.snippet,
          doneLoading: true,
          mobileView: (window.innerWidth <= 760),
        });
      });
    });
  }

  handleRefreshClick() {
    axios.get('/api/' + this.state.activeItemID + '/values').then((res => {
      this.setState({
        values: res.data.values
      });
    }));
  }

  handleNavItemClick(itemID) {
    getSnippetBodyById(itemID).then(response => {
      const snippetBody = response.data;
      this.setState({
        values: snippetBody.values,
        title: snippetBody.title,
        description: snippetBody.description,
        codeBlock: snippetBody.snippet,
        activeItemID: itemID
      });
    });
  }

  runCode() {
    const data = {
      values: this.state.values
    };
    axios.post('/api/' + this.state.activeItemID + '/execute', {data}).then(res => {
      this.setState({
        result: res.data.result
      });
    },
    (error) => {
      this.setState({
        error,
        result: "Looks like we hit a snag..."
      });
    })
  }

  render() {
    const doneLoading = this.state.doneLoading;
    if (!doneLoading) {
      console.log("Still loading");
      return null;
    }
    const activeItemID = this.state.activeItemID;
    const portfolioMap = this.state.portfolioMap;
    return (
        <Container fluid>
          <Row>
            <Col md="2" className="px-0">
            <PortfolioNav navItems={portfolioMap} onClick={this.handleNavItemClick} />
            </Col>
            <Col md="8">
            <Card className="pb-3">
              <CardHeader><p className="h6">{this.state.title}</p></CardHeader>
              <CardBody>
              <CardTitle>{this.state.description}</CardTitle>
              <div className="border shadow-sm p-3 mb-2 bg-white rounded-0">
                <SyntaxHighlighter language='python' customStyle='margin-bottom: 0rem' style={docco}>
                  {this.state.codeBlock}
                </SyntaxHighlighter>
              </div>
              </CardBody>
              <div className="port-form-container">
              <p className="text-muted">Inputs:</p>
                <InputGroup size="sm">
                  <CodeInputsField values={this.state.values} />
                  <InputGroupAddon addonType="append">
                    <Button onClick={ this.handleRefreshClick }>
                      <MdRefresh />
                    </Button>
                    <Button onClick={ this.runCode }>Run Code</Button>
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <div className="port-form-container">
                <p className="text-muted">Result:</p>
                <Input name="resultField" id="resultTextBox" readOnly value={this.state.result} />
              </div>
            </Card>
            </Col>
          </Row>
        </Container>

    );
  }
}

export default Portfolio;
