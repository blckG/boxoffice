import React, {Component} from 'react';

import ProgressBar from '../../common/progress-bar';
import AddWanted from '../../common/add-wanted/add-wanted';

import style from './wanted.css';

class Wanted extends Component {

  render() {
    return (
      <div>
        <AddWanted/>
        <div className={style.wanted}>
          <div className={style.wanted_header}>
            <span className={style.movie}>Movie</span>
            <span className={style.quality}>Quality</span>
            <span className={style.size}>Size</span>
            <span className={style.status}>Status</span>
          </div>
          <div>
            <div className={style.wanted_item}>
              <span className={style.movie}>Moana</span>
              <span className={style.quality}>1080p</span>
              <span className={style.size}>1.42GB</span>
              <div className={style.status}>
                <ProgressBar current={100} total={100} bgColor="#C4C4C4" fgColor="#2D9CDB" completeColor="#27AE60"/>
              </div>
            </div>
            <div className={style.wanted_item}>
              <span className={style.movie}>Manchester by the Sea</span>
              <span className={style.quality}>1080p</span>
              <span className={style.size}>2.08GB</span>
              <div className={style.status}>
                <ProgressBar current={75} total={100} bgColor="#C4C4C4" fgColor="#2D9CDB" completeColor="#27AE60"/>
              </div>
            </div>
            <div className={style.wanted_item}>
              <span className={style.movie}>Moana</span>
              <span className={style.quality}>720p</span>
              <span className={style.size}>724MB</span>
              <div className={style.status}>
                <ProgressBar current={50} total={100} bgColor="#C4C4C4" fgColor="#2D9CDB" completeColor="#27AE60"/>
              </div>
            </div>
            <div className={style.wanted_item}>
              <span className={style.movie}>X-Men: Apocalypse</span>
              <span className={style.quality}>1080p</span>
              <span className={style.size}>1.42GB</span>
              <div className={style.status}>
                <ProgressBar current={25} total={100} bgColor="#C4C4C4" fgColor="#2D9CDB" completeColor="#27AE60"/>
              </div>
            </div>
            <div className={style.wanted_item}>
              <span className={style.movie}>Moana</span>
              <span className={style.quality}>1080p</span>
              <span className={style.size}>1.42GB</span>
              <div className={style.status}>
                unavailable
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Wanted;
