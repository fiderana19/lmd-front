import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <ToastContainer />
            <App />
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
);
