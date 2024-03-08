import styles from "./Card.module.css";
import { sp } from "src/utils/number";

import notFoundImg from "src/images/not-found-image.jpg";
import { Link } from "react-router-dom";

function Card({ post }) {
  const baseurl = import.meta.env.VITE_BASE_URL;

  return (
    <Link
      to={`/advertising/${post._id}`}
      className={styles.card}
      key={post._id}
    >
      <div className={styles.cardContent}>
        <h4>{post.options?.title}</h4>
        <div>
          <p>{sp(post.amount)} تومان</p>
          <p>{post.options?.city}</p>
        </div>
      </div>
      <div className={styles.cardImage}>
        {post.images.length ? (
          <img src={`${baseurl}/${post.images[0]}`} />
        ) : (
          <img style={{ width: "148px" }} src={notFoundImg} />
        )}
      </div>
    </Link>
  );
}

export default Card;
