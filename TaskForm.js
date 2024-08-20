import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskForm.css';

function TaskForm({ taskId, onSave }) {
    const [task, setTask] = useState({
        title: '',
        description: '',
        deadline: '',
        status: 'in-progress',
        priority: 1,
    });

    useEffect(() => {
        const token = localStorage.getItem('authToken'); 
        console.log(localStorage)// Get the token from localStorage

        if (taskId && token) {
            axios.get(`http://localhost:5000/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNTZlNmFhNDNjNWY4ZDk1ODQxYjhkIn0sImlhdCI6MTcyNDIxOTIyOSwiZXhwIjoxNzI0MjIyODI5fQ.xmNYn1mSN63BY4-JiqV-LkMDmEompgJA8P2eKxkWBSk'}`, // Include the token in the request headers
                },
            })
            .then(response => setTask(response.data))
            .catch(error => console.error('Error fetching task:', error));
        }
    }, [taskId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            console.log(localStorage) // Get the token from localStorage

            const config = {
                headers: {
                    Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNTZlNmFhNDNjNWY4ZDk1ODQxYjhkIn0sImlhdCI6MTcyNDIxOTIyOSwiZXhwIjoxNzI0MjIyODI5fQ.xmNYn1mSN63BY4-JiqV-LkMDmEompgJA8P2eKxkWBSk'}`, // Include the token in the request headers
                },
            };

            if (taskId) {
                // Update existing task
                await axios.put(`http://localhost:5000/tasks/${taskId}`, task, config);
            } else {
                // Create a new task
                await axios.post('http://localhost:5000/tasks', task, config);
            }

            if (onSave && typeof onSave === 'function') {
                onSave(); // Call the onSave function if it exists
            }
        } catch (error) {
            console.error('Error saving task:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="taskform-container">
            <form className='taskForm' onSubmit={handleSubmit}>
                <h1>{taskId ? 'Update Task' : 'Create Task'}</h1>
                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    placeholder="Task Title"
                />
                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    placeholder="Task Description"
                />
                <input
                    type="date"
                    name="deadline"
                    value={task.deadline}
                    onChange={handleChange}
                />
                <select name="status" value={task.status} onChange={handleChange}>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <select name="priority" value={task.priority} onChange={handleChange}>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                </select>
                <button type="submit">Save Task</button>
            </form>
        </div>
    );
}

export default TaskForm;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './TaskForm.css';

// function TaskForm({ taskId, onSave }) {
//     const [task, setTask] = useState({
//         title: '',
//         description: '',
//         deadline: '',
//         status: 'in-progress',
//         priority: 1,
//     });

//     useEffect(() => {
//         if (taskId) {
//             axios.get(`http://localhost:5000/tasks/${taskId}`, {
//                 headers: {
//                     Authorization: `Bearer YOUR_AUTH_TOKEN`,
//                 },
//             })
//             .then(response => setTask(response.data))
//             .catch(error => console.error('Error fetching task:', error));
//         }
//     }, [taskId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTask({ ...task, [name]: value });
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('authToken'); // Get the token from localStorage
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7I…TA4fQ.myKu65ahX4i3MDzUiVWDlX1Lb6XpjO3ieEkaGtPulU8'}`,
//                 },
//             };
    
//             if (taskId) {
//                 // Update existing task
//                 await axios.put(`http://localhost:5000/tasks/${taskId}`, task, config);
//             } else {
//                 // Create a new task
//                 await axios.post('http://localhost:5000/tasks', task, config);
//             }
    
//             if (onSave && typeof onSave === 'function') {
//                 onSave(); // Call the onSave function if it exists
//             }
//         } catch (error) {
//             console.error('Error saving task:', error.response ? error.response.data : error.message);
//         }
//     };

//     return (
//         <div className="taskform-container">
//             <form className='taskForm' onSubmit={handleSubmit}>
//                 <h1>{taskId ? 'Update Task' : 'Create Task'}</h1>
//                 <input
//                     type="text"
//                     name="title"
//                     value={task.title}
//                     onChange={handleChange}
//                     placeholder="Task Title"
//                 />
//                 <textarea
//                     name="description"
//                     value={task.description}
//                     onChange={handleChange}
//                     placeholder="Task Description"
//                 />
//                 <input
//                     type="date"
//                     name="deadline"
//                     value={task.deadline}
//                     onChange={handleChange}
//                 />
//                 <select name="status" value={task.status} onChange={handleChange}>
//                     <option value="in-progress">In Progress</option>
//                     <option value="completed">Completed</option>
//                 </select>
//                 <select name="priority" value={task.priority} onChange={handleChange}>
//                     <option value={1}>High</option>
//                     <option value={2}>Medium</option>
//                     <option value={3}>Low</option>
//                 </select>
//                 <button type="submit">Save Task</button>
//             </form>
//         </div>
//     );
// }

// export default TaskForm;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './TaskForm.css';

// function TaskForm({ taskId, onSave }) {
//     const [task, setTask] = useState({
//         title: '',
//         description: '',
//         deadline: '',
//         status: 'in-progress',
//         priority: 1
//     });

//     useEffect(() => {
//         if (taskId) {
//             axios.get(`http://localhost:5000/tasks/${taskId}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('authToken')}`
//                 }
//             })
//                 .then(response => setTask(response.data))
//                 .catch(error => console.error('Error fetching task:', error));
//         }
//     }, [taskId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTask({ ...task, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('authToken')}`
//                 }
//             };

