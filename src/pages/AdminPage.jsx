import CategoryForm from "src/components/templates/adminPage/categoryForm/CategoryForm";
import CategoryList from "src/components/templates/adminPage/cateogryList/CategoryList";

import styles from "./AdminPage.module.css";

function AdminPage() {
  return (
    <div className={styles.container}>
      <CategoryForm />
      <CategoryList />
    </div>
  );
}

export default AdminPage;
