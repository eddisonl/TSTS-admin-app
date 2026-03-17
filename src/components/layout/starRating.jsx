import React,{useState} from 'react'
import { FaStar } from 'react-icons/fa'

export default function starRate(){
    const [rating, setRating] =useState(null)
    const [rateColor, setRateColor] =useState(null)
    return(
    <>
    {[...Array(5)].map( (star, index) => {
        const currentRate = index + 1
        return (
            <>
            <label>

            <FaStar name='rate'
            value={currentRate}
            onClick={() => setRating(currentRate)}
            color={currentRate <= (rateColor || rating) ? "yellow" : "grey"}
            />
            </label>
            </> 
        )
    })}
    </>
    )
}