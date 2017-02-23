import React, {Component, PropTypes} from 'react';

class ProgressBar extends Component {

  render() {
    const currentWidthPercent = (parseFloat(this.props.current) / parseFloat(this.props.total)) * 100;
    const width = this.props.width || 100;
    const height = this.props.height || 10;
    const bgStyle = {
      backgroundColor: this.props.bgColor || 'grey',
      height: `${height}px`,
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
      <div title={`${currentWidthPercent.toFixed(2)}%`} style={bgStyle}>
        <div style={fgStyle}/>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  bgColor: PropTypes.string,
  fgColor: PropTypes.string,
  completeColor: PropTypes.string,

  current: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]).isRequired,
  total: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]).isRequired,
  height: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  width: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

export default ProgressBar;
