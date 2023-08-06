import './Navigation_Mobile.css'

export const NavigationMobile = () => {
  return (
    <nav className="mobile-nav">
      <ul className="mobile-nav__items">
        <li className="mobile-nav__item mobile-nav__item--cta">
          <a href="start-hosting/index.html">Login/Signup</a>
        </li>
        <li className="mobile-nav__item">
          <a href="packages/index.html">Weather</a>
        </li>
      </ul>
    </nav>
  )
}