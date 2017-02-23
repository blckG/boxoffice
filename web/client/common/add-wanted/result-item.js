import React, {Component, PropTypes} from 'react';

import style from './add-wanted.css';

class ResultItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.movie.id);
  }

  render() {
    const movie = this.props.movie;

    const img = movie.poster_path ?
      (<img className={style.img} src={`http://image.tmdb.org/t/p/w154/${movie.poster_path}`}/>) :
      (<div className={style.img}/>);
    return (
      <div onClick={this.handleClick} className={style.result_item}>
        {img}
        <div className={style.text_container}>
          <span className={style.title}>{movie.title}</span>
          <span className={style.year}>{movie.release_date.slice(0, 4)}</span>
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
