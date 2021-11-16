import React, { Component, Fragment } from 'react';
// import { RotateLoader } from 'react-spinners';
import RotateLoader from "react-spinners/RotateLoader";
import Slider from 'react-rangeslider';
import { animated, Transition, Spring } from 'react-spring'

const moment = require('moment');

const DailyDisplay = (props) => {
    const getLabels = () => {
        var obj = {};
        if (!!props.context.data.list) {
            let keys = Object.keys(props.context.data.list);
            for (let i = 1; i <= 24; i++) {
                obj[keys[i - 1]] = moment(Number(keys[i - 1])).format('HH:mm');
            }
        }
        return obj;
    }
    const getWeatherImage = (value) => { 
        const isDay = ((moment(Number(props.context.value)).format('HHmm') < '1930') && (moment(Number(props.context.value)).format('HHmm') > '0530'));          
        let weatherCode = 800;        
        if (value.weatherCode.toString().substr(0,1) === '8') {
            weatherCode = value.weatherCode;
        }   else {
            weatherCode = `${value.weatherCode.toString().substr(0,1)}00`;
        }
        const srcBgLink = `resources/images/${isDay ? 'day' : 'night'}/${weatherCode}/bg.png`;
        const srcIconLink = `resources/images/${isDay ? 'day' : 'night'}/${weatherCode}/icon.png`;        
        return {srcBgLink, srcIconLink};
    }

    const Modal = ({ ...style }) => (
        <animated.div style={{ ...style }}>
          <img className='weather-img' src={getWeatherImage()}></img>
        </animated.div>
      )
      

    const renderValues = () => {        
        if (props.context.loading) {
            return (
                <div className='temp-loading'>
                    {/* <RotateLoader
                        color={'#ffffff'}
                        loading={props.context.loading}
                    /> */}
                    <div>Loading.....</div>
                </div>
            );
        }
        if (!!props.context.data.list) {
            let value = props.context.data.list[props.context.value];
            return (
                <div className="data-cont" style={{backgroundImage: `url(${getWeatherImage(value)['srcBgLink']})`}}>
                    <div className='weather-img-cont'>
                        <Spring
                            from={{ opacity: 0 }}
                            to={{ opacity: 1 }}>
                            {props => <img style={props} className='weather-img' src={getWeatherImage(value)['srcIconLink']}></img>}
                        </Spring> 
                    </div>
                    <p className="temp-p">{`${getTemperatureVal(value.temp)} °`}</p>
                    <p>{`${value.cloudPerc} % clouds`}</p>
                    <p>{`Humidity ${value.humidity}`}</p>
                    <p>{`${value.weatherDescription}`}</p>
                </div>
            );
        }
    }

    const getTemperatureVal = (kelvin) => {        
        if (kelvin < 0) {
            return 'below absolute zero (0 K)';
        } else if (props.context.isCelsius) {        
            return Math.round(kelvin - 273.15);
        } else {
            return Math.round((kelvin * (9/5)) - 459.67);
        }
    }
    return (
        
        <Fragment>
            <div className="container-fluid app-cont">
                <div className="col-6 col-md-12">{renderValues()}</div>
                <div className="col-6 col-md-12 slider custom-labels">
                    <Slider
                        min={Number(Object.keys(getLabels())[0])}
                        max={Number(Object.keys(getLabels())[23])}
                        step={3600000}
                        value={props.context.value}
                        tooltip={false}
                        orientation={props.context.orientation}
                        labels={getLabels()}
                        onChange={props.context.setContextValue}
                    />
                </div>
            </div>
        </Fragment>
    );

}

export default DailyDisplay;