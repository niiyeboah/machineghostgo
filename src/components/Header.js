import React from "react";
import Link from "gatsby-link";

import Image from "./Image";
import BackgroundImage from "./BackgroundImage";

export default ({ profilePic, socialLinks, backgroundPic, artPost }) => {
  const className = artPost ? "art-post-header" : "";
  return (
    <div className={`wrapper ${className}`}>
      <BackgroundImage src={backgroundPic} />
      <div className="bg gradient" />
      <header>
        <div className={`container is-fluid is-clearfix ${className}`}>
          <Image src={profilePic} className="profile" />
        </div>
        <div className="container is-fluid">
          <div className={`title link ${className}`}>
            <Link to="/">
              <h1>Machine</h1>
              <h1 className="grey">Ghost</h1>
              <h1>Go</h1>
            </Link>
          </div>
        </div>
        <div className={`container is-fluid ${className}`}>
          <div className="social-links">
            {!socialLinks
              ? null
              : socialLinks.map(({ icon, url }, i) => (
                  <a className="social-link" href={url} key={i}>
                    <span className="icon">
                      <i className={icon} />
                    </span>
                  </a>
                ))}
          </div>
        </div>
      </header>
    </div>
  );
};
