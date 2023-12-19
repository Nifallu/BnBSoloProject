import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SpotDetail = () => {
    const {spotId} =useParams();
    const[spotData, setSpotData] = useState(null);

    useEffect(()=>{
        const fetchDetails = async () => {
            const response = await fetch(`/api/spots/${spotId}`);
            const data = await response.json();

            if(response.ok) {
                setSpotData(data);
            } else {
                console.error(data.message)
                setSpotData([]);
            }
        }

        fetchDetails()
    },[spotId])

    return (
        <>
        {console.log('spotData:', spotData)}
        <h1>{spotData && spotData.spot.name}</h1>
        <p>{`${spotData && spotData.spot.city}, ${spotData && spotData.spot.state}, ${spotData && spotData.spot.country}`}</p>
        <img src={spotData && spotData.SpotImages} alt={`${spotData && spotData.SpotImages}`} />
        <div>
            <h2>Hosted By {spotData && spotData.Owner.firstName} {spotData && spotData.Owner.lastName}</h2>
            <p>{spotData && spotData.spot.description}</p>
            <div>
                <p>${spotData && spotData.spot.price}</p>
                <p>⭐ {spotData && spotData.avgRating}, {spotData && spotData.numReviews} reviews</p>
                <button className="reserve" onClick={() => window.alert("Feature Coming Soon...")}>Reserve</button>
            </div>
        </div>
        </>
    )
}

export default SpotDetail;
