import { useEffect, useState } from "react";
import Header from "./header";
import TextInput from "./text_input";
import TaskListTile from "./task_list_tile";
import { AnimateGroup } from "react-animate-mount";
import EditOptions from "./edit_options";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Task from "../models/task";
import Spacer from "./spacer";
import {
  createTask,
  deleteTask,
  fetchAllTasks,
} from "../services/task_service";
import { ToastContainer, toast } from "react-toastify";
import { v4 } from "uuid";
import { toastify_options } from "../models/toastify_options";

function MainContent() {
  const [loading, setLoading] = useState(true);
  const [editTaskId, setEditTaskId] = useState(null);
  const [tasks, setTasks] = useState([]);

  const getRemainingCount = () => {
    return tasks.filter((t) => !t.isCompleted).length;
  };

  const getCompletedCount = () => {
    return tasks.filter((t) => t.isCompleted).length;
  };

  useEffect(() => {
    async function loadTasks() {
      try {
        var data = await fetchAllTasks();
        setTasks(data);
        toast.success("Connected to backend server", toastify_options);
      } catch (error) {
        var msg = error.message;
        if (msg === "Failed to fetch") {
          msg =
            "Failed to fetch tasks. Please make sure the backend server is running on port 3000";
        }
        toast.error(msg, toastify_options);
        setTimeout(() => {
          toast.info(
            "Backend is not available, all new modifications will be lost on refresh",
            toastify_options
          );
        }, 2000);
      }
      setLoading(false);
    }

    loadTasks();
  }, []);

  if (loading) {
    return <></>;
  }
  return (
    <>
      <TextInput
        placeholder={editTaskId == null ? "Add a new task" : "Edit task"}
        prefixIcon={editTaskId == null ? <PlusOutlined /> : <EditOutlined />}
        inputClassName="main-input"
        onSubmit={(title) => {
          if (editTaskId == null && title.trim().length !== 0) {
            var newTask = new Task(
              v4(),
              title,
              "Edit to add a description",
              false,
              Date.now()
            );
            setTasks([...tasks, newTask]);
            createTask(newTask).catch((error) => {
              toast.error(error.message, toastify_options);
            });
          }
          // Return empty string to clear the input
          return "";
        }}
      />
      <Spacer />
      {editTaskId == null ? (
        <>
          <HeaderWithContent
            heading={"ToDo"}
            headingCount={getRemainingCount()}
            tasksList={tasks.filter((t) => !t.isCompleted)}
            setTasks={setTasks}
            tasks={tasks}
            setEditTaskId={setEditTaskId}
          />

          <Spacer height="25px" />
          <HeaderWithContent
            heading={"Completed"}
            headingCount={getCompletedCount()}
            tasksList={tasks.filter((t) => t.isCompleted)}
            setTasks={setTasks}
            tasks={tasks}
            setEditTaskId={setEditTaskId}
          />
        </>
      ) : (
        <EditOptions
          task={tasks.find((t) => t.id === editTaskId)}
          onCancel={() => {
            setEditTaskId(null);
          }}
          onSave={(newTask) => {
            let newTasks = [...tasks];
            newTasks[newTasks.findIndex((t) => t.id === newTask.id)] = newTask;
            setTasks(newTasks);
            setEditTaskId(null);
          }}
        />
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Slide
      />
    </>
  );
}

function HeaderWithContent({
  heading,
  headingCount,
  tasksList,
  setTasks,
  tasks,
  setEditTaskId,
}) {
  return (
    <>
      <Header title={heading} itemCount={headingCount} />
      <AnimateGroup>
        {tasksList.map((task) => {
          return (
            <TaskListTile
              key={task.id}
              task={task}
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
                deleteTask(task.id)
                  .then(() => {
                    toast.success("Task deleted successfully", toastify_options);
                  })
                  .catch((error) => {
                    toast.error(error.message, toastify_options);
                  });
              }}
            />
          );
        })}
      </AnimateGroup>
    </>
  );
}
export default MainContent;
