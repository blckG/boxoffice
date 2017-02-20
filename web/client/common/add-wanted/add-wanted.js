/* global fetch */

import React, {Component} from 'react';
import classnames from 'classnames';
import FA from 'font-awesome/css/font-awesome.css';

import ResultsList from './results';

import style from './add-wanted.css';

class AddWanted extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      results: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({searchQuery: e.target.value}, () => {
      if (this.state.searchQuery.length >= 2) {
        this.getPossibleMovies(this.state.searchQuery);
      } else {
        this.setState({results: []});
      }
    });
  }

  getPossibleMovies(q) {
    const API_KEY = '17c5a1d1fe283613b578056b9ee0b521';
    fetch(`http://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${q}`)
      .then(res => res.json())
      .then(json => {
        this.setState({results: json.results});
      });
  }

  render() {
    return (
      <div className={style.add_wanted}>
        <div className={style.input_group}>
          <input
            value={this.state.searchQuery}
            placeholder="Search to add new movies!"
            onChange={this.handleChange}
            className={classnames(style.search, {
              [style.__active]: this.state.searchQuery
            })}
            />
          <span className={classnames(style.icon, FA.fa, FA['fa-times'], FA['fa-2x'])} aria-hidden="true"/>
        </div>
        <ResultsList list={this.state.results}/>
      </div>
    );
  }

}

export default AddWanted;
