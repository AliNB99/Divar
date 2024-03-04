import toast from "react-hot-toast";
import { sendOtp } from "../../../../services/auth";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

import styles from "./SendOtpForm.module.css";

// regex for mobile validation
const regexMobile = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;

function SendOtpForm({ mobile, setMobile, setStep, setIsAuthShow }) {
  // isLoading for button effect
  const [isLoading, setIsLoading] = useState(false);
  // console.log(setIsShowAuth);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!regexMobile.test(mobile))
      return toast.error("لطفا شماره را به درستی وارد نمایید");

    setIsLoading(true);
    const { response, error } = await sendOtp(mobile);

    if (error) {
      setIsLoading(false);
      return toast.error(error.message);
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
        <button onClick={() => setIsAuthShow((show) => !show)}>+</button>
      </div>
      <div className={styles.mainContent}>
        <h4>شماره موبایل خود را وارد نمایید</h4>
        <p>
          برای استفاده از امکانات دیوار، لطفاً شمارهٔ موبایل خود را وارد کنید.
          کد تأیید به این شماره پیامک خواهد شد.
        </p>
        <input
          type="number"
          placeholder="شماره موبایل"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
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
