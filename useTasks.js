// Example of useTasks.js
import { useEffect, useState } from 'react';
import axios from 'axios';

function useTasks(status, search, sortBy) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/tasks', {
                    params: { status, search, sortBy }
                });
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, [status, search, sortBy]);

    return [tasks, setTasks];
}

export default useTasks;





// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useTasks = (status, search, sortBy) => {
//     const [tasks, setTasks] = useState([]);

//     useEffect(() => {
//         const fetchTasks = async () => {
//             try {
//                 const token = localStorage.getItem('token'); // Or the method you're using to store the token
//                 const response = await axios.get('http://localhost:5000/tasks', {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 console.log('Tasks fetched:', response.data);
//             } catch (error) {
//                 console.error('Error fetching tasks:', error);
//             }
//         };
        

//         fetchTasks();
//     }, [status, search, sortBy]);

//     return [tasks, setTasks];
// };

// export default useTasks;




// const fetchTasks = async () => {
        //     try {
        //         const response = await axios.get('http://localhost:5000/tasks', {
        //             params: { status, search, sortBy }
        //         });
        //         setTasks(response.data);
        //     } catch (error) {
        //         console.error('Error fetching tasks:', error);
        //     }
        // };