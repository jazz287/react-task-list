const backendUrl = 'http://localhost:3000';

export const fetchAllTasks = async () => {
    const response = await fetch(`${backendUrl}/tasks`);
    return await response.json();
};

export const createTask = async (task) => {
    const response = await fetch(`${backendUrl}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return await response.json();
};

export const updateTask = async (task) => {
    const response = await fetch(`${backendUrl}/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return await response.json();
};

export const deleteTask = async (taskId) => {
    const response = await fetch(`${backendUrl}/tasks/${taskId}`, {
        method: 'DELETE',
    });
    return await response.json();
};