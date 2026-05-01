import React, { createContext, useState, useEffect, useContext } from 'react';

// Criação do contexto
export const TaskContext = createContext();

// Hook customizado para consumir o contexto com mais facilidade
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks deve ser usado dentro de um TaskProvider');
  }
  return context;
};

// Tarefas de exemplo para o primeiro acesso
const SAMPLE_TASKS = [
  {
    id: '1',
    title: 'Configurar o projeto React',
    desc: 'Usar Create React App e instalar dependências: react-router-dom.',
    priority: 'alta',
    category: 'Estudos',
    dueDate: '10/05/2026',
    done: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Estudar Context API',
    desc: 'Entender como criar e consumir contextos para gerenciar estado global.',
    priority: 'alta',
    category: 'Estudos',
    dueDate: '12/05/2026',
    done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Implementar React Router',
    desc: 'Configurar rotas para Home e Adicionar Tarefa usando BrowserRouter e Routes.',
    priority: 'media',
    category: 'Trabalho',
    dueDate: '14/05/2026',
    done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Revisar useEffect e useState',
    desc: 'Praticar os hooks fundamentais do React com exemplos do projeto.',
    priority: 'baixa',
    category: 'Estudos',
    dueDate: '',
    done: false,
    createdAt: new Date().toISOString(),
  },
];

const STORAGE_KEY = 'tarefas_app_v1';

// Provider que envolve a aplicação e disponibiliza o estado global
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // useEffect: carrega as tarefas do localStorage na montagem do componente
  useEffect(() => {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch {
        setTasks(SAMPLE_TASKS);
      }
    } else {
      // Primeira vez: carrega tarefas de exemplo
      setTasks(SAMPLE_TASKS);
    }
  }, []);

  // useEffect: salva as tarefas no localStorage sempre que o array mudar
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  // Adiciona uma nova tarefa ao início da lista
  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      done: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Remove uma tarefa pelo id
  const removeTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Atualiza os dados de uma tarefa existente
  const editTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? { ...task, ...updatedTask } : task))
    );
  };

  // Alterna o status de concluída/pendente
  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  // Estatísticas derivadas do estado
  const stats = {
    total: tasks.length,
    done: tasks.filter((t) => t.done).length,
    pending: tasks.filter((t) => !t.done).length,
    progress: tasks.length ? Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100) : 0,
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, editTask, toggleDone, stats }}>
      {children}
    </TaskContext.Provider>
  );
};
