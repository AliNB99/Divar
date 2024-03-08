import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getMyPost } from "src/services/user";

import notFoundImg from "src/images/not-found-image.jpg";

import styles from "./PostList.module.css";
import { sp } from "src/utils/number";
import Loader from "src/components/modules/Loader";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function PostList() {
  const { isLoading, isFetching, data, error } = useQuery(
    ["my-post-list"],
    getMyPost
  );
  const baseUrl = import.meta.env.VITE_BASE_URL;

  if (error) toast.error(error.message);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h4>آگهی های شما</h4>
      </div>
      {isLoading || isFetching ? (
        <Loader />
      ) : data?.data.posts.length ? (
        data.data.posts.map((i) => (
          <Link
            to={`/advertising/${i._id}`}
            key={i._id}
            className={styles.post}
          >
            <div className={styles.rightCard}>
              {!!i.images.length ? (
                <img src={`${baseUrl}/${i.images[0]}`} />
              ) : (
                <img src={notFoundImg} />
              )}
              <div className={styles.contentPost}>
                <p>{i.options?.title}</p>
                <p>{i.options?.content}</p>
              </div>
            </div>
            <div className={styles.leftCard}>
              <p>{new Date(i?.createdAt).toLocaleDateString("fa-IR")}</p>
              <p>{sp(i.amount)} تومان</p>
            </div>
          </Link>
        ))
      ) : (
        <div className={styles.notFoundMessage}>
          <p>در حال حاضر شما آگهی ثبت نکرده اید</p>
        </div>
      )}
    </div>
  );
}

export default PostList;
