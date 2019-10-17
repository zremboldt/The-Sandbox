import React, { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [value, setValue] = useState(0);
  // useEffect runs when LoadingScreen mounts and sets opacity value to 1, revealing the screen.
  // It doesn't work to mount and set opacity at the same time, this is why useEffect is necessary.
  useEffect(() => setValue(1), []);

  return (
    <div className="loadingScreen" style={{ opacity: value }}>
      <div className="card">
        <div className="emitter">
          <div className="redDot" />
        </div>
        <h5>Loading your quote...</h5>
      </div>
    </div>
  );
};

export default LoadingScreen;
