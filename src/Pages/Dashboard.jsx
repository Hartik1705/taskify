import React, { useEffect, useState } from 'react';
import '../styles/pages-styles/Dashboard.css';
import Button from '../Components/Button.jsx';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import CircleLoader from "react-spinners/CircleLoader";

const Dashboard = () => {

  const [task, setTask] = useState([]);
  const [listID, setlistId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  

  const getList = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('https://taskify-backend-fc3q.onrender.com/tasks/show', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setTask(response.data.lists);
      } else {
        toast.error("Login in first");
      }
    } catch (err) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskClick = (id) => {
    const select = task.find(item => item._id == id);
    setlistId(id);
    setTitle(select.title);
    setDescription(select.description);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Login first");
        return;
      }

      const response = await axios.delete(`https://taskify-backend-fc3q.onrender.com/tasks/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      getList();
      toast.success(response.data.message);
      setTitle('');
      setDescription('');
      setlistId(null);
    } catch (err) {
      toast.error(err.message);
    }
    finally{
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Please login");
        return;
      }

      const response = await axios.put(`https://taskify-backend-fc3q.onrender.com/tasks/update/${listID}`, {
        title, description
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      getList();
      setTitle('');
      setDescription('');
      setlistId(null);
      toast.success('Updated Successfully!');
    } catch (err) {
      toast.error(err.message);
    }
    finally{
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    try{
    const response = await axios.post('https://taskify-backend-fc3q.onrender.com/tasks/create', {
      title,
      description
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if(response.data.success)
      
    setTitle('');
    setDescription('');
    toast.success('List Created!'); 
    getList();
  }
  catch(err){
    toast.error("Failed to fetch");
  }
  finally{
    setLoading(false)
  }

}

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="spinner-container">
          <CircleLoader
            color="purple"
            size={200}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="dashboard-container">
          <div className="left-container">
            <h1>What's on your mind today?</h1>
            <form onSubmit={listID ? handleUpdate : handleCreate}>
              <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <textarea placeholder="Description" rows="10" cols="25" value={description} onChange={(e) => setDescription(e.target.value)} />
              <button className="green" name="create" type="submit">{listID ? 'Update' : 'Create'}</button>
            </form>
          </div>

          <div className="task-list-container">
            <h2>My Tasks</h2>
            <ul className="task-list">
              {task.length > 0 ? (
                task.map((item) => (
                  <li key={item._id} className="task-item" onClick={() => handleTaskClick(item._id)}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="btn-area">
                      <button className="red" name="delete" type="button" onClick={() => handleDelete(item._id)}>Delete</button>
                      <button className="blue" name="update" type="button" onClick={() => handleTaskClick(item._id)}>Update</button>
                    </div>
                  </li>
                ))
              ) : (
                <p>No tasks for now</p>
              )}
            </ul>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
