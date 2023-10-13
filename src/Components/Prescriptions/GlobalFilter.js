import React from 'react';
import styled from 'styled-components';

export const GlobalFilter = ({filter,setFilter}) => {
    return(
        <span>
            Filter aby any data : {''}
            <Input value={filter||''} onChange={e => setFilter(e.target.value)}/>
        </span>
    )
}

const Input = styled.input`
border: none;
border: 1px solid darkgray;
    width:20rem;
  height:1rem;
  border-radius:15px;
  padding:1rem;
`;