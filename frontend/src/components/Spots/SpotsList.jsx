import './SpotsList.css'
import { NavLink } from 'react-router-dom';

const SpotsList = ({ spots }) => {

    const spotList = spots.Spots || [];
  
    return (
      <div className="spotList">
        {spotList.map((spot) => {
          let stars = spot.avgRating < 1 ? 'New' : spot.avgRating;
          return (
            <NavLink  to={`/spot/${spot.id}`} key={spot.id} className='spotCard'>
              <img src={spot.previewImage} alt={`${spot.city}, ${spot.state}`} />
              <div className="spotContent">
                <div className='header'>
                <h3 className="location">{`${spot.city}, ${spot.state}`}</h3>
                <p className="stars">⭐ {stars}</p>
                </div>
                <p className="price">{`$${spot.price} night`}</p>
              </div>
            </NavLink>
          );
        })}
      </div>
    );
  };
  
  export default SpotsList;