//             if (taskId) {
//                 // Update existing task
//                 await axios.put(`http://localhost:5000/tasks/${taskId}`, task, config);
//             } else {
//                 // Create new task
//                 await axios.post('http://localhost:5000/tasks', task, config);
//             }

//             if (onSave && typeof onSave === 'function') {
//                 onSave(); // Call the onSave function if it exists
//             }
//         } catch (error) {
//             console.error('Error saving task:', error);
//         }
//     };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const token = localStorage.getItem('authToken');
    //         console.log('Token:', token); // Check if the token is correct
    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         };
    //         if (taskId) {
    //             await axios.put(`http://localhost:5000/tasks/${taskId}`, task, config);
    //         } else {
    //             await axios.post('http://localhost:5000/tasks', task, config);
    //         }
    //         if (onSave && typeof onSave === 'function') {
    //             onSave();
    //         }
    //     } catch (error) {
    //         console.error('Error saving task:', error);
    //     }
    // };

//     return (
//         <div className="taskform-container">
//             <form className="taskForm" onSubmit={handleSubmit}>
//                 <h1>Update Task Form</h1>
//                 <input
//                     type="text"
//                     name="title"
//                     value={task.title}
//                     onChange={handleChange}
//                     placeholder="Task Title"
//                 />
//                 <textarea
//                     name="description"
//                     value={task.description}
//                     onChange={handleChange}
//                     placeholder="Task Description"
//                 />
//                 <input
//                     type="date"
//                     name="deadline"
//                     value={task.deadline}
//                     onChange={handleChange}
//                 />
//                 <select name="status" value={task.status} onChange={handleChange}>
//                     <option value="in-progress">In Progress</option>
//                     <option value="completed">Completed</option>
//                 </select>
//                 <select name="priority" value={task.priority} onChange={handleChange}>
//                     <option value={1}>High</option>
//                     <option value={2}>Medium</option>
//                     <option value={3}>Low</option>
//                 </select>
//                 <button type="submit">Save Task</button>
//             </form>
//         </div>
//     );
// }

// export default TaskForm;


// import axios from 'axios';
// import './TaskForm.css';

// function TaskForm({ taskId, onSave }) {
//     const [task, setTask] = useState({
//         title: '',
//         description: '',
//         deadline: '',
//         status: 'in-progress',
//         priority: 1
//     });

//     useEffect(() => {
//         if (taskId) {
//             axios.get(`http://localhost:5000/task/${taskId}`)
//                 .then(response => setTask(response.data))
//                 .catch(error => console.error('Error fetching task:', error));
//         }
//     }, [taskId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTask({ ...task, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (taskId) {
//                 // Update existing task
//                 await axios.put(`http://localhost:5000/tasks/${taskId}`, task);
//             } else {
//                 // Create new task (if you have this functionality)
//                 await axios.post('http://localhost:5000/tasks', task);
//             }
//             if (onSave && typeof onSave === 'function') {
//                 onSave(); // Call the onSave function if it exists
//             }
//                    } catch (error) {
//             console.error('Error saving task:', error);
//         }
//     };

//     return (
//         <div className="taskform-container">
//             <form className='taskForm' onSubmit={handleSubmit}>
//             <h1>Update Task Form</h1>
//             <input
//                 type="text"
//                 name="title"
//                 value={task.title}
//                 onChange={handleChange}
//                 placeholder="Task Title"
//             />
//             <textarea
//                 name="description"
//                 value={task.description}
//                 onChange={handleChange}
//                 placeholder="Task Description"
//             />
//             <input
//                 type="date"
//                 name="deadline"
//                 value={task.deadline}
//                 onChange={handleChange}
//             />
//             <select name="status" value={task.status} onChange={handleChange}>
//                 <option value="in-progress">In Progress</option>
//                 <option value="completed">Completed</option>
//             </select>
//             <select name="priority" value={task.priority} onChange={handleChange}>
//                 <option value={1}>High</option>
//                 <option value={2}>Medium</option>
//                 <option value={3}>Low</option>
//             </select>
//             <button type="submit">Save Task</button>
//         </form>
//             </div>
//     );
// }

// export default TaskForm;



// import React, { useState } from 'react';
// import axios from 'axios';

// const TaskForm = ({ task, onSave }) => {
//     const [formData, setFormData] = useState({
//         title: task ? task.title : '',
//         description: task ? task.description : '',
//         deadline: task ? task.deadline : ''
//     });

//     const { title, description, deadline } = formData;

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = async e => {
//         e.preventDefault();
//         try {
//             if (task) {
//                 // Update existing task
//                 await axios.put(`/api/tasks/${task._id}`, formData);
//             } else {
//                 // Create new task
//                 await axios.post('/api/tasks', formData);
//             }
//             onSave();
//         } catch (err) {
//             console.error('Error saving task', err.response.data);
//         }
//     };

//     return (
//         <form onSubmit={onSubmit}>
//             <h2>{task ? 'Edit Task' : 'Add Task'}</h2>
//             <input 
//                 type="text" 
//                 name="title" 
//                 value={title} 
//                 onChange={onChange} 
//                 placeholder="Task Title" 
//                 required 
//             />
//             <textarea 
//                 name="description" 
//                 value={description} 
//                 onChange={onChange} 
//                 placeholder="Task Description" 
//                 required 
//             />
//             <input 
//                 type="date" 
//                 name="deadline" 
//                 value={deadline} 
//                 onChange={onChange} 
//                 required 
//             />
//             <button type="submit">{task ? 'Update Task' : 'Add Task'}</button>
//         </form>
//     );
// };

// export default TaskForm;
