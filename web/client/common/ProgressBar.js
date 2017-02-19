import React, {Component, PropTypes} from 'react';

class ProgressBar extends Component {

  render() {
    let currentWidthPercent = (parseFloat(this.props.current) / parseFloat(this.props.total)) * 100;
    let width = this.props.width || 100;
    // currentWidthPercent = width < 500 ? Math.max(5, currentWidthPercent) : currentWidthPercent;
    const bgStyle = {
      backgroundColor: this.props.bgColor || 'grey',
      height: this.props.height || '10px',
      width: `${width}px`,
      borderRadius: '15px'
    };
    const finalFgColor = (currentWidthPercent === 100 && this.props.completeColor) ?
      this.props.completeColor : this.props.fgColor;
    const fgStyle = {
      backgroundColor: finalFgColor || 'blue',
      height: 'inherit',
      width: `${Math.min(100, currentWidthPercent)}%`,
      borderRadius: '15px',
      transition: 'width 0.5s ease-in-out'
    };

    return (
      <div style={bgStyle}>
        <div style={fgStyle}></div>
      </div>
    );
  }

}

export default ProgressBar;
