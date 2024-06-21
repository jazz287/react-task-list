import Header from "./components/header";
import MainInput from "./components/main_input";
import Spacer from "./components/spacer";
import TaskListTile from "./components/task_list_tile";
import "./styles/App.css";

function App() {
  return (
    <>
      <main>
        <MainInput />
        <Spacer />
        <Header title={"ToDo"} itemCount={4} />
        {["Feed the dogs", "Eat Ramen", "Survive", "Touch Grass"].map(
          (task) => {
            return (
              <TaskListTile
                key={task}
                title={task}
                isCompleted={false}
                dueDate={"Nov 10"}
              />
            );
          }
        )}
        <Spacer height="25px"/>
        <Header title={"Completed"} itemCount={3} />
        {["Feed the dogs", "Eat Ramen", "Survive", "Touch Grass"].map(
          (task) => {
            return (
              <TaskListTile
                key={task}
                title={task}
                isCompleted={false}
                dueDate={"Nov 10"}
              />
            );
          }
        )}
      </main>
    </>
  );
}

export default App;
