import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSpot from "./DeleteSpotsModal";

const SpotsList = ({ spots, setRefreshSpots}) => {
    const [showMenu, setShowMenu] = useState(false);(false);
    const spotList = spots.Spots || [];
    const navigate = useNavigate();

    const handleUpdateSpotClick = (spotId) => {
        navigate(`/spots/new`, { state: { spotId } });
    }

    const handleSpotDelete = () => {
        setRefreshSpots((prev) => !prev);
    };

    useEffect(() => {
        if (!showMenu) return;  
        document.addEventListener('click', closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    
    const closeMenu = () => setShowMenu(false);
  
    return (
        <div className="spotList">
            {spotList.map((spot) => {
            let stars = spot.avgRating < 1 ? 'New' : parseFloat(spot.avgRating).toFixed(1);
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
                        <button className="logInButtons" onClick={()=> handleUpdateSpotClick(spot.id)}>Update</button>
                        <OpenModalMenuItem
                        class='openModal'
                        itemText="DELETE"
                        onItemClick={closeMenu}
                        modalComponent={<DeleteSpot spotId={spot.id } onSpotDelete={handleSpotDelete} />}
                    />
                    </div>
                </div>
            );
            })}
        </div>
        );
};

const ManageSpots =() =>{
    const [spots, setSpots] = useState([]);
    const [refreshSpots, setRefreshSpots] = useState(false);
    
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
    }, [refreshSpots])

    return (<>
    <h1>Manage Spots</h1>
        <SpotsList spots={spots} refreshSpots={refreshSpots} setRefreshSpots={setRefreshSpots}/>
        {spots.Spots && !spots.Spots.length &&(<button><NavLink to='/spots/new'>Create New Spot</NavLink></button>)}
    </>)

}


export default ManageSpots;
