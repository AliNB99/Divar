import React, { useEffect, useRef, useState } from "react";
// Change English to Farsi
import { e2p } from "utils/number";
// styles
import styles from "./CheckOtpForm.module.css";
// toast alert
import toast from "react-hot-toast";
// loader inside the button
import { ThreeDots } from "react-loader-spinner";
//api
import { checkOtp } from "services/auth";
// for set token in cookie
import { setCookie } from "utils/cookies";
// show context
import { useShowContext } from "src/context/ShowContextProvider";
// icons
import { RxCross2 } from "react-icons/rx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile } from "src/services/user";

function CheckOtpForm({ mobile, code, setCode, setStep, setIsAuthShow }) {
  // isLoading for button effect
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();
  const { refetch } = useQuery(["profile"], getProfile);

  // show form handler
  const { dispatch } = useShowContext();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (code.length !== 5) {
      return toast.error("کد را به درستی وارد");
    }
    setIsLoading(true);
    const { response, error } = await checkOtp(mobile, code);

    if (!response && !error) {
      setIsLoading(false);
      inputRef.current.focus();
      return toast.error("کد وارد شده صحیح نمی باشد");
    }

    if (response?.status === 200) {
      setIsLoading(false);
      setCode("");
      setCookie(response.data);
      dispatch({ type: "SHOW_FORM" });
      refetch();

      return toast.success("شما با موفقیت وارد شدید.");
    }

    if (error?.response.status === 404) {
      setIsLoading(false);
      return toast.error(error.message);
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.headerContent}>
        <h3>ورود به حساب کاربری</h3>
        <button
          className={styles.exitBtn}
          type="button"
          onClick={() => dispatch({ type: "SHOW_FORM" })}
        >
          <RxCross2 />
        </button>
      </div>
      <div className={styles.mainContent}>
        <h4>کد تایید را وارد کنید</h4>
        <p>کد پیامک شده به شماره «{e2p(mobile.toString())}» را وارد نمایید</p>
        <input
          ref={inputRef}
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
