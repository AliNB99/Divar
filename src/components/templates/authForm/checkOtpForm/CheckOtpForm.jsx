import React from "react";
import { e2p } from "../../../../utils/number";

function CheckOtpForm({ mobile, code, setCode, setStep }) {
  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <h3>ورود به حساب کاربری</h3>
      </div>
      <div>
        <h4>کد تایید را وارد کنید</h4>
        <p>کد پیامک شده به شماره «{e2p(mobile.toString())}» را وارد نمایید</p>
        <input
          type="number"
          placeholder="کد تایید ۶ رقمی"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button onClick={() => setStep(1)}>تغییر شماره موبایل</button>
      </div>
      <div>
        <button>ورود</button>
      </div>
    </form>
  );
}

export default CheckOtpForm;
