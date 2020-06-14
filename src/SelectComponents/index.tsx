import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const App: React.FC = () => {

  return (
    <div className={styles.container}>
      <div className={styles.btnGroup}>
        <Link to="/watermark">
          <div className={`${styles.btn} ${styles.transition}`}>水印</div>
        </Link>
        <Link to="/intersectionObserverPage">
          <div className={`${styles.btn} ${styles.shiny}`}>IntersectionObserver</div>
        </Link>
        <Link to="/anchorPoint">
          <div className={`${styles.btn} ${styles.translate}`}>
            <span>锚点</span>
          </div>
        </Link>
        <Link to="/loopPlayback">
          <div className={`${styles.btn} ${styles.extend}`}>
            <div className={styles.anim} />
            <span>循环播放</span>
          </div>
        </Link>
        <div className={`${styles.btn} ${styles.loop}`}>
          <span>按钮5</span>
          <div className={styles.dot} />
        </div>
        <div className={`${styles.btn} ${styles.gradient} ${styles.gradientOne}`}>按钮6</div>
        <div className={`${styles.btn} ${styles.gradient} ${styles.gradientTwo}`}>按钮7</div>
        <div className={`${styles.btn} ${styles.gradient} ${styles.gradientThree}`}>按钮8</div>
        <div className={`${styles.btn} ${styles.gradient} ${styles.gradientFour}`}>按钮9</div>
        <div className={`${styles.btn} ${styles.gradient} ${styles.gradientFive}`}>按钮10</div>

        <div className={`${styles.btn} ${styles.render} ${styles.renderTop}`}>按钮11</div>
        <div className={`${styles.btn} ${styles.render} ${styles.renderLeft}`}>按钮12</div>
        <div className={`${styles.btn} ${styles.render} ${styles.renderIn}`}>按钮13</div>
        <div className={`${styles.btn} ${styles.render} ${styles.renderOut}`}>按钮14</div>
        <div className={`${styles.btn} ${styles.render} ${styles.renderSkew}`}>按钮15</div>

        <div className={`${styles.btn} ${styles.atom} ${styles.atomOne}`}>按钮16</div>
        <div className={`${styles.btn} ${styles.atom} ${styles.atomTwo}`}>按钮17</div>
        <div className={`${styles.btn} ${styles.atom} ${styles.atomThree}`}>按钮18</div>
        <div className={`${styles.btn} ${styles.atom} ${styles.atomFour}`}>按钮19</div>
        <div className={`${styles.btn} ${styles.atom} ${styles.atomFive}`}>按钮20</div>

        <div className={`${styles.btn} ${styles.press}`}>按钮21</div>

      </div>
    </div>
  );
}

export default App;
