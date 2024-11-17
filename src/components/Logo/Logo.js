import BurgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = props => (
    <div className={classes.Logo}>
        <img src={BurgerLogo}/>
    </div>
);

export default Logo;