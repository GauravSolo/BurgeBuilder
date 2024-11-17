import Auxs from "../../hoc/Auxs";
import Button from "../UI/Button/Button";

const OrderSummary = props => {
    console.log("order summary");


    const ingredientsSummary = Object.keys(props.ingredients)
    .map(igKey =>
         <li key={igKey}
            ><span style={{'textTransform':'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li>);

    return <Auxs>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Total price : <strong>{props.price}</strong></p>
            <div style={{
                display : 'flex',
                justifyContent : 'space-between'
            }}>
            <Button type="Danger" clicked={props.cancel}>Cancel</Button>
            <Button type="Success" clicked={props.continue}>Continue</Button>
            </div>
        </Auxs>;
};

export default OrderSummary;