import React from "react";

import "./footer.scss";

export default ({}) => {
  return (
    <footer>
      <div className="developer">
        <small>
          Website by <a href="http://niiyeboah.com">Nii Yeboah</a>
        </small>
      </div>
      <div className="artist">{`Copyright © ${new Date().getFullYear()} Machine Ghost Go`} </div>
    </footer>
  );
};
