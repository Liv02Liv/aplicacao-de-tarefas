import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import './App.css';

const App = () => {
  return (
    <Router>
      {/* TaskProvider envolve as rotas para que todas as páginas
          tenham acesso ao estado global das tarefas */}
      <TaskProvider>
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-task" element={<AddTask />} />
              <Route path="/edit-task/:id" element={<EditTask />} />
            </Routes>
          </main>
        </div>
      </TaskProvider>
    </Router>
  );
};

export default App;
