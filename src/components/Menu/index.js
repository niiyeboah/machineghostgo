import React from "react";
import Link from "gatsby-link";
import { HamburgerButton } from "react-hamburger-button";

import "./styles.scss";

export default class Menu extends React.Component {
  getClass(open) {
    return open ? "menu-visible" : null;
  }

  render() {
    const { menuBackgroundPic, socialLinks, menuVisible, toggleMenu } = this.props;
    const bg = menuBackgroundPic ? { backgroundImage: menuBackgroundPic } : null;
    const navLinks = [
      {
        name: "Home",
        icon: "fas fa-home",
        url: "/"
      },
      {
        name: "About",
        icon: "fas fa-info-circle",
        url: "/about/"
      }
    ];
    return (
      <div className="menu">
        <div className="menu-button" onClick={toggleMenu}>
          <HamburgerButton
            open={menuVisible}
            width={25}
            height={18}
            strokeWidth={3}
            color="#555"
            animationDuration={0.5}
          />
        </div>
        <div className={`overlay ${this.getClass(menuVisible)}`}>
          <div className="bg img" style={bg} />
          <nav>
            <ul>
              {!navLinks
                ? null
                : navLinks.map(({ name, icon, url }, i) => (
                    <li key={i}>
                      <span>
                        <Link to={url} className="link" onClick={toggleMenu}>
                          {name}
                        </Link>
                      </span>
                    </li>
                  ))}
            </ul>
            <hr />
            <ul className="social-links">
              {!socialLinks
                ? null
                : socialLinks.map(({ name, icon, url }, i) => (
                    <li key={i}>
                      <span className="social-link icon">
                        <i className={icon} />
                      </span>
                      <span>
                        <a href={url} className="link">
                          {name}
                        </a>
                      </span>
                    </li>
                  ))}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
