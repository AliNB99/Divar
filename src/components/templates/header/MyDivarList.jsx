import React from "react";

import { TbLogin2 } from "react-icons/tb";
import { FaRegBookmark, FaRegTrashAlt, FaRegUser } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { MdHistory } from "react-icons/md";
import { AiOutlineShop } from "react-icons/ai";

import styles from "./MyDivarList.module.css";
import { useShowContext } from "src/context/ShowContextProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile } from "src/services/user";
import { e2p } from "src/utils/number";
import { Link, useNavigate } from "react-router-dom";
import { deleteCookie } from "src/utils/cookies";
import toast from "react-hot-toast";

function MyDivarList() {
  const { refetch, data } = useQuery(["profile"], getProfile);
  const { dispatch } = useShowContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const clickHandler = (type) => {
    dispatch({ type });
    dispatch({ type: "SHOW_LIST" });
  };

  const exitHandler = () => {
    queryClient.clear("my-post-list");
    deleteCookie();
    refetch();
    navigate("/");
    toast.success("خروج از حساب با موفقیت انجام شد.");
  };

  return (
    <ul className={styles.list}>
      <li>
        {data?.status === 200 ? (
          <Link to={data.data.role === "USER" ? "/dashboard" : "/admin"}>
            <div className={styles.dashboardBtn}>
              <div>
                <FaRegUser size={13} />
                {data.data.role === "USER" ? (
                  <span>کاربر دیوار</span>
                ) : (
                  <span>ادمین دیوار</span>
                )}
              </div>
              <div>
                <span>تلفن</span>
                <p>{e2p(data.data.mobile)}</p>
              </div>
            </div>
          </Link>
        ) : (
          <button onClick={() => clickHandler("SHOW_FORM")}>
            <TbLogin2 size={16} />
            ورود
          </button>
        )}
      </li>
      <li>
        <a href="#">
          <FaRegBookmark size={13} />
          نشان ها
        </a>
      </li>
      <li>
        <a href="#">
          <GrNotes size={13} />
          یادداشت ها
        </a>
      </li>
      <li>
        <a href="#">
          <MdHistory size={16} />
          بازدیدهای اخیر
        </a>
      </li>
      <li>
        <a href="#">
          <AiOutlineShop size={16} />
          دیوار برای کسب و کارها
        </a>
      </li>
      {data?.status === 200 && (
        <li>
          <button onClick={exitHandler}>
            <FaRegTrashAlt />
            خروج
          </button>
        </li>
      )}
    </ul>
  );
}

export default MyDivarList;
