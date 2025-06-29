import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import SideNavigation from "./Component/sideNavigation";
import TopHeader from "./Component/TopHeader";
import Footer from "./Component/footer";
import MainContainer from "./Component/MainContainer";
import AboutUs from "./Component/AboutUs";
import Faq from "./AppFeature/Faq";
import Sop from './AppFeature/Sop';
import MarkMyCalender from './AppFeature/MarkMyCalender';


const PageContent = () => {
  
  const location = useLocation();

  const getTitle = (path) => {
    switch (path) {
      case '/markmycalendar': return "Mark My Calendar";
      case '/sop': return "SOP Library";
      case '/faq': return "FAQ's";
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
              <Route path="/faq" element={<Faq />} />
              <Route path="/sop" element={<Sop />} />
              <Route path='/markmycalendar' element={<MarkMyCalender />}/>
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