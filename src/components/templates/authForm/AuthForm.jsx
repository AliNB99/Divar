import React, { useState } from "react";
import CheckOtpForm from "./checkOtpForm/CheckOtpForm";
import SendOtpForm from "./sendOtpForm/SendOtpForm";

import styles from "./AuthForm.module.css";

function AuthForm({ setIsAuthShow }) {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className={styles.container}>
      {step === 1 && (
        <SendOtpForm
          mobile={mobile}
          setMobile={setMobile}
          setStep={setStep}
          setIsAuthShow={setIsAuthShow}
        />
      )}
      {step === 2 && (
        <CheckOtpForm
          mobile={mobile}
          code={code}
          setCode={setCode}
          setStep={setStep}
          setIsAuthShow={setIsAuthShow}
        />
      )}
    </div>
  );
}

export default AuthForm;
