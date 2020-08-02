import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styles from './App.module.scss';
import GoBackBtn from './common/GoBackBtn';
import SelectComponents from './SelectComponents';
import WaterMark from './WaterMark';
import IntersectionObserverPage from './IntersectionObserverPage';
import AnchorPoint from './AnchorPoint';
import LoopPlaybackDemo from './LoopPlaybackDemo';

const App: React.FC = () => {
  return (
    <Router>
      <div className={styles.App}>
        <div className={styles.goBackContainer}>
          <Link to="/">
            <GoBackBtn />
          </Link>
        </div>
          <div>
            <Switch>
              <Route path="/" exact component={SelectComponents} />
              <Route path="/watermark" component={WaterMark} />
              <Route path="/intersectionObserverPage" component={IntersectionObserverPage} />
              <Route path="/anchorPoint" component={AnchorPoint} />
              <Route path="/loopPlayback" component={LoopPlaybackDemo} />
            </Switch>
          </div>
      </div>
    </Router>
  );
}

export default App;
