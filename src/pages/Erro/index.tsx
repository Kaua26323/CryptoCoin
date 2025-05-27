import styles from './error.module.css';
import {Link} from 'react-router-dom';

export function Error(){
    return(
        <div className={styles.errorArea}>
            <h1 className={styles.eNumber} >404</h1>
            <h1 className={styles.eString}>Page not found!</h1>
            <Link className={styles.backHome} to='/'>Back to home</Link>
        </div>
    )
}