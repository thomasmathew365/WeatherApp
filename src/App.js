import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import tools from './tools';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import './App.css';
import Toggle from './components/ToggleRPC';
import WeeklyChart from './components/WeeklyChart'
import Portal from './components/Portal';
import { RotateLoader } from 'react-spinners';

const moment = require('moment');

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      data: {},
      orientation: tools.isMobile() ? 'vertical' : 'horizontal',
      loading: true
    };
    this.getLabels = this.getLabels.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  async componentWillMount() {
    let loc = await tools.getLocation();
    let lat = !!loc.lat ? loc.lat : 12.93;
    let lng = !!loc.lng ? loc.lng : 77.69;
    let fetchedData = await fetch(`/getData?lat=${lat}&lng=${lng}`, { method: 'GET' });
    let data = await fetchedData.json();
    // let fetchedImage = await fetch(`/getBgImage?lat=${lat}&lng=${lng}`, { method: 'GET' });
    // let imgdata = await fetchedImage.json();
    // console.log(imgdata);
    this.setState({
      data: data,
      value: Object.keys(data.list)[0],
      loading: false
    });
  }

  updateDimensions() {
    let orientation = tools.isMobile() ? 'vertical' : 'horizontal';
    if (this.state.orientation !== orientation) {
      this.setState({
        orientation: orientation
      });
    }
  }

  handleChange = value => {
    this.setState({
      value: value
    });
  };

  getLabels() {
    var obj = {};
    if (!!this.state.data.list) {
      let keys = Object.keys(this.state.data.list);
      for (let i = 1; i <= 24; i++) {
        obj[keys[i - 1]] = moment(Number(keys[i - 1])).format('HH:mm');
      }
    }
    return obj;
  }

  renderValues() {
    if (this.state.loading) {
      return (
        <div className='temp-loading'>
           <RotateLoader
          color={'#ffffff'} 
          loading={this.state.loading} 
        />
        </div>
      );
    }
    if (!!this.state.data.list) {
      let value = this.state.data.list[this.state.value];
      return (
        <div className="data-cont">
          <p className="temp-p">{`${this.getCelsiusFromKelvin(value.temp)} °`}</p>
          <p>{`${value.cloudPerc} % clouds`}</p>
          <p>{`Humidity ${value.humidity}`}</p>
          <p>{`${value.weatherDescription}`}</p>
        </div>
      );
    }
  }

  getCelsiusFromKelvin(kelvin) {
    if (kelvin < 0) {
      return 'below absolute zero (0 K)';
    } else {
      return Math.round(kelvin - 273.15);
    }
  }

  renderModal() {
    return (
      <div className="custom-modal">
          Loading...
      </div>
    );
  }

  render() {
    const { value, orientation } = this.state;
    return (
      <div className={`App background${moment(Number(value)).format('HH')}`}>
        <div className={`gradient-bg`}>
          <div className="sun-cont">
            <div className="sun" />
          </div>
          <div className="container-fluid app-cont">
            <div className="col-6 col-md-12">{this.renderValues()}</div>
            <div className="col-6 col-md-12 slider custom-labels">
              <Slider
                min={Number(Object.keys(this.getLabels())[0])}
                max={Number(Object.keys(this.getLabels())[23])}
                step={3600000}
                value={value}
                tooltip={false}
                orientation={orientation}
                labels={this.getLabels()}
                onChange={this.handleChange}
              />
              {/* <Toggle>
                {(on, setState) => (
                  <Fragment>
                    <button onClick={setState}>show/hide</button>
                    {on && <p>Bacon ipsum dolor.</p>}
                  </Fragment>
                )}
              </Toggle> */}
              {/* <Portal>
                {this.renderModal()}
              </Portal> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
