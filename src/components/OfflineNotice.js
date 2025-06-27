import React from "react";

const OfflineNotice = () => (
  <div className="offline-notice">
    <div className="offline-notice-icon">!</div>
    <h2 style={{ marginBottom: 12 }}>You are Offline</h2>
    <p style={{ textAlign: "center", color: "#b94a2c" }}>
      Please check your internet connection and try again.
    </p>
  </div>
);

export default OfflineNotice;
