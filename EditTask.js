import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import './FormPage.css';

const EditTask = () => {
  const { id } = useParams();
  const { tasks, editTask } = useTasks();
  const navigate = useNavigate();

  // Busca a tarefa pelo id da rota
  const task = tasks.find((t) => t.id === id);

  // useEffect: redireciona se a tarefa não existir (ex: URL digitada manualmente)
  useEffect(() => {
    if (tasks.length > 0 && !task) {
      navigate('/');
    }
  }, [task, tasks, navigate]);

  if (!task) return null;

  const handleSubmit = (values) => {
    editTask({ ...task, ...values });
    navigate('/');
  };

  return (
    <div className="form-page">
      <div className="form-page-header">
        <h1 className="form-page-title">Editar Tarefa</h1>
        <p className="form-page-sub">Altere os campos desejados e salve.</p>
      </div>

      <div className="form-card">
        <TaskForm
          initialValues={{
            title: task.title,
            desc: task.desc,
            priority: task.priority,
            category: task.category,
            dueDate: task.dueDate,
          }}
          onSubmit={handleSubmit}
          submitLabel="Salvar Alterações"
        />
      </div>
    </div>
  );
};

export default EditTask;
