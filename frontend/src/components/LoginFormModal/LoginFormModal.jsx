import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    if (name === 'credential') {
      setCredential(value);
    } else if (name === 'password') {
      setPassword(value);
    }

    setIsButtonDisabled(credential.length < 4 || password.length < 5);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoLogin = () => {
    return dispatch(sessionActions.login({ credential: 'Demo', password: 'password' }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };


  return (
    <div className='loginModal'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            name="credential"
            placeholder='Username or Email'
            type="text"
            value={credential}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          <input
            name='password'
            placeholder='Password'
            type="password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button className='Submit 'type="submit" disabled={isButtonDisabled}>Log In</button>
        {isButtonDisabled && credential !== "" && credential.length < 4 && (
        <p>Username or Email must be 4 characters or longer</p>
        )}

        {isButtonDisabled && password !== "" && password.length < 6 &&(
        <p>Password must be 6 characters or longer</p>
        )}

        <button className='DemoButton' type="button" onClick={handleDemoLogin}>
          Demo User
        </button>
       

      </form>
    </div>
  );
}

export default LoginFormModal;
