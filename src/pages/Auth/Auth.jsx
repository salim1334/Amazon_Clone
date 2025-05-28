import React, { useState } from 'react';
import styles from './Auth.module.css';
import logo from '../../assets/amazon_dark_logo.png';
import { IoEyeOffOutline } from 'react-icons/io5';
import { IoEyeOutline } from 'react-icons/io5';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      <div className={styles.logo}>
        <img src={logo} alt="Amazon Logo" />
      </div>

      <div className={styles.authBox}>
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

          <button type="submit" className={styles.submitBtn}>
            {isLogin ? 'Sign in' : 'Create your Amazon account'}
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
