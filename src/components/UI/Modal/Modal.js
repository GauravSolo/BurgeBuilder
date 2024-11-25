import React from 'react';
import Auxs from '../../../hoc/Auxs';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const Modal = React.memo( props => {
    console.log("Modal is rendering");
    return (
        <Auxs>
            <Backdrop 
            show={props.show}
            clicked={props.modalClosed} />
            <div className={classes.Modal} style={{
                    transform : props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity : props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Auxs>
    );
},
    (prevProps, nextProps) => {
        console.log(prevProps, nextProps);
        return prevProps.show === nextProps.show && prevProps.children === nextProps.children
    }
);

export default Modal;