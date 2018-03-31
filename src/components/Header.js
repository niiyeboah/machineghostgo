import React from "react";
import Link from "gatsby-link";

export default ({ profilePic, socialLinks, backgroundPic }) => {
  const bg = backgroundPic ? { backgroundImage: `url(${backgroundPic})` } : null;
  return (
    <div>
      <div className="bg img" style={bg} />
      <div className="bg gradient" />
      <header>
        <div className="container is-fluid is-clearfix">
          <figure className="image profile">
            <img src={profilePic} />
          </figure>
        </div>
        <div className="container is-fluid">
          <div className="title link">
            <Link to="/">
              <h1>Machine</h1>
              <h1 className="grey">Ghost</h1>
              <h1>Go</h1>
            </Link>
          </div>
        </div>
        <div className="container is-fluid">
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
