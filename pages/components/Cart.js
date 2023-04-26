import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ButtonContainer } from './Button';
import { medusaClient } from '../medusaclient';

export default function Cart() {
    const [cart, setCart] = useState([])
    const id = localStorage.getItem("cart_id");

    
    useEffect(() =>{
        async function getCart(){

            if(id) {
            await medusaClient.carts.retrieve(id)
                .then(({cart}) => setCart(cart.items))
                console.log("cart from cart.js", cart.items)
            }
        }
        getCart()
        
    },[])


    return(

        <div className="cart-flex">
            <h1>My Cart</h1>
                
    
            {cart.map(item => {
                console.log(item)
                const {title, thumbnail, subtotal, quantity, id, unit_price} = item
                return(
                    <div key={id} className="cart-div">
                      
                        <p>{title}</p>
                        <Image src={thumbnail} alt={title} 
                        width={20} height={20}/>
                        <p> unit: {quantity}</p>
                        <p>price: ${unit_price}</p>
                        <p>subtotal: ${subtotal}</p>
                    

                    </div>
                )
            })}
            <div className='return'>
                <Link href="/">
                    <ButtonContainer>Go home</ButtonContainer>
                
                </Link>
            </div>
        </div>
    )
}
