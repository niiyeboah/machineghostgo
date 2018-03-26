import React from "react";
import { HamburgerButton } from "react-hamburger-button";

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
          <div className="bg img" />
          <nav />
        </div>
      </div>
    );
  }
}
