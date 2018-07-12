import {Component} from 'react';
import ReactDOM from 'react-dom';

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
        const { children } = this.props;
        return ReactDOM.createPortal(children, this.ele)
    }
}