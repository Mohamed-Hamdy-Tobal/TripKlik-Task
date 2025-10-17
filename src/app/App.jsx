import "./App.css";
import { queryClient } from "@/config/queryClient";
import { AppRoutes } from "@/routes/AppRoutes";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <AppRoutes />
      </BrowserRouter>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
