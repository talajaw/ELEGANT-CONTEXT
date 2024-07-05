import { createContext ,  useReducer} from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";
export const CartContext = createContext({
    item: [],
    addItemToCart : () => {},
    updateItemQuantity : () => {},
  });
// get the latest state here as a first argument
function shoppingCartReducer(state , action){
    if(action.type === 'ADD-ITEM'){
        const updatedItems = [...state.items];
    
        const existingCartItemIndex = updatedItems.findIndex(
          (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];
  
        if (existingCartItem) {
          const updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity + 1,
          };
          updatedItems[existingCartItemIndex] = updatedItem;
        } else {
          const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
          updatedItems.push({
            id: action.payload,
            name: product.title,
            price: product.price,
            quantity: 1,
          });
        }



        return{
            ...state,  //copy the old state first for don't lose any other value
            items: updatedItems,  //and then we just update the one value in our state that is updating when this action here occurs
        };
    }

    if(action.type === 'UPDATE-ITEM') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
          (item) => item.id === action.payload.productId
        );
  
        const updatedItem = {
          ...updatedItems[updatedItemIndex],
        };
  
        updatedItem.quantity += action.payload.amount;
  
        if (updatedItem.quantity <= 0) {
          updatedItems.splice(updatedItemIndex, 1);
        } else {
          updatedItems[updatedItemIndex] = updatedItem;
        }
  
        return {
            ...state,
          items: updatedItems,
        };

    }
    
    
    return state;
}//write outside the component func cause this func should not be recreated whenever the component func executes because it also won't need direct access to any value defined or updated in the component func   
export default function CartContextProvider({children}) {
    const [shoppingCartState , shoppingCartDispatch] = useReducer(shoppingCartReducer , {  items: [], } ); // second argument is a initail value for a state used if a state has never been updated yet.


    //manage a state here including all this func that added to the state & the context values..transform from app component to here.
    // const [shoppingCart, setShoppingCart] = useState({
    //     items: [],
    //   });
    
      function handleAddItemToCart(id) {
        shoppingCartDispatch({
            type: 'ADD-ITEM',
            payload: id,
        });
        //inside it is an action can use a string/number/object



        // setShoppingCart((prevShoppingCart) => {
        
    
        //   return {
        //     items: updatedItems,
        //   };
        // });
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {

        shoppingCartDispatch({
            type: 'UPDATE-ITEM',
            payload : {
                productId,
                amount,
            }
        });
        
      }
    
      const ctxValue ={
        items : shoppingCartState.items,  //provide values can be read
        addItemToCart : handleAddItemToCart ,   //values funcs can be called
        updateItemQuantity : handleUpdateCartItemQuantity, 
      };



      return(
        <CartContext.Provider value={ctxValue}>
        {children}
        </CartContext.Provider>

      );
      
   }