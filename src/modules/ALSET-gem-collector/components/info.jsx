import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

class Info extends Component {
  static propTypes = {
    gameId: PropTypes.number,
  };
  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
  };
  constructor(props) {
    super(props);
  }

  render() {
    var textInfo = '';
    if (this.props.gameId == 0) textInfo = 'Player vs Player';
    else if (this.props.gameId == 1) textInfo = 'Player vs Bot';
    else if (this.props.gameId == 2) textInfo = 'Bot vs Bot';
    else textInfo = 'Bot vs Custom';
    return <div className='info-wraper'>{textInfo}</div>;
  }
}
export default observer(Info);
