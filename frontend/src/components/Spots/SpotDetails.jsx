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
        {/* {console.log('spotData:', spotData)} */}
        <h1>{spotData && spotData.spot.name}</h1>
        <p>{`${spotData && spotData.spot.city}, ${spotData && spotData.spot.state}, ${spotData && spotData.spot.country}`}</p>
        {spotData && (
        <div>
            {Array.isArray(spotData.SpotImages) ? (
                spotData.SpotImages.map((image) => (
                <img key={image.id} src={image.url} alt={image.description} />
            ))
            ) : (
            <img src={spotData.SpotImages} alt={spotData.SpotImages} />
            )}
        </div>
        )}
        <div>
            <h2>Hosted By {spotData && spotData.Owner.firstName} {spotData && spotData.Owner.lastName}</h2>
            <p>{spotData && spotData.spot.description}</p>
            <div>
                <p>${spotData && spotData.spot.price} night</p>
                <p> ⭐
                {spotData && spotData.avgRating}{' '}
                {spotData && spotData.numReviews === 0 && 'New'}
                {spotData && spotData.numReviews > 0 && (spotData.numReviews === 1 ? `•  1 Review` : `•  ${spotData.numReviews} Reviews`)}
                </p>
                <button className="reserve" onClick={() => window.alert("Feature Coming Soon...")}>Reserve</button>
            </div>
        </div>
        <hr></hr>
        <h3>
        ⭐
                {spotData && spotData.avgRating}{' '}
                {spotData && spotData.numReviews === 0 && 'New'}
                {spotData && spotData.numReviews > 0 && (spotData.numReviews === 1 ? ` •  1 Review` : ` •  ${spotData.numReviews} Reviews`)}
        </h3>
        </>
    )
}

export default SpotDetail;
