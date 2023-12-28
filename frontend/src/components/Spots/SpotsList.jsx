import './SpotsList.css'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const SpotsList = ({ spots }) => {
    const spotList = spots.Spots || [];
  
    return (
      <div className="spotList">
        {spotList.map((spot) => {
          let stars = spot.avgRating < 1 ? 'New' : spot.avgRating;
          const images= spot.previewImage.split(',')
          console.log('images', images[0])
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
            </div>
          );
        })}
      </div>
    );
  };

  const mapStateToProps = (state) => {
    console.log('mapping state', state)
    return {
      spots: state.spotsReducer.spots,
    };
  };
  
  export default (SpotsList);
