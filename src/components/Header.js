import React from "react";

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
          <div className="title">
            <h1>Machine</h1>
            <h1 className="grey">Ghost</h1>
            <h1>Go</h1>
          </div>
        </div>
        <div className="container is-fluid">
          <div className="social-links">
            {!socialLinks
              ? null
              : socialLinks.map(({ icon, url }) => (
                  <a className="social-link" href={url}>
                    <span class="icon">
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
