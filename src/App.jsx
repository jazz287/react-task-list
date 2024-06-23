import MainContent from "./components/main_content";
import Navbar from "./components/navbar";
import Spacer from "./components/spacer";
import "./styles/App.css";

function App() {
  return (
    <>
      <Navbar />
      <Spacer height="100px" />
      <main>
        <MainContent />
      </main>
    </>
  );
}

export default App;
