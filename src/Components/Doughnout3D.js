import React from "react";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./widget.css";
// import WidgetText from './WidgetText'
// import { Row, Col, Container } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
import ReactFC from "react-fusioncharts";

// Step 3 - Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Step 5 - Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

function Doughnut3d(props) {
  // Create a JSON object to store the chart configurations
  const chartConfigs = {
    type: "doughnut3d", // The chart type
    width: "400", // Width of the chart
    height: "300", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        bgColor: "#EFEFEF",
        theme: "fusion" //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: props.data
    }
  };
  return (
    <div className="WidgetWraper widgetContainersCol">
      <div className="WidgetTitle hovereffect doghnouttitle">
        <span>{props.title}</span>
      </div>
      <div className="WidgetValue doghnoutvalue ">
        <ReactFC {...chartConfigs} />
      </div>
    </div>
  );
}
export default Doughnut3d;
