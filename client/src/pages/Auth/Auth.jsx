import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../../firebase/firebase';
import { useContext, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { DataContext } from '../../components/Context/Context';
import { Type } from '../../Utility/action.type';
import { ClipLoader } from 'react-spinners';
import styles from './Auth.module.css';
import logo from '../../assets/amazon_dark_logo.png';
import { IoEyeOffOutline } from 'react-icons/io5';
import { IoEyeOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [_, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  
  const redirect = navStateData?.state?.redirect || '/';
  const msg = navStateData?.state?.msg;

  async function authHandler(e) {
    e.preventDefault();

    if (e.target.name === 'signin') {
      try {
        setIsLoading({ ...isLoading, signIn: true });
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
        navigate(redirect);
        setIsLoading({ ...isLoading, signIn: false });
      } catch (err) {
        console.error(err);
        setIsLoading({ ...isLoading, signIn: false });
        toast.error(err.code.split('/')[1].split('-').join(' '));
      }
    } else {
      try {
        setIsLoading({ ...isLoading, signUp: true });

        // 1. Create user
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // 2. Update profile with the displayName (user's name)
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // 3. Dispatch to context
        dispatch({
          type: Type.SET_USER,
          user: { ...userInfo.user, displayName: name },
        });

        // 4. Reset loading state and redirect
        navigate(redirect);
        setIsLoading({ ...isLoading, signUp: false });
      } catch (err) {
        console.error(err);
        setIsLoading({ ...isLoading, signUp: false });
        toast.error(err.code.split('/')[1].split('-').join(' '));
      }
    }
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log({
      email,
      name: isLogin ? undefined : name,
      password,
    });
  };

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Amazon Logo" />
      </Link>

      <div className={styles.authBox}>
        {msg && (
          <p
            style={{
              padding: '5px',
              textAlign: 'center',
              color: 'red',
              fontWeight: 'bold',
            }}
          >
            {msg}
          </p>
        )}
        <h1>{isLogin ? 'Sign in' : 'Create account'}</h1>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email or mobile phone number</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordInput}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <button
                type="button"
                className={styles.showPasswordBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoEyeOutline size={25} />
                ) : (
                  <IoEyeOffOutline size={25} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            name={isLogin ? 'signin' : 'signup'}
            className={styles.submitBtn}
            onClick={authHandler}
          >
            {isLoading.signIn ? (
              <ClipLoader color="#000" size={15} />
            ) : isLogin ? (
              'Sign in'
            ) : (
              'Create your Amazon account'
            )}
          </button>
        </form>

        <div className={styles.terms}>
          By continuing, you agree to Amazon's <a href="#">Conditions of Use</a>{' '}
          and <a href="#">Privacy Notice</a>.
        </div>

        <div className={styles.divider}>
          <span>New to Amazon?</span>
        </div>

        <button onClick={toggleAuthMode} className={styles.toggleAuthBtn}>
          {isLogin ? 'Create your Amazon account' : 'Sign in to your account'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
