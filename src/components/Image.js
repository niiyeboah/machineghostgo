import React from "react";
import Img from "gatsby-image";

export default ({ src, className }) => (
  <figure className={`image ${className || null}`}>
    {typeof src === "string" ? <img src={src} /> : <Img sizes={src} />}
  </figure>
);
