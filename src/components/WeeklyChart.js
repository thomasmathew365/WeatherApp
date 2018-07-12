import React, { Component } from 'react'
import {Line} from 'react-chartjs-2';
let data = {
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: [{
    label: "Weekly Weather",
    borderColor: 'rgb(255, 99, 132)',
    data: [11, 18.5, 25, 22, 23, 2, 45],
    }]
};
export default class WeeklyChart extends Component {
  render() {
    return (
      <div>
        <Line data={data}/>
      </div>
    )
  }
}
