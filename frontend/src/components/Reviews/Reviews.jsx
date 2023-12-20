import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const Reviews = () =>{
    // console.log(useParams);
    const {spotId} = useParams();
    const [reviews, setReviews] = useState({ reviews: [] })
    
    useEffect(()=>{
        const fetchReviews = async () =>{
            const response = await fetch(`/api/spots/${spotId}/reviews`);
            const data = await response.json();

            if(response.ok){
                setReviews(data)
            }else{
                console.error(data.message)
            }
        }

        fetchReviews()

    }, [spotId])


    return (
        <div>

            {reviews && reviews.reviews.map((review)=>{
                return (
                    <div key={review.id}>
                        <h3>{review.User.firstName}</h3>
                        <p>{new Date(review.createdAt).toLocaleString('default', {
                            month: 'short',
                            year: 'numeric',
                        })}</p>
                        <p>{review.review}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Reviews;
