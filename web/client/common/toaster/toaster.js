import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classnames from 'classnames';
import FA from 'font-awesome/css/font-awesome.css';

import {clearToast} from '../../actions/toaster';

import style from './toasts.css';

class Toaster extends Component {

  render() {
    const toasts = this.props.toasts.map((toast, i) => {
      const classes = classnames(style.toast, style['__' + toast.type]);
      return (
        <div key={i} className={classes}>
          <span
            className={classnames(style.badge, FA.fa, FA['fa-bell-o'], FA['fa-lg'])}
            aria-hidden="true"
            />
          <div>{toast.message}</div>
          <span
            onClick={() => this.props.clearToast(i)}
            className={classnames(style.close, FA.fa, FA['fa-times'])}
            aria-hidden="true"
            />
        </div>
      );
    });

    return (
      <div className={style.toast_container}>
        {toasts}
      </div>
    );
  }

}

Toaster.propTypes = {
  toasts: PropTypes.array,
  clearToast: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    toasts: state.toasts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({clearToast}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toaster);
