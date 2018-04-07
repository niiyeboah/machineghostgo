import React from "react";

import "./styles.scss";

export default class BackgroundImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      imageClass: "loading",
      image: props.src || null
    };
    if (props.src && typeof props.src === "object") {
      this.state.ph = props.src.base64;
    }
  }

  componentDidMount() {
    const srcObj = this.props.src;
    if (!this.state.loaded && srcObj && typeof srcObj === "object") {
      try {
        let image = new Image();
        image.src = srcObj.src;
        image.onerror = () => {
          throw new Error("Failed to load image.");
        };
        image.onload = () => {
          this.setState({
            imageClass: "success",
            image: image.src,
            loaded: true
          });
        };
      } catch (e) {
        console.error(e.message);
      }
    }
  }

  render() {
    const src = this.props.src;
    const { image, imageClass, ph } = this.state;
    const bgImg = src => (src ? { backgroundImage: `url(${src})` } : null);
    return typeof src === "string" || !src ? (
      <div className="bg img" style={bgImg(image)} />
    ) : (
      <div className="lazy-load">
        <div className={`bg ph ${imageClass}`} style={bgImg(ph)} />
        <div className={`bg img ${imageClass}`} style={bgImg(image)} />
      </div>
    );
  }
}
