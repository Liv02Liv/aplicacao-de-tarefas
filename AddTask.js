import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import './FormPage.css';

const AddTask = () => {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    addTask(values);
    navigate('/');
  };

  return (
    <div className="form-page">
      <div className="form-page-header">
        <h1 className="form-page-title">Nova Tarefa</h1>
        <p className="form-page-sub">Preencha os campos abaixo para adicionar uma tarefa.</p>
      </div>

      <div className="form-card">
        <TaskForm onSubmit={handleSubmit} submitLabel="Adicionar Tarefa" />
      </div>
    </div>
  );
};

export default AddTask;
