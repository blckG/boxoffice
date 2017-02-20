import React, {Component, PropTypes} from 'react';

import style from './add-wanted.css';

class ResultsList extends Component {

  render() {
    if (this.props.list.length === 0) {
      return null;
    }

    const items = this.props.list.slice(0, 5).map((movie, index) => {
      const img = movie.poster_path ?
        (<img className={style.img} src={`http://image.tmdb.org/t/p/w154/${movie.poster_path}`}/>) :
        (<div className={style.img}/>);
      return (
        <div key={index} className={style.result_item}>
          {img}
          <div className={style.text_container}>
            <span className={style.title}>{movie.title}</span>
            <span className={style.year}>{movie.release_date.slice(0, 4)}</span>
          </div>
        </div>
      );
    });

    return (
      <div className={style.results}>
        {items}
      </div>
    );
  }

}

ResultsList.propTypes = {
  list: PropTypes.array.isRequired
};

export default ResultsList;
