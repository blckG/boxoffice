import React, {Component, PropTypes} from 'react';

import style from './layout.css';

class Layout extends Component {

  render() {
    return (
      <div className={style.layout}>
        <div className={style.header}>Boxoffice</div>
        {this.props.children}
      </div>
    );
  }

}

Layout.propTypes = {
  children: PropTypes.element
};

export default Layout;
