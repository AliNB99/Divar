import styles from "./Header.module.css";

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.rightContent}>
            <img src="" alt="divar-logo" />
        </div>
        <div className={styles.leftContent}>

        </div>
      </div>
    </header>
  );
}

export default Header;
