import React from 'react'
import Skeleton from '@mui/material/Skeleton';



export const Load = (props) =>{


return ( 
    <Skeleton variant={props.type || 'rectangular'}  />
)

}