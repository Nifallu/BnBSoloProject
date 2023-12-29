import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { csrfFetch } from '../../store/csrf';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import ReviewModal from "./OpenModalAddReview";

import './spotDetails.css'

const SpotDetail = () => {
    const {spotId} =useParams();
    const [spotData, setSpotData] = useState(null);
    const [reviews, setReviews] = useState({ reviews: [] });
    const [showMenu, setShowMenu] = useState(false);

    const [ownerId, setOwnerId] = useState(0);

    const currentUser = useSelector(state => state.session.user);

    useEffect(()=>{
        const fetchDetails = async () => {
            const response = await fetch(`/api/spots/${spotId}`);
            const data = await response.json();

            if(response.ok) {
                setSpotData(data);
                setOwnerId(data.Owner.id);
            } else {
                console.error(data.message)
                setSpotData([]);
            }
        }

        fetchDetails()
    },[spotId, ownerId])

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
    
    
    useEffect(() => {
        if (!showMenu) return;  
        document.addEventListener('click', closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    
    const closeMenu = () => setShowMenu(false);

    const handleDelete = async (reviewId) =>{
        const response = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE'
        })
        if(response.ok){
            console.log(response.message)
        }
    }
    return (
        <>
        <div>
            <h1 className="header">{spotData && spotData.spot.name}</h1>
            <p>{`${spotData && spotData.spot.city}, ${spotData && spotData.spot.state}, ${spotData && spotData.spot.country}`}</p>
            {spotData && (
            <div className="spotImages">
                {console.log(spotData.SpotImages)}
                {Array.isArray(spotData.SpotImages) ? (
                    spotData.SpotImages.map((image) => (   
                    <img className="images" key={image.id} src={image.url} alt={image.description} />
                    ))
                ) : (
                <img src={spotData.SpotImages} alt={spotData.SpotImages} />
                )}
            </div>
            )}
            <div className="spotInfo">
                <div>
                    <h2>Hosted By {spotData && spotData.Owner.firstName} {spotData && spotData.Owner.lastName}</h2>
                    <p>{spotData && spotData.spot.description}</p>
                </div>
                <div className="spotReserve">
                    <div className="priceRating">
                        <p className="price">${spotData && spotData.spot.price} night</p>
                        <p className="rating"> ⭐
                        {spotData && parseFloat(spotData.avgRating).toFixed(1)}{' '} 
                        {spotData && spotData.numReviews === 0 && 'New'}
                        {spotData && spotData.numReviews > 0 && (spotData.numReviews === 1 ? `•  1 Review` : `•  ${spotData.numReviews} Reviews`)}
                        </p>
                    </div>
                    <button className="reserve" onClick={() => window.alert("Feature Coming Soon...")}>Reserve</button>
                </div>
            </div>
        </div>
        <hr></hr>
        <h3>⭐
                {spotData && parseFloat(spotData.avgRating).toFixed(1)}{' '}
                {spotData && spotData.numReviews === 0 && 'New'}
                {spotData && spotData.numReviews > 0 && (spotData.numReviews === 1 ? ` •  1 Review` : ` •  ${spotData.numReviews} Reviews`)}
        </h3>
        {currentUser && currentUser.id !== ownerId && reviews && (reviews.reviews.length === 0 ? (
                <OpenModalMenuItem
                class='openModal'
                itemText="Be the first to post a Review!"
                onItemClick={closeMenu}
                modalComponent={<ReviewModal spotId={spotId} />}
            />) : (
        !reviews.reviews.some((review) => review.userId === currentUser.id) && (
            <OpenModalMenuItem
                class='openModal'
                itemText="Post Your Review"
                onItemClick={closeMenu}
                modalComponent={<ReviewModal spotId={spotId} />}
            />
        )
    )
)}


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

                    {currentUser && currentUser.id === review.User.id && (
                        <button onClick={()=> handleDelete(review.id)}>DELETE</button>)}

                </div>
            )
        })}
        </div>
        </>
    )
}

export default SpotDetail;
