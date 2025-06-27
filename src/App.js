import SideNavigation from "./Component/sideNavigation";
import TopHeader from "./Component/TopHeader";
import Footer from "./Component/footer";
import MainContainer from "./Component/MainContainer";
function App() {
  return (
    <>
    <TopHeader />
    <div className="layoutmiddle">
    <SideNavigation />
    <MainContainer />
    </div>
    <Footer />
    </>
  );
}

export default App;
