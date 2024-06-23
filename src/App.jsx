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
    new Task(1, "Feed the dogs", "Feeding Details", false, Date.now()),
    new Task(2, "Eat Ramen", "Ramen recipe", false, Date.now()),
  ]);

  const getRemainingCount = () => {
    return tasks.filter((t) => !t.isCompleted).length;
  };

  const getCompletedCount = () => {
    return tasks.filter((t) => t.isCompleted).length;
  };
  return (
    <>
      <Navbar />
      <Spacer height="100px" />
      <main>
        <TextInput
          placeholder={editTaskId == null ? "Add a new task" : "Edit task"}
          prefixIcon={editTaskId == null ? <PlusOutlined /> : <EditOutlined />}
          inputClassName="main-input"
          onSubmit={(title) => {
            if (editTaskId == null && title.trim().length !== 0) {
              setTasks([
                ...tasks,
                new Task(
                  tasks.length + 1,
                  title,
                  "Edit to add a description",
                  false,
                  Date.now()
                ),
              ]);
            }

            // Return empty string to clear the input
            return "";
          }}
        />
        <Spacer />
        {editTaskId == null ? (
          <>
            <Header title={"ToDo"} itemCount={getRemainingCount()} />
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
            <Header title={"Completed"} itemCount={getCompletedCount()} />
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
            onSave={(newTask) => {
              let newTasks = [...tasks];
              newTasks[newTasks.findIndex((t) => t.id === newTask.id)] =
                newTask;
              setTasks(newTasks);
              setEditTaskId(null);
            }}
          />
        )}
      </main>
    </>
  );
}

export default App;
