import classes from './Button.module.css';

const Button = props => {
    return <button className={[classes[props.type],classes.Button].join(" ")} onClick={props.clicked}>
        {props.children}
    </button>;
};

export default Button;
