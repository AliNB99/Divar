import React, { useState } from "react";
import AuthForm from "../components/templates/authForm/AuthForm";

function HomePage() {
  const [isAuthShow, setIsAuthShow] = useState(true);

  return (
    <div>
      home page
      {isAuthShow && <AuthForm setIsAuthShow={setIsAuthShow} />}
    </div>
  );
}

export default HomePage;
