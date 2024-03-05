import { useQuery } from "@tanstack/react-query";
import React from "react";

function AdminPage() {
  const { data } = useQuery(["category-list"], getCategory);
  return <div></div>;
}

export default AdminPage;
