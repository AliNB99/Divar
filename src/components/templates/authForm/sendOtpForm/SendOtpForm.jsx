import toast from "react-hot-toast";
import { sendOtp } from "../../../../services/auth";
import { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
// icons
import { RxCross2 } from "react-icons/rx";

import styles from "./SendOtpForm.module.css";
import { useShowContext } from "src/context/ShowContextProvider";

// regex for mobile validation
const regexMobile = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;

function SendOtpForm({ mobile, setMobile, setStep }) {
  // isLoading for button effect
  const [isLoading, setIsLoading] = useState(false);
  // get input element
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // show form handler
  const { dispatch } = useShowContext();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!regexMobile.test(mobile))
      return toast.error("لطفا شماره را به درستی وارد نمایید");

    setIsLoading(true);
    const { response, error } = await sendOtp(mobile);

    if (error) {
      setIsLoading(false);
      return toast.error(error.response.statusText);
    }

    if (response.status === 200) {
      toast.success("کد برای شما ارسال شد");
      setIsLoading(false);
      setStep(2);
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
        <h4>شماره موبایل خود را وارد نمایید</h4>
        <p>
          برای استفاده از امکانات دیوار، لطفاً شمارهٔ موبایل خود را وارد کنید.
          کد تأیید به این شماره پیامک خواهد شد.
        </p>
        <input
          ref={inputRef}
          type="number"
          placeholder="شماره موبایل"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <p className={styles.areaCode}>+۹۸</p>
        <p>
          <span>شرایط استفاده از خدمات</span> و <span>حریم خصوصی</span> دیوار را
          می پذیرم
        </p>
      </div>
      <div className={styles.submitBtn}>
        <button disabled={isLoading} type="submit">
          {isLoading ? (
            <ThreeDots height={30} width={30} color="#f2f2f2" />
          ) : (
            "تایید"
          )}
        </button>
      </div>
    </form>
  );
}

export default SendOtpForm;
