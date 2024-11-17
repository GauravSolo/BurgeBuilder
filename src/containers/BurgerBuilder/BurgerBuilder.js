import Auxs from "../../hoc/Auxs";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import { useEffect, useState } from "react";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";


const INGREDIENTS_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
}


const BurgerBuilder = props => {
    const [ingredients, setIngredients] = useState({
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat : 0
    });
    const [price, setPrice] = useState(Object.keys(ingredients).reduce((sum,type)=>sum+ingredients[type]*INGREDIENTS_PRICES[type],0));
    const [purchasable, setPurchasable] = useState(false);
    const [purchasing, setPurchasing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        axios.get('/order/-OBw3_pA_Pmffi_NOPxk.json')
            .then(response => {
                console.log(response)
                setIngredients({...response.data.ingredients}); 
                setPrice(response.data.price);
                setPurchasable(true);
            })
            .catch(error => {
                console.error('Error fetching ingredients:', error);
            });
    },[]);

    const addIngredients = (type) =>{
            
            setPrice((prevPrice) =>{
                setPurchasable(Number((prevPrice + INGREDIENTS_PRICES[type]).toFixed(2))>0);
                return Number((prevPrice + INGREDIENTS_PRICES[type]).toFixed(2));
            }); 
            setIngredients((prevIngredients)=>({
                ...prevIngredients,
                [type] : prevIngredients[type] + 1
            }));
    }

    const removeIngredients = (type) =>{
            if(ingredients[type] <= 0) return;
            setPrice((prevPrice) =>{
                setPurchasable(Number((prevPrice - INGREDIENTS_PRICES[type]).toFixed(2))>0);
                return Number((prevPrice - INGREDIENTS_PRICES[type]).toFixed(2));
            });
            setIngredients((prevIngredients)=>({
                ...prevIngredients,
                [type] : prevIngredients[type] - 1
            }));
    }

    const purchaseHandler = () => {
        setPurchasing(true);
    }
    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        console.log("You Continue");
        setLoading(true);
        const order = {
            ingredients : ingredients,
            price : price,
            customer : {
                name  : 'Gaurav Sharma',
                email : 'gauravsharma9339@gmail.com',
                address : {
                    street : 'Krishna Vihar',
                    country : 'India'
                }
            }
        }
        axios.post('/order.json',order)
            .then(response => {
                setLoading(false);
                setPurchasing(false);
                console.log(response);
            })
            .catch(error => {
                setLoading(false);
                setPurchasing(false);
                console.log(error);
            });
    }
    

    

    const disabledInfo = Object.keys({...ingredients}).reduce((acc, igKey) =>{
        acc[igKey] = ingredients[igKey] <= 0;
        return acc;
    },{});

    let orderSummary = <OrderSummary 
                                price={price} 
                                ingredients={ingredients} 
                                cancel={purchaseCancelHandler} 
                                continue={purchaseContinueHandler}/>;
    if(loading){
        orderSummary = <Spinner/>
    }

    return <Auxs>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={ingredients}/>
                <BuildControls 
                    price={price}
                    add={addIngredients} 
                    remove={removeIngredients}
                    disabled={disabledInfo}
                    purchasable={purchasable}
                    ordered={purchaseHandler} />
            </Auxs>;
} 

export default BurgerBuilder;