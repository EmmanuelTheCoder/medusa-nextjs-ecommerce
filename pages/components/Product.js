import React from 'react';
import Link from 'next/link'
import Image from 'next/image';
import styled from 'styled-components';


export default function Product({product}) {
    
    const {id,title, thumbnail, variants} = product;

    return (
          
            <ProductWrapper> 
                            <div className="display-flex">
                                <div style={{marginTop: '6rem'}}></div>
                            <div className="products">
                                    <div className="product-name">
                                        <h2>{title}</h2>
                                    </div>
                                    
                                <Link href={`/components/${id}`}>
                                    <div className="image-container">
                                        <Image src={thumbnail} alt={title} 
                                        width={200} height={200}/>
                                    </div>
                                
                                </Link>
            
                                <div className="price-cart-container">
            
                                    <h3> $<strong>{variants[0]?.prices[1]?.amount}</strong></h3>
                                    
                                </div>
                            </div>
                            </div> 
            </ProductWrapper>

    )
}

const ProductWrapper = styled.div`
  
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
 
    .products{
        box-shadow: .5px 1px 2px 1.5px  grey;
        width: 21rem;
        transition: 1s all ease;
    }
    .image-container{
        transition: 1s all ease;
        img{
            width: 20rem;
            transition: 1s all ease;
            padding: .6rem;
        }
        text-align: center;
        &:hover img{
            transform: scale(1.1);
            /* padding: .5rem 0; */
        }
    }
  .product-name{
    background: rgb(214, 202, 202);
    text-align: center;
    font-family: 'Montserrat Alternates', sans-serif;
    height: 2.4rem;
  }
  .price-cart-container{
      display: flex;
      justify-content: space-between;
      
      h3{
          font-style: italic;
          font-size: 1.7rem;
      }
  }
  
`