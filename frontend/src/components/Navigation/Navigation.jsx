
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
    <ul className='navigationBar'>
      <li>
        <NavLink className='home' exact to="/">OasisB&B</NavLink>
      </li>
      {isLoaded && (
        <li>
          {sessionUser ? <NavLink className='createSpot' to='/spots/new'>Create Spot</NavLink> : null}
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
    <hr></hr>
    </>
  );
}

export default Navigation;
