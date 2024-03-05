import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { defaultOptions } from "./configs/reactQuery";
import Layout from "./layout/Layout";
import Routes from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import { useShowContext } from "./context/ShowContextProvider";
import AuthForm from "./components/templates/authForm/AuthForm";

const queryClient = new QueryClient({ defaultOptions });

function App() {
  const { state } = useShowContext();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes />
          {state.isShowForm && <AuthForm />}
          <Toaster />
        </Layout>
      </BrowserRouter>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
