import { useEffect, useState } from "react";
import Header from "./header";
import TextInput from "./text_input";
import TaskListTile from "./task_list_tile";
import { AnimateGroup } from "react-animate-mount";
import EditOptions from "./edit_options";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Task from "../models/task";
import Spacer from "./spacer";
import { fetchAllTasks } from "../services/task_service";
import { Slide, ToastContainer, toast } from "react-toastify";

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
        toast.success("Connected to backend server", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      } catch (error) {
        var msg = error.message;
        if (msg === "Failed to fetch") {
          msg =
            "Failed to fetch tasks. Please make sure the backend server is running on port 3000";
        }
        toast.error(msg, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        setTimeout(() => {
          toast.info(
            "Backend is not available, all new modifications will be lost on refresh",
            {
              position: "bottom-right",
              autoClose: 8000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Slide,
            }
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
              }}
            />
          );
        })}
      </AnimateGroup>
    </>
  );
}
export default MainContent;
