import './SpotsList.css'
import { NavLink } from 'react-router-dom';

const SpotsList = ({ spots }) => {
    const spotList = spots.Spots || [];
  
    return (
      <div className="spotList">
        {spotList.map((spot) => {
          let stars = spot.avgRating < 1 ? 'New' : parseFloat(spot.avgRating).toFixed(1);
          const images= spot.previewImage.split(',')
          return (
            <div className='card' key={spot.id}>
                <NavLink  to={`/spot/${spot.id}`} key={spot.id} className='spotCard'>
                  <p className='hidden-text'>{spot.name}</p>
                <img className='image' src={images[0]} alt={`${spot.city}, ${spot.state}, ${spot.previewImage}`} />
                <div className="spotContent">
                    <div className='header'>
                        <h3 className="location">{`${spot.city}, ${spot.state}`}</h3>
                        <p className="stars">⭐ {stars}</p>
                    </div>
                    <p className="price">{`$${spot.price} night`}</p>
                </div>
                </NavLink>
            </div>
          );
        })}
      </div>
    );
  };
  
  export default (SpotsList);
