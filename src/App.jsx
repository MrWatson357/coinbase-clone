import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import AssetDetail from "./pages/AssetDetail";
import Learn from "./pages/Learn";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/learn"   element={<Learn />} />
            <Route path="/signin"  element={<SignIn />} />
            <Route path="/signup"  element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/asset/:id" element={<AssetDetail />} />
            <Route path="*" element={<div className="p-6 text-center text-gray-500">Page not found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
