import React from "react";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./widget.css";
// import { Row, Col, Container } from "react-bootstrap";
// import Button from "react-bootstrap/Button";

function WidgetText(props) {
  return (
    <div className="WidgetWraper">
      <div className="WidgetTitle ">
        {props.title}
      </div>
      <div className="WidgetValue">{props.data}</div>
    </div>
  );
}
export default WidgetText;
