import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import style from './add-wanted.css';

class ResultItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({open: true});
  }

  handleQualitySelect(quality) {
    this.setState({open: false});
    this.props.handleClick(this.props.movie.id, quality);
  }

  render() {
    const movie = this.props.movie;

    const img = movie.poster_path ?
      (<img className={style.img} src={`http://image.tmdb.org/t/p/w154/${movie.poster_path}`}/>) :
      (<div className={style.img}/>);
    return (
      <div className={style.result_item}>
        {img}
        <div className={classnames(style.container, style.options)}>
          <div>
            <span
              className={style.quality_select}
              onClick={this.handleQualitySelect.bind(this, '720p')}
              >720p</span>
            <span
              className={style.quality_select}
              onClick={this.handleQualitySelect.bind(this, '1080p')}
              >1080p</span>
          </div>
        </div>
        <div onClick={this.handleClick} className={classnames(style.container, style.text, {[style.__open]: this.state.open})}>
          <div>
            <span className={style.title}>{movie.title}</span>
            <span className={style.year}>{movie.release_date.slice(0, 4)}</span>
          </div>
        </div>
      </div>
    );
  }

}

ResultItem.propTypes = {
  movie: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default ResultItem;
