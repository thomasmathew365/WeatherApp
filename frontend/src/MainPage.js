import React, { Component, Fragment } from 'react';
import tools from './tools';
import 'react-rangeslider/lib/index.css';
import './App.css';
// import Unsplash, { toJson } from 'unsplash-js';
import { createApi } from 'unsplash-js';
import DailyDisplay from './components/DailyDisplay';
import WeeklyChart from './components/WeeklyChart';
import { AppContextProvider } from './AppContext';
import "react-tabs/style/react-tabs.css";
import { Transition, Spring } from 'react-spring'
import style from './MainPage.module.css';
import Geosuggest from 'react-geosuggest';
import autoBind from 'react-autobind';
import Portal from './components/Portal';

import classnames from 'classnames/bind';
const cx = classnames.bind(style);

const moment = require('moment');

const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_ACCESS,
  });


class MainPage extends Component {
    constructor() {
        super();
        autoBind(this);
    }

    componentDidMount() {
        let self = this;
        const ctx = this.props.context;
        const { data: {cityName}} = ctx;

        console.log(process.env);
        unsplash.photos.getRandom({
            count: 1,
            collectionIds: ['11649432'],
          }).then(res => {
                self.props.context.setContextBgImgUrl(res.response[0].urls.regular);
            })
            .catch(err => { console.log(err) })
        window.addEventListener('resize', this.updateDimensions.bind(this));
    }

    async componentWillMount() {
        let loc = await tools.getLocation();
        this.props.context.setContextCurrentLocation(loc);
        this.fetchAndSetWeather();
    }

    async fetchAndSetWeather() {
        const loc = this.props.context.currentLocation;
        let lat = loc.lat;
        let lng = loc.lng;
        let fetchedData = await fetch(`/getData?lat=${lat}&lng=${lng}`, { method: 'GET' });
        let data = await fetchedData.json();
        this.props.context.setContextValue(Object.keys(data.list)[0]);
        this.props.context.setContextData(data);
        this.props.context.setContextLoading(false);
    }

    updateDimensions() {
        let orientation = tools.isMobile() ? 'vertical' : 'horizontal';
        if (this.props.context.orientation !== orientation) {
            this.props.context.setContextOrientation(orientation);
        }
    }

    onSuggestSelect(val) {
        if (val) {
            this.props.context.setContextCurrentLocation(val.location);
            this.fetchAndSetWeather();
        }
    }

    renderModal() {
        const google = window.google;
        const { currentLocation, data, setIsCelsius, isCelsius } = this.props.context;        
        return (
            <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}>
                {props => 
                <Portal style={props} triggerPortal={this.props.context.setContextSettings}>
                    <div className='geosuggest-cont'>
                        <Geosuggest
                            ref={el => this._geoSuggest = el}
                            placeholder="Select Location"
                            initialValue={data.cityName}
                            onSuggestSelect={this.onSuggestSelect}
                            location={new google.maps.LatLng(currentLocation.lat, currentLocation.lng)}
                            radius="20" />
                        <span className="switch">
                        <input type="checkbox" onChange={setIsCelsius} checked={!isCelsius} className="switch" id="switch-id" />
                            <label for="switch-id">Farenheit</label>
                        </span>
                    </div>
                    </Portal>
                }
            </Spring>
            
        );
      }

    render() {
        const ctx = this.props.context;
        const { value, bgImgUrl, viewType, setContextViewType, currentLocation, data, isSettingsOpen, setContextSettings } = ctx;
        let isDailyActive = viewType === 'daily' ? 'active' : '';
        let isWeeklyActive = viewType === 'weekly' ? 'active' : '';
        const google = window.google;
        return (
            <div className="bg-img" style={{ backgroundImage: `url(${bgImgUrl})`, maxHeight: '100vh' }}>
              
                <AppContextProvider >
                    <div className='tab-cont'>
                        {/* <button className={`tab-button ${isDailyActive}`} onClick={() => { setContextViewType('daily') }}>daily</button>
                        <button className={`tab-button ${isWeeklyActive}`} onClick={() => { setContextViewType('weekly') }}>weekly</button> */}
                        <button className={`tab-button ${isSettingsOpen ? 'active' : ''}` } onClick={() => { setContextSettings()}}>  <span className="glyphicon glyphicon-asterisk" aria-hidden="true"></span>
</button>
                    </div>
                    <Transition
                        items={viewType === 'daily'}
                        from={{ opacity: 0 }}
                        enter={{ opacity: 1 }}
                        leave={{ opacity: 0 }}>
                        {show =>
                            show && (props => <div className={`App background${moment(Number(value)).format('HH')}`} style={props}><DailyDisplay context={ctx} /></div>)
                        }
                    </Transition>
                    <Transition
                        items={viewType === 'weekly'}
                        from={{ opacity: 0 }}
                        enter={{ opacity: 1 }}
                        leave={{ opacity: 0 }}>
                        {show =>
                            show && (props => <div className={`App background${moment(Number(value)).format('HH')}`} style={props}><WeeklyChart context={ctx} /></div>)
                        }
                    </Transition>
                   {isSettingsOpen && this.renderModal()}
                </AppContextProvider>
            </div>
        );

    }
}

export default MainPage;
