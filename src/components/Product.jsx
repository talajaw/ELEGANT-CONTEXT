import { CartContext } from "../store/shopping-cart-context";
import { useContext } from "react";  //this hook does kind of connect a component func to the context & make that context values available in that func
export default function Product({
  id,
  image,
  title,
  price,
  description,
 
}) {

  const {addItemToCart }= useContext(CartContext);
  return (
    <article className="product ">
      <img src={image} alt={title}  />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className='product-price'>${price}</p>
          <p>{description}</p>
        </div>
        <p className='product-actions '>
          <button  onClick={() => addItemToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
