import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import './Home.css';

const FILTERS = [
  { key: 'todas',     label: 'Todas' },
  { key: 'pendentes', label: 'Pendentes' },
  { key: 'concluidas', label: 'Concluídas' },
  { key: 'alta',      label: '↑ Alta prioridade' },
];

const Home = () => {
  const { tasks, stats } = useTasks();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('todas');
  const [search, setSearch] = useState('');

  // useMemo: recalcula a lista filtrada apenas quando tasks, filter ou search mudam
  const filteredTasks = useMemo(() => {
    let list = [...tasks];

    // Filtro de busca
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.desc.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    // Filtro de status/prioridade
    if (filter === 'pendentes')  list = list.filter((t) => !t.done);
    if (filter === 'concluidas') list = list.filter((t) => t.done);
    if (filter === 'alta')       list = list.filter((t) => t.priority === 'alta');

    return list;
  }, [tasks, filter, search]);

  return (
    <div className="home-page">
      {/* Cards de estatísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Concluídas</span>
          <span className="stat-value green">{stats.done}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Pendentes</span>
          <span className="stat-value amber">{stats.pending}</span>
        </div>
      </div>

      {/* Barra de progresso */}
      {stats.total > 0 && (
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">Progresso geral</span>
            <span className="progress-pct">{stats.progress}%</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${stats.progress}%` }}
              role="progressbar"
              aria-valuenow={stats.progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      )}

      {/* Cabeçalho da lista */}
      <div className="section-header">
        <h2 className="section-title">Minhas Tarefas</h2>
      </div>

      {/* Campo de busca */}
      <div className="search-box">
        <span className="search-icon">⌕</span>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por título, descrição ou categoria..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Buscar tarefas"
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch('')} aria-label="Limpar busca">
            ✕
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="filter-row" role="group" aria-label="Filtros de tarefa">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter-btn ${filter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Lista de tarefas */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">✦</div>
          <h3 className="empty-title">
            {tasks.length === 0 ? 'Nenhuma tarefa ainda' : 'Nada encontrado'}
          </h3>
          <p className="empty-sub">
            {tasks.length === 0
              ? 'Adicione sua primeira tarefa para começar.'
              : 'Tente outro filtro ou ajuste a busca.'}
          </p>
          {tasks.length === 0 && (
            <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/add-task')}>
              + Nova Tarefa
            </button>
          )}
        </div>
      ) : (
        <ul className="task-list" aria-label="Lista de tarefas">
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <TaskCard task={task} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
