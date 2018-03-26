import React from "react";

export default ({ profilePic, socialLinks }) => {
  return (
    <div>
      <div className="bg img" />
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
      </header>
    </div>
  );
};
