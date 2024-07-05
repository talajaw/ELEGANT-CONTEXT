//import { useState } from 'react';

import CartContextProvider from './store/shopping-cart-context.jsx';

import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import Product from './components/Product.jsx';

function App() {


  return (
    //Link context to state
    <CartContextProvider >  
      <Header
        // cart={shoppingCart}
        // onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id} className="hover:scale-105 ">
            <Product {...product}  />   {/* //onAddToCart={handleAddItemToCart} */}
          </li>
        ))}
      </Shop> 
    </CartContextProvider>
  );
}

export default App;
