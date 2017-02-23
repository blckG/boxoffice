import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toast} from '../../actions/toaster';

import ResultItem from './result-item';

import style from './add-wanted.css';

class ResultsList extends Component {
  constructor(props) {
    super(props);

    this.itemClicked = this.itemClicked.bind(this);
  }

  itemClicked(id) {
    const API_KEY = '17c5a1d1fe283613b578056b9ee0b521';
    fetch(`http://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(movie => {
        fetch('/api/wanted/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: movie.title,
            quality: '1080p',
            imdbId: movie.imdb_id
          })
        })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.props.toast(`${movie.title} added.`);
          }
        });
      });
  }

  render() {
    if (this.props.list.length === 0) {
      return null;
    }

    const items = this.props.list.slice(0, 5).map((movie, index) => {
      return <ResultItem handleClick={this.itemClicked} movie={movie} key={index}/>;
    });

    return (
      <div className={style.results}>
        {items}
      </div>
    );
  }

}

ResultsList.propTypes = {
  list: PropTypes.array.isRequired,
  toast: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({toast}, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(ResultsList);
