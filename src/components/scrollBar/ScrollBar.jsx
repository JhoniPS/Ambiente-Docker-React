import styles from './ScrollBar.module.css'
import Card from '../card/Card';

const ScrollBar = () => {
  return (
    <div className={`${styles.scrollBar} ${styles.grid}`}>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
    </div>
  );
}

export default ScrollBar;