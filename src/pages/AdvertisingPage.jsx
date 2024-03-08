import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPost } from "src/services/user";
// Loader
import Loader from "src/components/modules/Loader";
// toast
import toast from "react-hot-toast";
// component
import RightContent from "src/components/templates/advertising/rightContent/RightContent";
import LeftContent from "src/components/templates/advertising/leftContent/LeftContent";

function AdvertisingPage() {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery(["get-post"], () => getPost(id), {
    staleTime: false,
    cacheTime: false,
  });

  if (isLoading) return <Loader />;
  if (error) toast.error(error.message);

  const style = {
    display: "grid",
    gridTemplateColumns: "7fr 6fr",
    justifyContent: "space-between",
    gap: "2rem",
    maxWidth: "1024px",
    margin: "auto",
    marginTop: "2rem",
  };

  return (
    <div style={style}>
      <RightContent data={data} />
      <LeftContent data={data} />
    </div>
  );
}

export default AdvertisingPage;
