import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import SideNavigation from "./Component/sideNavigation";
import TopHeader from "./Component/TopHeader";
import Footer from "./Component/footer";
import MainContainer from "./Component/MainContainer";
import AboutUs from "./Component/AboutUs";

const PageContent = () => {
  const location = useLocation();

  const getTitle = (path) => {
    switch (path) {
      case '/about': return 'About Us';
      case '/': return 'Webcom Dashboard';
      default: return 'Webcom Dashboard';
    }
  };
  return (
    <>
      <div className="app-wrapper">
        <TopHeader title={getTitle(location.pathname)} />
        <div className="layoutmiddle">
          <SideNavigation />
          <main>
            <Routes>
              <Route path="/" element={<MainContainer />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <Router>
        <PageContent />
      </Router>
    </>
  );
}

export default App;
