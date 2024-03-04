import React, { useState } from "react";
// Change English to Farsi
import { e2p } from "../../../../utils/number";
// styles
import styles from "./CheckOtpForm.module.css";
// toast alert
import toast from "react-hot-toast";
// loader inside the button
import { ThreeDots } from "react-loader-spinner";
//api
import { checkOtp } from "../../../../services/auth";

import { setCookie } from "../../../../utils/cookies";

function CheckOtpForm({ mobile, code, setCode, setStep, setIsAuthShow }) {
  // isLoading for button effect
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (code.length !== 5) {
      return toast.error("کد را به درستی وارد");
    }

    setIsLoading(true);
    const { response, error } = await checkOtp(mobile, code);

    if (response?.status === 200) {
      setIsLoading(false);
      setCode("");
      console.log(response.data);
      setCookie(response.data);
      return toast.success("شما با موفقیت وارد شدید.");
    }

    if (error?.response.status === 401) {
      setIsLoading(false);
      return toast.error("کد تایید صحیح نمی باشد.");
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.headerContent}>
        <h3>ورود به حساب کاربری</h3>
      </div>
      <div className={styles.mainContent}>
        <h4>کد تایید را وارد کنید</h4>
        <p>کد پیامک شده به شماره «{e2p(mobile.toString())}» را وارد نمایید</p>
        <input
          type="number"
          placeholder="کد تایید ۶ رقمی"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div className={styles.ChangeMobileBtn}>
          <button type="button" onClick={() => setStep(1)}>
            تغییر شماره موبایل
          </button>
        </div>
      </div>
      <div className={styles.submitBtn}>
        <button type="submit">
          {isLoading ? (
            <ThreeDots height={30} width={30} color="#f2f2f2" />
          ) : (
            "ورود"
          )}
        </button>
      </div>
    </form>
  );
}

export default CheckOtpForm;
