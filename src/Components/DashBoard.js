import React, { Component } from "react";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./widget.css";
import WidgetBar from "./WidgetBar";
import Doughnut2d from "./Doughnut2D";
import Doughnut3d from "./Doughnout3D";

import Bar2D from "./Bar2D";
import Dropdown from "react-dropdown";
// import Petro2D from "./Petro2D";

import "react-dropdown/style.css";
// import { items } from "fusioncharts";
import WidgetText from "./WidgetText";
import { Row, Col, Container } from "react-bootstrap";

//excel import
const config = {
  apiKey: "AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI",
  spreadsheetId: "1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg"
};
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      srcArr: [],
      usersArr: [],
      sesArr: [],
      sessArr: [],
      sePagArr: [],
      pageViewsMonth: "Jan 2018",
      dropDownOptions: [],
      selectedValue: null,
      organic_source: null,
      direct_source: null,
      referral_source: null,
      social_source: null,
      email_source: null,
      page_views: null,
      users: null,
      new_users: null,
      sessions: null,
      number_of_sessions_per_users: null,
      page_per_session: null,
      avg_session_time: null,
      bounce_rate: null
    };
  }
  getData = (arg) => {
    const arr = this.state.items;
    let arrLength = arr.length;
    let selectedValue = null;
    let organic_source = 0;
    let direct_source = 0;
    let referral_source = 0;
    let social_source = 0;
    let email_source = 0;
    let page_views = 0;
    let users = 0;
    let new_users = 0;
    let sessions = 0;
    let number_of_sessions_per_users = 0;
    let page_per_session = 0;
    let avg_session_time = 0;
    let bounce_rate = 0;
    let srcArr = [];
    let usersArr = [];
    let sesArr = [];
    let sessArr = [];
    let sePagArr = [];

    for (let i = 0; i < arrLength; i++) {
      if (arg === arr[i]["month"]) {
        organic_source = arr[i].organic_source;
        direct_source = arr[i].direct_source;
        referral_source = arr[i].referral_source;
        social_source = arr[i].social_source;
        email_source = arr[i].email_source;
        page_views = arr[i].page_views;
        users = arr[i].users;
        new_users = arr[i].new_users;
        sessions = arr[i].sessions;
        number_of_sessions_per_users = arr[i].number_of_sessions_per_users;
        page_per_session = arr[i].page_per_session;
        avg_session_time = arr[i].avg_session_time;
        bounce_rate = arr[i].bounce_rate;
        sePagArr.push(
          {
            label: "Page Views",
            value: arr[i].page_views
          },
          {
            label: "Sessions",
            value: arr[i].sessions
          },
          {
            label: "Bouncing Rate",
            value: arr[i].bounce_rate
          }
        );

        srcArr.push(
          {
            label: "Organic Source",
            value: arr[i].organic_source
          },
          {
            label: "Direct Source",
            value: arr[i].direct_source
          },
          {
            label: "Referral Source",
            value: arr[i].referral_source
          },
          {
            label: "Social Source",
            value: arr[i].social_source
          },
          {
            label: "Email Source",
            value: arr[i].email_source
          }
        );
        sesArr.push(
          {
            label: "Bounce Rate",
            value: arr[i].bounce_rate
          },
          {
            label: "Averge Session Time",
            value: arr[i].avg_session_time
          }
        );

        sessArr.push(
          {
            label: "Sessions Per Users",
            value: arr[i].number_of_sessions_per_users
          },
          {
            label: "Page per session",
            value: arr[i].page_per_session
          },
          {
            label: "Bounce Rate",
            value: arr[i].bounce_rate
          },
          {
            label: "Averge Session Time",
            value: arr[i].avg_session_time
          }
        );

        usersArr.push(
          {
            label: "Users",
            value: arr[i].users
          },
          {
            label: "New Users",
            value: arr[i].new_users
          }
        );
      }
    }
    selectedValue = arg;
    this.setState({
      organic_source: organic_source,
      direct_source: direct_source,
      referral_source: referral_source,
      social_source: social_source,
      email_source: email_source,
      page_views: page_views,
      users: users,
      new_users: new_users,
      sessions: sessions,
      number_of_sessions_per_users: number_of_sessions_per_users,
      page_per_session: page_per_session,
      avg_session_time: avg_session_time,
      bounce_rate: bounce_rate,
      srcArr: srcArr,
      usersArr: usersArr,
      sesArr: sesArr,
      sessArr: sessArr,
      sePagArr: sePagArr
    });
  };

  updateDashboard = (event) => {
    this.getData(event.value);
    this.setState({
      selectedValue: event.value,
      pageViewsMonth: event.value
    });
  };

  componentDidMount() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let batchRowValues = data.valueRanges[0].values;

        const rows = [];

        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        // dropdown options
        let dropdownOptions1 = [];

        for (let i = 0; i < rows.length; i++) {
          dropdownOptions1.push(rows[i].month);
        }

        dropdownOptions1 = Array.from(new Set(dropdownOptions1)).reverse();

        this.setState(
          {
            items: rows,
            dropDownOptions: dropdownOptions1,
            selectedValue: "Jan 2018"
          },
          () => {
            this.getData("Jan 2018");
          }
        );
      });
  }

  render() {
    // Preparing the chart data
    const chartData1 = [
      {
        label: this.state.pageViewsMonth,
        value: this.state.page_views
      }
    ];

    return (
      <div>
      <Container>
          <Row className="Header Container">
            <Col className="Heading">
              <h1 id="heading">Dashboard</h1>
            </Col>
            <Col id="dropdownmenu">
              <Dropdown
                options={this.state.dropDownOptions}
                onChange={this.updateDashboard}
                value={this.state.selectedValue}
                placeholder="Select an option"
              />
            </Col>
          </Row>
        </Container>
      <Container>
        

        <Container className="MainDashboard">
          <Row>
            <Doughnut2d title="Page Views" data={chartData1} />
          </Row>

          {/* Main Work  */}
          <Row>
            <Container>
              <Row>
                <Col>
                  <WidgetText
                    title="Organic source"
                    data={this.state.organic_source}
                  />
                </Col>
                <Col xs={4}>
                  <WidgetText
                    title="Referral Source"
                    data={this.state.referral_source}
                  />
                </Col>
                <Col>
                  <WidgetText
                    title="Direct Source"
                    data={this.state.direct_source}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <WidgetText
                    title="Social Source"
                    data={this.state.social_source}
                  />
                </Col>

                <Col>
                  <WidgetText
                    title="Email Source"
                    data={this.state.email_source}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Doughnut2d
                    title="User Comparsion"
                    data={this.state.usersArr}
                  />
                </Col>
                <Col>
                  <WidgetBar
                    title="Source Comaprasion"
                    data={this.state.srcArr}
                  />
                </Col>
              </Row>
            </Container>
          </Row>

          <Row>
            <Container>
              <Row>
                <Col xs={3}>
                  <WidgetText title="Sessions" data={this.state.sessions} />
                </Col>
                <Col>
                  <WidgetText
                    title="Session Per Page"
                    data={this.state.page_per_session}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <WidgetText
                    title="Bounce Rate"
                    data={this.state.bounce_rate}
                  />
                </Col>
                <Col>
                  <WidgetText
                    title="Users Per Session"
                    data={this.state.number_of_sessions_per_users}
                  />
                </Col>
                <Col xs={4}>
                  <WidgetText
                    title="Averge Response Time"
                    data={this.state.avg_session_time}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Doughnut2d
                    title="Comparison  Chart"
                    data={this.state.sesArr}
                  />
                </Col>
                <Col>
                  <Bar2D title="Bar Chart" data={this.state.sessArr} />
                </Col>
              </Row>
            </Container>
          </Row>
        </Container>

        <Container>
          <Row className="containter">
            <Col>
              <Doughnut2d
                title="Comparison  Chart"
                data={this.state.sessArr}
              />
            </Col>
            <Col>
              <Doughnut3d
                title="Comparison  Chart"
                data={this.state.sePagArr}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      </div>
    );
  }
}
export default DashBoard;
