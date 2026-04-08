import { useState, useEffect, useMemo, useCallback } from 'react';

import { fetchTodos, updateTodo } from './services/api';
import { applyFilters, computeStats } from './utils/helpers';

import useDebounce from './hooks/useDebounce';
import useToast from './hooks/useToast';

import Header from './components/Header/Header';
import StatsBar from './components/StatsBar/StatsBar';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import FilterSortControls from './components/FilterSortControls/FilterSortControls';
import TaskList from './components/TaskList/TaskList';
import TaskModal from './components/TaskModal/TaskModal';
import Loader from './components/Loader/Loader';
import ToastContainer from './components/Toast/Toast';

const ErrorBanner = ({ message, onRetry }) => (
  <div style={{
    background: 'rgba(239,68,68,0.08)',
    border: '1px solid rgba(239,68,68,0.22)',
    borderRadius: 12, padding: '20px 24px',
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', gap: 16,
    animation: 'slideDown 0.25s ease',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: 'rgba(239,68,68,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, flexShrink: 0,
      }}>⚠️</div>
      <div>
        <p style={{ color: '#EF4444', fontWeight: 700, fontSize: 14, margin: 0 }}>
          Failed to load tasks
        </p>
        <p style={{ color: '#94A3B8', fontSize: 13, margin: '3px 0 0' }}>{message}</p>
      </div>
    </div>
    <button className="btn-ghost" onClick={onRetry} style={{ flexShrink: 0 }}>
      ↻ Retry
    </button>
  </div>
);

const ResultsMeta = ({ shown, total, query }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
    <p style={{ color: '#4B5563', fontSize: 13, margin: 0 }}>
      Showing{' '}
      <strong style={{ color: '#94A3B8' }}>{shown}</strong>
      {' '}of{' '}
      <strong style={{ color: '#94A3B8' }}>{total}</strong>
      {' '}tasks
    </p>
    {query && (
      <span style={{
        fontSize: 12, color: '#3B82F6',
        background: 'rgba(59,130,246,0.1)',
        border: '1px solid rgba(59,130,246,0.22)',
        borderRadius: 9999, padding: '2px 10px',
      }}>
        "{query}"
      </span>
    )}
  </div>
);

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('none');
  const [selectedTask, setSelectedTask] = useState(null);
  const [fetchTick, setFetchTick] = useState(0);

  const { toasts, push: toast } = useToast();
  const debouncedQuery = useDebounce(searchQuery, 350);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchTodos()
      .then((data) => {
        if (!cancelled) {
          setTasks(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [fetchTick]);

  const displayedTasks = useMemo(
    () => applyFilters(tasks, debouncedQuery, filterStatus, sortOrder),
    [tasks, debouncedQuery, filterStatus, sortOrder]
  );

  const stats = useMemo(() => computeStats(tasks), [tasks]);

  const handleAddTask = useCallback((newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const handleToggleTask = useCallback(async (id, newStatus) => {
    const optimisticFlip = (prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: newStatus } : t));

    setTasks(optimisticFlip);
    setSelectedTask((prev) =>
      prev?.id === id ? { ...prev, completed: newStatus } : prev
    );

    try {
      await updateTodo(id, { completed: newStatus });
      toast(
        newStatus ? 'Task marked as completed! 🎉' : 'Task marked as pending.',
        'success'
      );
    } catch (err) {
      const revert = (prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !newStatus } : t));

      setTasks(revert);
      setSelectedTask((prev) =>
        prev?.id === id ? { ...prev, completed: !newStatus } : prev
      );
      toast('Update failed — changes rolled back.', 'error');
    }
  }, [toast]);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setFilterStatus('all');
    setSortOrder('none');
  }, []);

  const handleNewTaskClick = useCallback(() => {
    document.getElementById('add-task-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const hasActiveFilter = debouncedQuery || filterStatus !== 'all' || sortOrder !== 'none';

  return (
    <>
      <div className="dot-bg" aria-hidden="true" />
      <div className="ambient-glow-left" aria-hidden="true" />
      <div className="ambient-glow-right" aria-hidden="true" />

      <div className="page-wrapper">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNewTaskClick={handleNewTaskClick}
        />

        <main className="main-content" id="main">
          {!loading && !error && <StatsBar stats={stats} />}

          <AddTaskForm onAdd={handleAddTask} onToast={toast} />

          <FilterSortControls
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            counts={{ total: stats.total, done: stats.done, pending: stats.pending }}
            hasActiveFilter={!!hasActiveFilter}
            onClearAll={handleClearFilters}
          />

          {!loading && !error && (
            <ResultsMeta
              shown={displayedTasks.length}
              total={tasks.length}
              query={debouncedQuery}
            />
          )}

          {error && (
            <ErrorBanner
              message={error}
              onRetry={() => setFetchTick((t) => t + 1)}
            />
          )}

          {loading && <Loader count={8} />}

          {!loading && !error && (
            <TaskList
              tasks={displayedTasks}
              onTaskClick={setSelectedTask}
              query={debouncedQuery}
              onClear={handleClearFilters}
            />
          )}
        </main>
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onToggle={handleToggleTask}
        />
      )}

      <ToastContainer toasts={toasts} />
    </>
  );
};

export default App;
