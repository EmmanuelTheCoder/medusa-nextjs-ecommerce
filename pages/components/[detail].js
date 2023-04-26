import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from "styled-components";
import { medusaClient } from '../medusaclient';
import Navbar from './Navbar';


const addItem = async (cartId, product) => {
    const {cart} = await medusaClient.carts.lineItems.create(cartId, {
        variant_id: product.variants[0].id,
        quantity: 1,

    })
    localStorage.setItem('cartCount', cart.items.length)
    console.log(cart)

}



export async function getStaticPaths(){
    const res = await medusaClient.products.list()
    const paths = res.products.map(product => ({
        params: {detail: product.id.toString()}
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}){
    const id = params.detail
    const res = await fetch(`http://localhost:9000/store/products/${id}`)
    const data = await res.json()
    
    return {
        props: {
            data
        },
        revalidate: 3600
    }
}

const Detail = ({data}) => {
    const [getRegionId, setGetRegionId] = useState("");
    const [modalState, setModalState] = useState(false) 
    const {title, thumbnail, description, variants} = data.product

    useEffect(() => {
        const region = async () => {
            const res = await medusaClient.regions.list();
            setGetRegionId(res.regions[1].id)
        }

        region()
    }, [])
    
    const addToCart = async () => {
        const cartId = localStorage.getItem('cart_id');
        setModalState(true)
        if(cartId) {
            addItem(cartId, data.product)
        }else{
            const {cart} = await medusaClient.carts.create({region_id: getRegionId})
            localStorage.setItem('cart_id', cart.id)
            addItem(cart.id, data.product)
            console.log(cart)
        }
    
    }
    return (
        <div>
            <Navbar />
            <div className="modal" style={{display: modalState ? 'block' : 'none'}}>
                <div className='modal-text'>
                    <h3>Item added to cart</h3>
                    <button onClick={() => setModalState(false)}>Ok</button>

                </div>
            </div>

        <DetailContainer className="container" >
                             <div className="company">
                                 <h2>{title}</h2>
                             </div>
                             <div className="image-container">
                                 <Image src={thumbnail} alt={title} 
                                        width={200} height={200}/>
                             </div>
                             <div className="price">
                                <h2><strong>Price: </strong>${variants[0]?.prices[1]?.amount}</h2>
                    
                             </div>
                             <div className="description">
                                 <strong>Product description: </strong>
                                 <p className="product-info">
                                     {description}
                                 </p>
                             </div>
                             <div className="buttons">
                                <Link href="/">
                                    <button type="button" className="back-to-product">
                                        Back to products
                                    </button>
                                </Link> 
                                <button type="button" className="add-to-cart"
                                    onClick={addToCart}
                                    >
                                
                                    add to cart
                                    </button>
                             </div>
                         </DetailContainer>
                    </div>
                     )
    }


export default Detail;

const DetailContainer = styled.div`
    margin-top: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
        text-align: center;
    }
    .company h2{
        text-transform: capitalize;
        font-family: cursive;
        font-size: 2.1rem;
        font-weight: 400;
        color: #474747;
        
    }
    .description{
            padding-top: 1.2rem;
            p{
                font-size: 1.2rem;
            }
        strong{
            font-size: 1.4rem;
            color: #524e4f
        }
    }
    .price{
        text-align: justify;
        strong{
            color: #524e4f
        }
    }
    .buttons{
        display: block;
        margin-top: 1.4rem;
    }
    .back-to-product{
        margin-right: 2rem;
        padding: .4rem .8rem;
        border-radius: 40px;
        text-transform: capitalize;
        background: transparent;
        font-family: sans-serif;
        font-size: 1.3rem;
        color: #048286;
        border: 2px solid #048286;
        outline: none;
        &:hover{
            background: #048286;
            color: white;
        }
    }
    .add-to-cart{
        margin-right: 2rem;
        padding: .4rem .8rem;
        border-radius: 40px;
        text-transform: capitalize;
        background: transparent;
        font-family: sans-serif;
        font-size: 1.3rem;
        color: #8b7b44;
        border: 2px solid #5f8604;
        outline: none;
        &:hover{
            background: #f3c52c;
            color: black;
        }
    }
    
`
   