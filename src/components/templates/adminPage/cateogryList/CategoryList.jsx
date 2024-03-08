import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, getCategory } from "src/services/admin";

import styles from "./CategoryList.module.css";
import toast from "react-hot-toast";
import Loader from "src/components/modules/Loader";

function CategoryList() {
  const { isLoading, data, refetch } = useQuery(
    ["categories-list"],
    getCategory
  );
  const { mutate, isLoading: isLoadingDelete } = useMutation(deleteCategory, {
    onSuccess: () => {
      toast.success("دسته بندی با موفقیت حذف شد");
      refetch();
    },
  });

  const deleteHandler = (event) => {
    const id = event.target.dataset.id;
    mutate(id);
  };

  return (
    <div className={styles.container}>
      <h4>دسته بندی ها</h4>
      {isLoading ? (
        <Loader customHeight={"fit-content"} />
      ) : (
        <ul>
          {data?.data.map((category) => (
            <li key={category._id}>
              <div className={styles.nameContent}>
                <img src={`${category.icon}.svg`} />
                <h5>{category.name}</h5>
              </div>
              <div className={styles.slugContent}>
                <p>{category.slug}/ #</p>
              </div>
              <div className={styles.deleteBtn}>
                <button
                  data-id={category._id}
                  onClick={deleteHandler}
                  disabled={isLoadingDelete}
                >
                  حذف
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryList;
