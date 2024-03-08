import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategory } from "src/services/admin";
import { getCookie } from "src/utils/cookies";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import styles from "./AddPost.module.css";
import { ThreeDots } from "react-loader-spinner";

function AddPost() {
  // loading for submit button
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    city: "",
    amount: "",
    images: "",
  });

  const queryClient = useQueryClient();

  const { data } = useQuery(["categories-list"], getCategory);

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (let i in form) {
      formData.append(i, form[i]);
    }
    if (!form.title || !form.amount || !form.category)
      return toast.error("لطفا عنوان و قیمت و دسته بندی را وارد نمایید");

    const accessToken = getCookie("accessToken");
    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${accessToken}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        setForm({
          title: "",
          content: "",
          category: "",
          city: "",
          amount: "",
          images: "",
        });
        setIsLoading(false);
        queryClient.refetchQueries("my-post-list");
      })
      .catch((error) => {
        console.log(error);
        toast.error("مشکلی پیش آمده");
        setIsLoading(false);
      });
  };

  const changeHandler = (event) => {
    const name = event.target.name;

    if (name !== "images") {
      setForm((form) => ({ ...form, [name]: event.target.value }));
    } else {
      setForm((form) => ({ ...form, [name]: event.target.files[0] }));
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <h4>افزودن آگهی</h4>
      <ul>
        <li>
          <label htmlFor="title">عنوان</label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.name}
            onChange={changeHandler}
          />
        </li>

        <li>
          <label htmlFor="amount">قیمت</label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={form.amount}
            onChange={changeHandler}
          />
        </li>
        <li>
          <label htmlFor="city">شهر</label>
          <input
            type="text"
            name="city"
            id="city"
            value={form.city}
            onChange={changeHandler}
          />
        </li>

        <li>
          <label htmlFor="category">دسته بندی</label>
          <select
            name="category"
            id="category"
            value={form.category}
            onChange={changeHandler}
          >
            <option disabled value="">
              انتخاب دسته بندی
            </option>
            {data?.data.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </li>
        <li>
          <label htmlFor="images">عکس</label>
          <input
            type="file"
            name="images"
            id="images"
            onChange={changeHandler}
          />
        </li>
        <li>
          <label htmlFor="content">توضیحات</label>
          <textarea
            rows="6"
            name="content"
            id="content"
            onChange={changeHandler}
            value={form.content}
          />
        </li>
      </ul>
      <div>
        <button type="submit">
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

export default AddPost;
