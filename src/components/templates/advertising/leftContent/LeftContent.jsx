import styles from "./LeftContent.module.css";

import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

import notFoundImg from "src/images/not-found-image.jpg";

function LeftContent({ data }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return (
    <div className={styles.leftContent}>
      {data?.data.post.images.length ? (
        <img src={`${baseUrl}/${data?.data.post.images[0]}`} />
      ) : (
        <img src={notFoundImg} />
      )}
      <textarea placeholder="یادداشت شما..." rows={4} />
      <label htmlFor="#">
        یادداشت تنها برای شما قابل دیدن است و پس از حذف آگهی، پاک خواهد شد.
      </label>
      <div>
        <div className={styles.Feedback}>
          <p>بازخورد شما دربارهٔ این آگهی چیست؟</p>
          <div>
            <BiDislike size={20} />
            <BiLike size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftContent;
