import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const SpotsList = ({ spots }) => {
    const spotList = spots.Spots || [];
    const navigate = useNavigate();

    const handleUpdateSpotClick = (spotId) => {
        console.log(spotId)
        navigate(`/spots/new`, { state: { spotId } });
    }
  
    return (
        <div className="spotList">
            {spotList.map((spot) => {
            let stars = spot.avgRating < 1 ? 'New' : spot.avgRating;
            const images= spot.previewImage.split(',')
            return (
                <div className='card' key={spot.id}>
                    <NavLink  to={`/spot/${spot.id}`} key={spot.id} className='spotCard'>
                    <img className='image' src={images[0]} alt={`${spot.city}, ${spot.state}, ${spot.previewImage}`} />
                    <div className="spotContent">
                        <div className='header'>
                            <h3 className="location">{`${spot.city}, ${spot.state}`}</h3>
                            <p className="stars">⭐ {stars}</p>
                        </div>
                        <p className="price">{`$${spot.price} night`}</p>
                    </div>
                    </NavLink>
                    <div className="updateSpotButtons">
                        <button onClick={()=> handleUpdateSpotClick(spot.id)}>Update</button>
                        <button>Delete</button>
                    </div>
                </div>
            );
            })}
        </div>
        );
};

const ManageSpots =() =>{
    const [spots, setSpots] = useState([]);
    
    useEffect(()=>{
        const fetchSpots = async () => {
            try{
            const response = await fetch('/api/spots/current')
            const data = await response.json();
            setSpots(data);
            }
            catch (error) {
                console.error('unable to fetch spots', error)
            }
        };
    
        fetchSpots();
    }, [])

    return (<>
    <h1>Manage Spots</h1>
        <SpotsList spots={spots}/>
        {spots.Spots && !spots.Spots.length &&(<button><NavLink to='/spots/new'>Create New Spot</NavLink></button>)}
    </>)

}


export default ManageSpots;
