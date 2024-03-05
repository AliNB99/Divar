// styles
import styles from "./Header.module.css";

// icons
import { GoChevronDown } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { RiChat1Line } from "react-icons/ri";
import { useState } from "react";
// components
import MyDivarList from "src/components/modules/header/MyDivarList";
import { useShowContext } from "src/context/ShowContextProvider";
import { Link } from "react-router-dom";

function Header() {
  const { state, dispatch } = useShowContext();
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.rightContent}>
          <a href="#">
            <img src="divar.svg" alt="divar-logo" />
          </a>
          <div className={styles.verticalLine} />
          <button className={styles.headerBtn}>
            <GrLocation size={18} />
            تهران
          </button>
          <button className={styles.headerBtn}>
            دسته ها
            <GoChevronDown size={18} />
          </button>
          <div className={styles.searchInput}>
            <IoSearch size={16} color="#aaa" />
            <input type="text" placeholder="جستجوی در همه آگهی ها" />
          </div>
        </div>
        <div className={styles.leftContent}>
          <button
            onClick={() => dispatch({ type: "SHOW_LIST" })}
            className={styles.headerBtn}
          >
            <FaRegUser size={15} />
            دیوار من
          </button>

          {/* show user List */}
          {state.isShowList && <MyDivarList />}

          <Link className={styles.headerBtn}>
            <RiChat1Line size={18} />
            چت
          </Link>
          <Link className={styles.headerBtn}>پشتیبانی</Link>

          <button className={styles.AdvertisingBtn}>
            <Link to="/dashboard">ثبت آگهی</Link>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
