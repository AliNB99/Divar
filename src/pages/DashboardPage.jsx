import PostList from "src/components/templates/dashboardPage/PostList/PostList";
import AddPost from "src/components/templates/dashboardPage/addPost/AddPost";

import styles from "./Dashboard.module.css";

function DashboardPage() {
  return (
    <div className={styles.container}>
      <AddPost />
      <PostList />
    </div>
  );
}

export default DashboardPage;
