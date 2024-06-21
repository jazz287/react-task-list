import Header from "./components/header";
import MainInput from "./components/main_input";
import Spacer from "./components/spacer";
import "./styles/App.css";

function App() {
  return (
    <>
      
      <main>
        <MainInput />
        <Spacer/>
        <Header title={"ToDo"} itemCount={4}/>
      </main>
    </>
  );
}

export default App;
