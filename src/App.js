import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import SideNavigation from "./Component/sideNavigation";
import TopHeader from "./Component/TopHeader";
import Footer from "./Component/footer";
import MainContainer from "./Component/MainContainer";
import AboutUs from "./Component/AboutUs";
import Faq from "./AppFeature/Faq";
import SopViewer from './AppFeature/SopViewer';
import PIDConverter from './AppFeature/PIDConverter';
import MarkMyCalender from './AppFeature/MarkMyCalender';


const PageContent = () => {
  
  const location = useLocation();

  const getTitle = (path) => {
  if (path.startsWith('/sop')) return 'SOP Library';
    switch (path) {
      case '/pidconverter': return "PID Converter";
      case '/markmycalendar': return "Mark My Calendar";
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
              <Route path='/markmycalendar' element={<MarkMyCalender />}/>
              <Route path="/sop/:id" element={<SopViewer />} />
              <Route path='/pidconverter' element={<PIDConverter />} />
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