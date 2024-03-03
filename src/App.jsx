import React from "react";
import AuthPage from "./components/templates/authForm/AuthForm";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { defaultOptions } from "./configs/reactQuery";
import HomePage from "./pages/HomePage";

const queryClient = new QueryClient({ defaultOptions });

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
