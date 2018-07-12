import React, {PropTypes} from 'react';

export default class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      on: false
    };
    this.setOnState = this.setOnState.bind(this);
  }

  setOnState() {
    this.setState({
      on: !this.state.on
    });
  }

  render() {
    let { on } = this.state;
    return this.props.children(on, this.setOnState);
  }
}

Toggle.propTypes = {
};
