import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as WantedActions from '../../actions/wanted';

import ProgressBar from '../../common/progress-bar/progress-bar';
import AddWanted from '../../common/add-wanted/add-wanted';

import style from './wanted.css';

class Wanted extends Component {
  constructor(props) {
    super(props);

    this.props.getWanted();
  }

  componentDidMount() {
    const intervalId = setInterval(() => {
      this.props.getWanted();
    }, 3000);
    this.setState({intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const wanted = this.props.wanted.map((movie, index) => {
      return (
        <div key={index} className={style.wanted_item}>
          <span className={style.movie}>{movie.title}</span>
          <span className={style.quality}>{movie.quality}</span>
          <span className={style.size}>{movie.torrent ? movie.torrent.size : ''}</span>
          <div className={style.status}>
            {
              movie.torrentStatus ?
              (<ProgressBar
                current={movie.torrentStatus.total_done}
                total={movie.torrentStatus.total_wanted}
                bgColor="#C4C4C4"
                fgColor="#2D9CDB"
                completeColor="#27AE60"
                />) :
              'queued'
            }
          </div>
        </div>
      );
    });

    return (
      <div>
        <AddWanted/>
        <div className={style.wanted}>
          <div className={style.wanted_header}>
            <span className={style.movie}>Movie</span>
            <span className={style.quality}>Quality</span>
            <span className={style.size}>Size</span>
            <span className={style.status}>Status</span>
          </div>
          <div>
            {wanted}
          </div>
        </div>
      </div>
    );
  }

}

Wanted.propTypes = {
  wanted: PropTypes.array.isRequired,
  getWanted: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    wanted: state.wanted
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({...WantedActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wanted);
