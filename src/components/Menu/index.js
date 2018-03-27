import React from "react";
import Link from "gatsby-link";
import { HamburgerButton } from "react-hamburger-button";

import "./styles.scss";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      open: false,
      menuVisible: null
    };
  }
  toggleMenu() {
    const { open } = this.state;
    this.setState({
      open: !open,
      menuVisible: !open ? "menu-visible" : null
    });
  }
  render() {
    const { menuVisible, open } = this.state;
    const { menuBackgroundPic, socialLinks } = this.props;
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
    console.log(socialLinks);
    return (
      <div className="menu">
        <div className="menu-button" onClick={this.toggleMenu}>
          <HamburgerButton
            open={open}
            width={25}
            height={18}
            strokeWidth={3}
            color="#555"
            animationDuration={0.5}
          />
        </div>
        <div className={`overlay ${menuVisible}`}>
          <div className="bg img" style={bg} />
          <nav>
            <ul>
              {navLinks.map(({ name, icon, url }, i) => (
                <li key={i}>
                  <span>
                    <Link to={url} className="link">
                      {name}
                    </Link>
                  </span>
                </li>
              ))}
            </ul>
            <ul className="social-links">
              {socialLinks.map(({ name, icon, url }, i) => (
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
