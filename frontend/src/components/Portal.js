import {Component} from 'react';
import ReactDOM from 'react-dom';
import React from 'react';

const portalRoot = document.getElementById('portal');

export default class Portal extends Component {
    constructor() {
        super();
        this.ele = document.createElement('div');
    }

    componentDidMount() {
        portalRoot.appendChild(this.ele);
    }

    componentWillUnmount() {
        portalRoot.removeChild(this.ele);
    }
    render() {
        const { children, style } = this.props;
        const enclosedChildren = (
            <div style={style} className="custom-modal-cont">
                <div className="custom-modal">
                <span className="portal-close" onClick={this.props.triggerPortal}>X</span>
                    {children}
                </div>
            </div>
        )
        return ReactDOM.createPortal(enclosedChildren, this.ele)
    }
}