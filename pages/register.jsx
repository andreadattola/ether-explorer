import { Registration } from "../components/Registration";
import * as styles from "../styles/UserAuth.module.css";

const Register = () => {
  return (
    <div className="container">
      <div className={styles.loginCard}>
        <div className={styles.leftSideLoginCard}>
          <p className={styles.leftSideLoginCardTitle}>Welcome</p>
          <p className={styles.leftSideLoginCardText}>Entra sei il benvenuto</p>
          <li className={styles.liLoginCard,styles.leftSideLoginCardText}>Create a ...</li>
          <li className={styles.liLoginCard,styles.leftSideLoginCardText}>Create a ...</li>
          <li className={styles.liLoginCard, styles.leftSideLoginCardText}>Create a ...</li>
        </div>
        <div className={styles.RightSideLoginCard}>
        <Registration />
        </div>
      </div>
    </div>
  );
};
export default Register;
