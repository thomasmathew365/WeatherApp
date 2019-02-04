import React, { Component, createContext } from "react";
import tools from './tools';

const { Provider, Consumer } = createContext();

class AppContextProvider extends Component {
    state = {
        value: 0,
      data: {cityName: 'Bangalore'},
      orientation: tools.isMobile() ? 'vertical' : 'horizontal',
      loading: true,
      viewType: 'daily',
      bgImgUrl: '',
      currentLocation: {lat: 12.93, lng: 77.69},
      isSettingsOpen: false,
      isCelsius: true,
      setIsCelsius: (val) => {
        this.setState({
            isCelsius: !this.state.isCelsius
        })
      },
      setContextSettings: (val) => {
        this.setState({
            isSettingsOpen: !this.state.isSettingsOpen
        })
      },
      setContextCurrentLocation: (val) => {
        this.setState({
            currentLocation:val
        })
      },
      setContextValue: (val)=> {
        this.setState({
            value:val
        })
      },
      setContextData: (val)=> {          
        this.setState({
            data:val
        })
      },
      setContextLoading: (val)=> {
        this.setState({
            loading:val
        })
      },
      setContextBgImgUrl: (val)=> {
        this.setState({
            bgImgUrl:val
        })
      },
      setContextOrientation: (val)=> {
        this.setState({
            orientation:val
        })
      },
      setContextViewType: (val)=> {          
        this.setState({
            viewType:val
        })
      },
      
    }

    render() {
        return (
            <Provider value={{value: this.state.value,
                data: this.state.data,
                orientation: this.state.orientation,
                loading: this.state.loading,
                bgImgUrl: this.state.bgImgUrl,
                viewType: this.state.viewType,
                currentLocation: this.state.currentLocation,
                isSettingsOpen: this.state.isSettingsOpen,
                isCelsius: this.state.isCelsius,
                setIsCelsius: this.state.setIsCelsius,
                setContextSettings: this.state.setContextSettings,
                setContextValue: this.state.setContextValue,
                setContextData: this.state.setContextData,
                setContextLoading: this.state.setContextLoading,
                setContextBgImgUrl: this.state.setContextBgImgUrl,
                setContextOrientation: this.state.setContextOrientation,
                setContextCurrentLocation: this.state.setContextCurrentLocation,
                setContextViewType: this.state.setContextViewType}}>
                {this.props.children}
            </Provider>
        );
    } 
}

export { AppContextProvider };

export default Consumer;