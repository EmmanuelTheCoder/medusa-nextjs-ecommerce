import {useEffect, useState} from 'react'
import Product from './Product'
import { medusaClient } from '../medusaclient';



export default function Productmenu() {


    const [allProducts, setAllProducts]= useState([])

    useEffect(() => {

        const product = async () => {
            const response = await medusaClient.products.list();
            console.log("response", response)
            setAllProducts(response.products)
        }

        product()
    },[])

   
    return (
        <div
            className="change-display"
        >
            

                  {allProducts.map(product =>(
            

                    <Product key={product.id} product={product} />
                        

                   ))}
            
        </div>
    )
}