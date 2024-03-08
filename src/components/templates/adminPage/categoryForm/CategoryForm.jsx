import { useState } from "react";
import styles from "./CategoryForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "src/services/admin";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

function CategoryForm() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: "",
  });

  const { mutate, isLoading, error, reset } = useMutation(addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories-list");
      toast.success("دسته بندی با موفقیت ایجاد شد");
    },
  });

  if (error?.response.status === 409) {
    toast.error("این دسته قبلا ایجاد شده است");
    reset();
  }
  if (error?.response.status >= 500) {
    toast.error(error.message);
    reset();
  }

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((form) => ({ ...form, [name]: value }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!form.name || !form.slug || !form.icon)
      return toast.error("لطفا تمام مقادیر لازم را وارد نمایید");
    mutate(form);
    setForm({
      name: "",
      slug: "",
      icon: "",
    });
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <h4>اضافه کردن دسته بندی</h4>
      <ul>
        <li>
          <label htmlFor="name">نام دسته بندی</label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={changeHandler}
            placeholder="لطفا فارسی تایپ کنید"
          />
        </li>
        <li>
          <label htmlFor="slug">اسلاگ دسته بندی</label>
          <input
            type="text"
            name="slug"
            id="slug"
            value={form.slug}
            onChange={changeHandler}
            placeholder="لطفا انگلیسی تایپ کنید"
          />
        </li>
        <li>
          <label htmlFor="icon">آیکون دسته بندی</label>
          <input
            type="text"
            name="icon"
            id="icon"
            value={form.icon}
            onChange={changeHandler}
            placeholder="لطفا انگلیسی تایپ کنید"
          />
        </li>
      </ul>
      <div>
        <button disabled={isLoading} type="submit">
          {isLoading ? (
            <ThreeDots height={30} width={30} color="#f2f2f2" />
          ) : (
            <span>ایجاد</span>
          )}
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;
