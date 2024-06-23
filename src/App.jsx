import { useState } from "react";
import Header from "./components/header";
import TextInput from "./components/text_input";
import Spacer from "./components/spacer";
import TaskListTile from "./components/task_list_tile";
import "./styles/App.css";
import { AnimateGroup } from "react-animate-mount";
import Task from "./models/task";
import Navbar from "./components/navbar";
import EditOptions from "./components/edit_options";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";

function App() {
  const [editTaskId, setEditTaskId] = useState(null);
  const [tasks, setTasks] = useState([
    new Task(1, "Feed the dogs", "Feed the dogs", false, "Nov 10"),
    new Task(2, "Eat Ramen", "Eat Ramen", false, "Nov 10"),
    // new Task(3, "Survive", "Survive", false, "Nov 10"),
    // new Task(4, "Touch Grass", "Touch Grass", false, "Nov 10"),
  ]);
  return (
    <>
      <Navbar />
      <Spacer height="100px" />
      <main>
        <TextInput
          placeholder={editTaskId == null ? "Add a new task" : "Edit task"}
          prefixIcon={editTaskId == null ? <PlusOutlined /> : <EditOutlined />}
          onSubmit={(title) => {
            if (editTaskId == null) {
              setTasks([
                ...tasks,
                new Task(tasks.length + 1, title, title, false, "Nov 10"),
              ]);
            }
          }}
        />
        <Spacer />
        {editTaskId == null ? (
          <>
            <Header title={"ToDo"} itemCount={4} />
            <AnimateGroup>
              {tasks.map((task) => {
                if (!task.isCompleted) {
                  return (
                    <TaskListTile
                      key={task.id}
                      title={task.title}
                      isCompleted={task.isCompleted}
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
                      onEditInitiate={() => {
                        setEditTaskId(task.id);
                      }}
                      onDelete={() => {
                        setTasks(tasks.filter((t) => t.id !== task.id));
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
                      key={task.id}
                      title={task.title}
                      isCompleted={task.isCompleted}
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
                      onEditInitiate={() => {
                        setEditTaskId(task.id);
                      }}
                      onDelete={() => {
                        setTasks(tasks.filter((t) => t.id !== task.id));
                      }}
                    />
                  );
                }
              })}
            </AnimateGroup>
          </>
        ) : (
          <EditOptions
            task={tasks.find((t) => t.id === editTaskId)}
            onCancel={() => {
              setEditTaskId(null);
            }}
          />
        )}
      </main>
    </>
  );
}

export default App;
