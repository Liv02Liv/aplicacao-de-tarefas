# ✦ Aplicação de Tarefas

Aplicação React para gerenciamento de tarefas (to-do list) com múltiplas páginas, estado global e persistência de dados.

## Funcionalidades

- **Adicionar** tarefas com título, descrição, prioridade, categoria e data limite
- **Visualizar** lista de tarefas com estatísticas e barra de progresso
- **Editar** tarefas existentes em uma página dedicada
- **Excluir** tarefas com confirmação
- **Concluir / reabrir** tarefas com um clique
- **Filtrar** por status (todas, pendentes, concluídas, alta prioridade)
- **Buscar** por título, descrição ou categoria
- **Persistência** automática via `localStorage`

## Conceitos praticados

| Conceito | Onde |
|---|---|
| `useState` | Gerencia estado local (filtros, busca, formulário) |
| `useEffect` | Carrega e salva tarefas no localStorage |
| `useContext` | Acessa o estado global via hook `useTasks()` |
| `useMemo` | Recalcula a lista filtrada de forma otimizada |
| `Context API` | `TaskContext` compartilha tarefas entre todas as páginas |
| `React Router v6` | Navegação entre Home, AddTask e EditTask |
| `useParams` | Obtém o `id` da tarefa na rota de edição |
| `useNavigate` | Redirecionamento programático após ações |

## Estrutura do projeto

```
src/
├── context/
│   └── TaskContext.js       ← Contexto global (createContext, useState, useEffect)
├── pages/
│   ├── Home.js              ← Lista de tarefas, filtros e estatísticas
│   ├── AddTask.js           ← Formulário para nova tarefa
│   └── EditTask.js          ← Formulário de edição (rota /edit-task/:id)
├── components/
│   ├── Navbar.js            ← Barra de navegação com links ativos
│   ├── TaskCard.js          ← Card individual com ações de editar/excluir/concluir
│   └── TaskForm.js          ← Formulário reutilizável (usado em AddTask e EditTask)
├── App.js                   ← Router + TaskProvider + rotas
└── index.js                 ← Ponto de entrada
```

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- npm (incluso com o Node.js)

### Instalação e execução

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/aplicacao-de-tarefas.git

# 2. Acesse o diretório
cd aplicacao-de-tarefas

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm start
```

A aplicação estará disponível em `http://localhost:3000`.

### Build para produção

```bash
npm run build
```

## Tecnologias utilizadas

- [React 18](https://react.dev/)
- [React Router DOM v6](https://reactrouter.com/)
- [Context API](https://react.dev/reference/react/createContext)
- CSS puro (sem frameworks de UI)
- localStorage para persistência

## Rotas

| Rota | Página | Descrição |
|---|---|---|
| `/` | Home | Lista de tarefas, filtros e busca |
| `/add-task` | AddTask | Formulário para nova tarefa |
| `/edit-task/:id` | EditTask | Formulário para editar tarefa existente |
