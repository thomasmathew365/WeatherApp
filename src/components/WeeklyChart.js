import React, { Component } from 'react'
import {Line} from 'react-chartjs-2';
import ReactTables from 'react-table';
import "react-table/react-table.css";
import autobind from 'react-autobind';

let data = {
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: [{
    label: "Weekly Weather",
    borderColor: 'rgb(0, 0, 0)',
    data: [11, 18.5, 25, 22, 23, 2, 45],
    backgroundColor: 'rgb(255, 255, 255, 1)',
    pointBackgroundColor: '#333333',
    pointBorderWidth: '10',
    pointBorderColor: '#333333'
    }]
};

var options = {
  legend: {
    display: true,
},
}

export default class WeeklyChart extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }


  render() {
    return (
      <div >
        <Line data={data} options={options}/>
              </div>
    )
  }
}
