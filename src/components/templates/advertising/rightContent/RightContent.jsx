import styles from "./RightContent.module.css";
import { sp } from "src/utils/number";

import { CiBookmark } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import { FiAlertTriangle } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile } from "src/services/user";
import api from "src/configs/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function RightContent({ data }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: profile } = useQuery(["profile"], getProfile);

  console.log(profile);
  console.log(data);

  const deleteHandler = async (id) => {
    try {
      await api.delete(`/post/delete/${id}`);
      navigate("/");
      queryClient.refetchQueries("get-all-post");
      toast.success("آگهی با موفقیت حذف شد");
    } catch (error) {
      toast.error("مشکلی در حذف آگهی پیش آمده");
    }
  };

  return (
    <div className={styles.rightContent}>
      <div className={styles.titleContent}>
        <h4>{data.data.post.options?.title}</h4>
        <p>{new Date(data.data.post.createdAt).toLocaleDateString("fa-IR")}</p>
      </div>
      <div className={styles.DangerDeal}>
        <div>
          <FiAlertTriangle size={26} />
          <p>زنگ خطر قبل از معامله</p>
        </div>
        <IoIosArrowBack />
      </div>
      <div className={styles.callInfo}>
        <div>
          <CiBookmark size={25} />
          <IoShareSocialOutline size={25} />
        </div>
        <div>
          <button>اطلاعات تماس</button>
          <button>چت</button>
        </div>
      </div>
      <div className={styles.contentAmount}>
        <p>قیمت</p>
        <p>{sp(data.data.post?.amount)} تومان</p>
      </div>
      <div className={styles.content}>
        <p>توضیحات</p>
        <p>{data.data.post.options?.content}</p>
      </div>
      {profile.data.role === "ADMIN" && (
        <button
          className={styles.deleteBtn}
          onClick={() => deleteHandler(data.data.post._id)}
        >
          حذف آگهی
        </button>
      )}
      {profile.data.role === "USER" &&
        profile.data._id === data.data.post.userId && (
          <button
            className={styles.deleteBtn}
            onClick={() => deleteHandler(data.data.post._id)}
          >
            حذف آگهی
          </button>
        )}
    </div>
  );
}

export default RightContent;
