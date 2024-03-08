import React from "react";

function Footer() {
  const style = {
    backgroundColor: "#f2f2f2",
    height: "54px",
    textAlign: "center",
    lineHeight: "54px",
    borderTop: "1px solid #f2f2f2",
    boxShadow: "0px 0px 2px #ccc",
  };
  return (
    <div style={style}>
      <h5>Developed by Ali with ❤️</h5>
    </div>
  );
}

export default Footer;
