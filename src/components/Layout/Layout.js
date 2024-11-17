import Auxs from "../../hoc/Auxs";
import classes from  './Layout.module.css';

const Layout = (props) => {
  return (
    <Auxs>
      <main className={classes.Content}>{props.children}</main>
    </Auxs>
  );
};

export default Layout;
