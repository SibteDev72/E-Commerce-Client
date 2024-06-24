import React from 'react'
import "./CartPage.scss";
import CloseIcon from '@mui/icons-material/Close';
import { useStore } from "../../store/cart-store";


function CartPage() {
    
    const { cart, cartItemsTotal, updateCartItem, deleteCartItem} = useStore((state) => ({
        cart: state.cart,
        cartItemsTotal: state.cartItemsTotal,
        updateCartItem: state.updateCartItem,
        deleteCartItem: state.deleteCartItem,
    }))

    function quantityHandler(itemIndex, type){
        const price = cart[itemIndex].ProductPrice / cart[itemIndex].ProductQuantity;
        const quantity = cart[itemIndex].ProductQuantity;
        if(type === 'decrement' && cart[itemIndex].ProductQuantity > 1){
            const updatedQuantity = quantity - 1;
            const updatedPrice = price * updatedQuantity;
            updateCartItem(itemIndex, { ProductQuantity: updatedQuantity, ProductPrice: updatedPrice })
        }
        else if(type === 'increment' && cart[itemIndex].ProductQuantity < cart[itemIndex].ProductStock){
            const updatedQuantity = quantity + 1;
            const updatedPrice = price * updatedQuantity;
            updateCartItem(itemIndex, { ProductQuantity: updatedQuantity, ProductPrice: updatedPrice })
        }
    }
    
  return ( 
    <div className='cartPage'>
        <div className='CartPageDetails'>
            <table className='table'>
                <thead>
                    <tr>
                        <th className='Product'>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((ProductData, index) => (
                            <tr key={index}>
                                <td className='artical_Details'>
                                    <CloseIcon className='deleteBTN' onClick = {() => deleteCartItem(index)}/>
                                    <img className='cartImage' src = {ProductData.ProductImageURL} />
                                    <div className='NS-DIV'>
                                        <p>{ProductData.Artical}</p>
                                        <p>Size: {ProductData.ProductSize}</p>
                                    </div>
                                </td>
                                <td>Rs, {ProductData.ProductPrice / ProductData.ProductQuantity}</td>
                                <td className='ProductQuan'>
                                    <p className='Dec_BTN' onClick={() => quantityHandler(index, 'decrement')}>⎯</p>
                                    <p>{ProductData.ProductQuantity}</p>
                                    <p className='Inc_BTN' onClick={() => quantityHandler(index, 'increment')}>+</p>
                                </td>
                                <td className='total'>Rs, {ProductData.ProductPrice}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className='Mobile-Cart'>
                {
                    cart.map((ProductData, index) => (
                        <div key={index} className='Mobile-Data-Div'>
                            <img className='cartImageM' src = {ProductData.ProductImageURL} />
                            <div className='NS-DIVM'>
                                <p>{ProductData.Artical}</p>
                                <p>Quantity:</p>
                                <p>Subtotal: <b>Rs, {ProductData.ProductPrice}</b></p>
                                <p>Size: {ProductData.ProductSize}</p>
                            </div>
                            <div className='ProductQuanM'>
                                <p className='Dec_BTNM' onClick={() => quantityHandler(index, 'decrement')}>⎯</p>
                                <p>{ProductData.ProductQuantity}</p>
                                <p className='Inc_BTNM' onClick={() => quantityHandler(index, 'increment')}>+</p>
                            </div>
                            <CloseIcon className='deleteBTNM' onClick = {() => deleteCartItem(ProductData._id, ProductData.ProductQuantity)}/>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className='cartInvoice'>
            <p className='cart'>Cart Total</p>
            <div className='Sub-Total'>
                <p className='heading'>Subtotal</p>
                <p className='value'>Rs, {cartItemsTotal}</p>
            </div>
            <div className='Shipping'>
                <p className='heading'>Shipping</p>
                <div className='values'>
                    <p>Flat Rate</p>
                    <p className='country'>Shipping to Pakistan</p>
                </div>
            </div>
            <div className='Total'>
                <p className='heading'>Total</p>
                <p className='value'>Rs, {cartItemsTotal}</p>
            </div>
            <button onClick = {() => window.location.assign('/CustomerPage')} className='checkOut'>PROCEED TO CHECK OUT</button>
        </div>
    </div>
  )
}

export default CartPage
