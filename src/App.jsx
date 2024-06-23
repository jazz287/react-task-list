import { useState } from "react";
import Header from "./components/header";
import MainInput from "./components/main_input";
import Spacer from "./components/spacer";
import TaskListTile from "./components/task_list_tile";
import "./styles/App.css";
import { AnimateGroup } from "react-animate-mount";

function App() {
  const [tasks, setTasks] = useState([
    {
      title: "Feed the dogs",
      isCompleted: false,
      dueDate: "Nov 10",
    },
    {
      title: "Eat Ramen",
      isCompleted: false,
      dueDate: "Nov 10",
    },
    {
      title: "Survive",
      isCompleted: false,
      dueDate: "Nov 10",
    },
    {
      title: "Touch Grass",
      isCompleted: false,
      dueDate: "Nov 10",
    },
  ]);
  return (
    <>
      <main>
        <MainInput
          onSubmit={(title) => {
            setTasks([
              ...tasks,
              { title, isCompleted: false, dueDate: "Nov 10" },
            ]);
          }}
        />
        <Spacer />
        <Header title={"ToDo"} itemCount={4} />
        <AnimateGroup>
        {tasks.map((task) => {
          if (!task.isCompleted) {
            return (
              <TaskListTile
                key={task.title}
                title={task.title}
                isCompleted={false}
                dueDate={task.dueDate}
                onToggle={(newIsCompleted) => {
                  console.log(newIsCompleted);
                  setTasks(
                    tasks.map((t) => {
                      if (t.title === task.title) {
                        return { ...t, isCompleted: newIsCompleted };
                      }
                      return t;
                    })
                  );
                }}
              />
            );
          }
        })}
        </AnimateGroup>
        <Spacer height="25px" />
        <Header title={"Completed"} itemCount={3} />
        <AnimateGroup>
          {tasks.map((task) => {
            if (task.isCompleted) {
              return (
                <TaskListTile
                  key={task.title}
                  title={task.title}
                  isCompleted={true}
                  dueDate={task.dueDate}
                  onToggle={(newIsCompleted) => {
                    console.log(newIsCompleted);
                    setTasks(
                      tasks.map((t) => {
                        if (t.title === task.title) {
                          return { ...t, isCompleted: newIsCompleted };
                        }
                        return t;
                      })
                    );
                  }}
                />
              );
            }
          })}
        </AnimateGroup>
      </main>
    </>
  );
}

export default App;
