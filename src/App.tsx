import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Events from "./pages/Events/Events";
import Profile from "./pages/Profile/Profile";
import MainLayout from "./components/Layout/MainLayout";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from 'aos';
import { useAccount } from 'wagmi'; // To get wallet connection status

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { address } = useAccount(); // Get the connected wallet address

  if (!address) {
    // If there's no connected wallet, redirect to home page
    return <Navigate to="/" replace />;
  }

  // If connected, render the protected route (Profile page in this case)
  return children;
};

const App = () => {
  // Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      once: false, 
    });
  }, []);

  return (
    <MainLayout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        {/* Protected Route for the Profile page */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </MainLayout>
  );
};

export default App;
