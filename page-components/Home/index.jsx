import { Spacer } from '@/components/Layout';
import styles from './Home.module.css';
import Poster from './Poster';

export const Home = () => {
  return (
    <div className={styles.root}>
      <Spacer size={1} axis="vertical" />
      <Poster /> 
    </div>
  );
};
