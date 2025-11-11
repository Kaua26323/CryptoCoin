import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.headerArea}>
      <Link to="/">
        <img className={styles.logoImg} src={logoImg} alt="Logo da empressa" />
      </Link>
    </header>
  );
}
