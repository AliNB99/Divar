import Sidebar from "src/components/templates/homePage/sidebar/Sidebar";
import Main from "src/components/templates/homePage/main/Main";

import styles from "./HomePage.module.css";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "src/services/admin";
import { getAllPost } from "src/services/user";
import Loader from "src/components/modules/Loader";
import toast from "react-hot-toast";

function HomePage() {
  const {
    isLoading: categoryLoading,
    data: categoryData,
    error: categoryError,
  } = useQuery(["categories-list"], getCategory);
  const {
    isLoading: postsLoading,
    data: postsData,
    error: postsError,
    isRefetching,
  } = useQuery(["get-all-post"], getAllPost);

  if (postsError || categoryError)
    return toast.error("مشکلی در گرفتن اطلاعات پیش آمده است");

  return (
    <div className={styles.container}>
      {categoryLoading && postsLoading && isRefetching ? (
        <Loader />
      ) : (
        <>
          <Sidebar categories={categoryData} />
          <Main posts={postsData} />
        </>
      )}
    </div>
  );
}

export default HomePage;
