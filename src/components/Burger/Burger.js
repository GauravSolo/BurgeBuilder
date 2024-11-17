import classes from './Burger.module.css';
import BurgeIngredients from './BurgerIngredients/BurgeIngredients';

const Burger = props => {

    const transformedIngredients = Object.entries(props.ingredients)
                                    .flatMap(([igKey, qty]) =>
                                        [...Array(qty)].map((_, i) => <BurgeIngredients key={igKey + i} type={igKey} />)
                                    );

    return (
        <div className={classes.Burger}>
            <BurgeIngredients type="bread-top" />
            {transformedIngredients.length !== 0 
            ?
                transformedIngredients
            :
                "Please add something"
            }
            <BurgeIngredients type="bread-bottom" />
        </div>
    );
}

export default Burger;