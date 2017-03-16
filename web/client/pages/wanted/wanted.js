import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classnames from 'classnames';
import FA from 'font-awesome/css/font-awesome.css';
import * as WantedActions from '../../actions/wanted';
import * as socket from '../../lib/socket';

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
      // poll the server for the list of wanted movies
      socket.getAllWanted((err, data) => {
        if (!err) {
          this.props.dispatch(WantedActions.wanted(data));
        }
      });
    }, 1000);
    this.setState({intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  handleClick(imdbId) {
    // TODO: create custom confirmation modal
    this.props.removeWanted(imdbId, confirm('Remove torrent data?'));
  }

  render() {
    const wanted = this.props.wantedList.map((movie, index) => {
      return (
        <div key={index} className={style.wanted_item}>
          <span className={style.movie}><a href={`http://imdb.com/title/${movie.imdbId}/reference`}>{movie.title}</a></span>
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
          <span
            onClick={this.handleClick.bind(this, movie.imdbId)}
            className={classnames(style.icon, FA.fa, FA['fa-times'], FA['fa-2x'])}
            aria-hidden="true"
            />
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
  wantedList: PropTypes.array.isRequired,
  getWanted: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    wantedList: state.wanted
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({...WantedActions}, dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wanted);
