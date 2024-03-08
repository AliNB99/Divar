import styles from "./Main.module.css";
import Card from "./card/Card";

function Main({ posts }) {
  console.log(posts?.data);
  return (
    <div className={styles.container}>
      {posts?.data.posts.map((post) => (
        <Card post={post} />
      ))}
    </div>
  );
}

export default Main;
