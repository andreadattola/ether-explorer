import { Login } from "../components/Login";
import * as styles from "../styles/UserAuth.module.css";

const SignIn = () => {
  return (
    <div className="container">
      <div className={styles.loginCard}>
        <div className={styles.leftSideLoginCard}>
          <p className={styles.leftSideLoginCardTitle}>Welcome</p>
          <p className={styles.leftSideLoginCardText}>Entra sei il benvenuto</p>
          <li className={styles.liLoginCard, styles.leftSideLoginCardText}>
            Create a ...
          </li>
          <li className={styles.liLoginCard, styles.leftSideLoginCardText}>
            Create a ...
          </li>
          <li className={styles.liLoginCard, styles.leftSideLoginCardText}>
            Create a ...
          </li>
        </div>
        <div className={styles.RightSideLoginCard}>
          <Login />
        </div>
      </div>
    </div>
  );
};
export default SignIn;
