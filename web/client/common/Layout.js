import React, {Component, PropTypes} from 'react';

import Toaster from './toaster/toaster';

import style from './layout.css';

class Layout extends Component {

  render() {
    return (
      <div className={style.layout}>
        <div className={style.header}>Boxoffice</div>
        {this.props.children}
        <Toaster/>
      </div>
    );
  }

}

Layout.propTypes = {
  children: PropTypes.element
};

export default Layout;
