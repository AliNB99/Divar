import styles from "./Sidebar.module.css";

function Sidebar({ categories }) {
  return (
    <div className={styles.container}>
      <h4>دسته ها</h4>
      <ul>
        {categories?.data.map((i) => (
          <li key={i._id}>
            <img src={`${i.icon}.svg`} />
            <p>{i.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
