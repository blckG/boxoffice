import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import Toaster from './toaster/toaster';

import style from './layout.css';

class Layout extends Component {

  render() {
    return (
      <div className={style.layout}>
        <div className={style.header}>
          <Link className={style.header_text} to="/">Boxoffice</Link>
          <div className={style.nav}>
            <Link to="/">Wanted</Link>
            <Link to="/settings">Settings</Link>
          </div>
        </div>
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
