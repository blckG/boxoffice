import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SettingsActions from '../../actions/settings';

import style from './settings.css';

class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dlPath: '',
      completedPath: '',
      moviesPath: ''
    };

    this.handleReset = this.handleReset.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.handleReset();
  }

  handleReset() {
    this.props.getSettings();
  }

  handleSave() {
    this.props.saveSettings(this.state);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dlPath: nextProps.settings.dlPath,
      completedPath: nextProps.settings.completedPath,
      moviesPath: nextProps.settings.moviesPath
    });
  }

  handleChange(e) {
    // expects the target to have an ID matching the state property
    const change = {};
    change[e.target.id] = e.target.value;
    this.setState(change);
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.header}>Settings</div>
        <div className={style.input_group}>
          <label htmlFor="dlPath">Download Path</label>
          <input onChange={this.handleChange} type="text" id="dlPath" value={this.state.dlPath}/>
        </div>
        <div className={style.input_group}>
          <label htmlFor="completedPath">Completed Path</label>
          <input onChange={this.handleChange} type="text" id="completedPath" value={this.state.completedPath}/>
        </div>
        <div className={style.input_group}>
          <label htmlFor="moviesPath">Movies Path</label>
          <input onChange={this.handleChange} type="text" id="moviesPath" value={this.state.moviesPath}/>
        </div>
        <div className={style.button_group}>
          <button onClick={this.handleReset} className={style.__reset}>Reset Unsaved</button>
          <button onClick={this.handleSave} className={style.__save}>Save</button>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object,
  getSettings: PropTypes.func.isRequired,
  saveSettings: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({...SettingsActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
