import React from 'react';
import { PulseLoader } from 'react-spinners';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderContent}>
        <PulseLoader
          color="#F59E0B"
          height={6}
          width={200}
          speedMultiplier={1}
          className={styles.loaderBar}
        />
        <p className={styles.loaderText}>Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
