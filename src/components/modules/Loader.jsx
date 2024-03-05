import { Oval } from "react-loader-spinner";

function Loader() {
  const style = {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={style}>
      <Oval
        strokeWidth={5}
        width={40}
        color="#a62626"
        secondaryColor="#a62626"
      />
    </div>
  );
}

export default Loader;
