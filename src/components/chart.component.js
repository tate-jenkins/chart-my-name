import React, { Component } from 'react';
//import logo from '../logo.svg';
import '../App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);



class Chart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.dataFromParent
    };
  }


  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.paddingRight = 20;

    let data = [];
    let visits = 10;
    for (let i = 1880; i < 2020; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: new Date(i, 0), name: "name" + i, value: visits });
    }
    var dataArr = [];
    var i;


    if (!(typeof(this.state.data) == 'undefined')) {
      const theData = this.state.data;
      for (i=0; i < 140; i++) {
        var dataObj = {};
        dataObj["year"] = theData[0][i];
        dataObj["rank"] = theData[1][i];
        dataArr.push(dataObj);
      }
    }
    //console.log(dataArr);

    chart.data = dataArr;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "year";
    series.dataFields.valueY = "rank";

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    
    return (
      <div>
        <div></div>
        <div id="chartdiv" style={{ width: "100%", height: "400px" }}></div>
      </div>
    );
  }
}

export default Chart;
