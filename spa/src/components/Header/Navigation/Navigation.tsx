import './Navigation.css'

export const Navigation = () => {
  return (
    <header className="main-header">
      <div className="main-banner">
        <h1>PechauerPlace</h1>
      </div>
      <nav className="main-nav">
        <div>
          <button className="toggle-button">
            <span className="toggle-button__bar"></span>
            <span className="toggle-button__bar"></span>
            <span className="toggle-button__bar"></span>
          </button>
        </div>
        <ul className="main-nav__items">
          <li className="main-nav__item">
            <a href="packages/index.html">Weather</a>
          </li>
          <li className="main-nav__item main-nav__item--cta">
            <a href="start-hosting/index.html">Login/Signup</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}