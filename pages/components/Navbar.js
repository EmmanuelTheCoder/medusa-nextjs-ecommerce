import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { ButtonContainer } from './Button';

function Navbar() {
  const [cartCount, setCartCount] = useState("")

  useEffect(() =>{
        setCartCount(localStorage.getItem('cartCount'))
  }, [])
     
    return (
        <Container>

           <div className="navwrapper">
                <Link href="/">
                    <h2>Ankur's store</h2>
                </Link>
                <Link href={'/components/Cart'}>
                    <ButtonContainer>
                        My Cart <sup>{cartCount}</sup>
                    </ButtonContainer>
                </Link>
                
                
             
            </div> 

    </Container>
    )
}

export default Navbar


const Container = styled.div`
    margin-bottom: 4rem;
    .navwrapper{
        display: flex;
        justify-content: space-between;
        padding: .5rem 1rem;
        background: rgb(100,56,90);
        height: 4rem;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 2;
    }
    a{
        text-decoration: none;
    }
    h2{
        text-transform: capitalize;
        color: white;
        font-family: 'Sansita Swashed', cursive;
        font-size: 2rem;
    }
    

`