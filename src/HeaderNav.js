import React, { useState } from 'react';

const Header = () => {
  const [stickyMenu, setStickyMenu] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleScroll = () => {
    setStickyMenu(window.pageYOffset > 20);
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <header className={`g s r vd ya cj ${stickyMenu ? 'hh sm _k dj bl ll' : ''}`}>
      <div className="bb ze ki xn 2xl:ud-px-0 oo wf yf i">
        <div className="vd to/4 tc wf yf">
          <a href="index.html">
            <img className="om" src="images/logo-light.svg" alt="Logo Light" />
            <img className="xc nm" src="images/logo-dark.svg" alt="Logo Dark" />
          </a>

          {/* Hamburger Toggle BTN */}
          <button className="po rc" onClick={() => setNavigationOpen(!navigationOpen)}>
            <span className="rc i pf re pd">
              <span className="du-block h q vd yc">
                <span className={`rc i r s eh um tg te rd eb ml jl dl ${!navigationOpen ? 'ue el' : ''}`} />
                <span className={`rc i r s eh um tg te rd eb ml jl fl ${!navigationOpen ? 'ue qr' : ''}`} />
                <span className={`rc i r s eh um tg te rd eb ml jl gl ${!navigationOpen ? 'ue hl' : ''}`} />
              </span>
              <span className="du-block h q vd yc lf">
                <span className={`rc eh um tg ml jl el h na r ve yc ${!navigationOpen ? 'sd dl' : ''}`} />
                <span className={`rc eh um tg ml jl qr h s pa vd rd ${!navigationOpen ? 'sd rr' : ''}`} />
              </span>
            </span>
          </button>
          {/* Hamburger Toggle BTN */}
        </div>

        <div className={`vd wo/4 sd qo f ho oo wf yf ${navigationOpen ? 'd hh rm sr td ud qg ug jc yh' : ''}`}>
          <nav>
            <ul className="tc _o sf yo cg ep">
              <li>
                <a href="index.html" className={`xl ${page === 'home' ? 'mk' : ''}`}>
                  Home
                </a>
              </li>
              <li>
                <a href="index.html#features" className="xl">
                  Features
                </a>
              </li>
              <li className="c i" x-data="{ dropdown: false }">
                <a
                  href="#"
                  className={`xl tc wf yf bg ${
                    page === 'blog-grid' ||
                    page === 'blog-single' ||
                    page === 'signin' ||
                    page === 'signup' ||
                    page === '404'
                      ? 'mk'
                      : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setNavigationOpen(!navigationOpen);
                  }}
                >
                  Pages
                  <svg
                    className={`${dropdown ? 'wh' : ''} th mm we fd pf`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                  </svg>
                </a>

                {/* Dropdown Start */}
                <ul className={`a ${dropdown ? 'tc' : ''}`}>
                  <li>
                    <a href="blog-grid.html" className={`xl ${page === 'blog-grid' ? 'mk' : ''}`}>
                      Blog Grid
                    </a>
                  </li>
                  <li>
                    <a href="blog-single.html" className={`xl ${page === 'blog-single' ? 'mk' : ''}`}>
                      Blog Single
                    </a>
                  </li>
                  <li>
                    <a href="signin.html" className={`xl ${page === 'signin' ? 'mk' : ''}`}>
                      Sign In
                    </a>
                  </li>
                  <li>
                    <a href="signup.html" className={`xl ${page === 'signup' ? 'mk' : ''}`}>
                      Sign Up
                    </a>
                  </li>
                  <li>
                    <a href="404.html" className={`xl ${page === '404' ? 'mk' : ''}`}>
                      404
                    </a>
                  </li>
                </ul>
                {/* Dropdown End */}
              </li>
              <li>
                <a href="index.html#support" className="xl">
                  Support
                </a>
              </li>
            </ul>
          </nav>

          <div className="tc wf ig pb no">
            <div className={`pc h io pa ra ${navigationOpen ? '!-ud-visible' : 'd'}`}>
              <label className="rc ab i">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="pf vd yc uk h r za ab"
                />
                {/* Icon Sun */}
                <svg
                  className={`th om ${page === 'home' ? 'wn' : ''} ${page === 'home' && stickyMenu ? 'xh' : ''}`}
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0908 18.6363C10.3549 18.6363 8.69 17.9467 7.46249 16.7192C6.23497 15.4916 5.54537 13.8268 5.54537 12.0908C5.54537 10.3549 6.23497 8.69 7.46249 7.46249C8.69 6.23497 10.3549 5.54537 12.0908 5.54537C13.8268 5.54537 15.4916 6.23497 16.7192 7.46249C17.9467 8.69 18.6363 10.3549 18.6363 12.0908C18.6363 13.8268 17.9467 15.4916 16.7192 16.7192C15.4916 17.9467 13.8268 18.6363 12.0908 18.6363ZM12.0908 6.59076C10.1369 6.59076 8.29376 7.36615 6.95956 8.70036C5.62535 10.0346 4.84996 11.8777 4.84996 13.8316C4.84996 15.7855 5.62535 17.6286 6.95956 18.9628C8.29376 20.297 10.1369 21.0724 12.0908 21.0724C14.0446 21.0724 15.8878 20.297 17.222 18.9628C18.5562 17.6286 19.3316 15.7855 19.3316 13.8316C19.3316 11.8777 18.5562 10.0346 17.222 8.70036C15.8878 7.36615 14.0446 6.59076 12.0908 6.59076V6.59076Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12.0909 9.77271C11.4081 9.77271 10.8635 10.3173 10.8635 10.9999V16.2499C10.8635 16.9327 11.4081 17.4772 12.0909 17.4772C12.7736 17.4772 13.3182 16.9327 13.3182 16.2499V10.9999C13.3182 10.3173 12.7736 9.77271 12.0909 9.77271Z"
                    fill="currentColor"
                  />
                </svg>
                {/* Icon Moon */}
                <svg
                  className={`th om ${page === 'home' && darkMode ? 'wn' : ''} ${page === 'home' &&
                    stickyMenu &&
                    darkMode
                      ? 'xh'
                      : ''}`}
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0908 3.29559C7.09076 3.29559 2.95447 7.43188 2.95447 12.4319C2.95447 17.4319 7.09076 21.5682 12.0908 21.5682C17.0908 21.5682 21.2271 17.4319 21.2271 12.4319C21.2271 7.43188 17.0908 3.29559 12.0908 3.29559ZM12.0908 19.8408C8.21366 19.8408 5.15952 16.7867 5.15952 12.9096C5.15952 9.03242 8.21366 5.97828 12.0908 5.97828C15.9679 5.97828 19.0221 9.03242 19.0221 12.9096C19.0221 16.7867 15.9679 19.8408 12.0908 19.8408Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12.0908 7.6133C11.2451 7.6133 10.5454 8.313 10.5454 9.15866V14.8586C10.5454 15.7043 11.2451 16.404 12.0908 16.404C12.9364 16.404 13.6361 15.7043 13.6361 14.8586V9.15866C13.6361 8.313 12.9364 7.6133 12.0908 7.6133Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12.0908 9.77265C11.4081 9.77265 10.8635 10.3172 10.8635 10.9999C10.8635 11.6827 11.4081 12.2273 12.0908 12.2273C12.7736 12.2273 13.3182 11.6827 13.3182 10.9999C13.3182 10.3172 12.7736 9.77265 12.0908 9.77265Z"
                    fill="currentColor"
                  />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
