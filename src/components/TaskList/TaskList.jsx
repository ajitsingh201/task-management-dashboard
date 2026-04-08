import TaskCard from '../TaskCard/TaskCard';
import styles from './TaskList.module.css';

const EmptyState = ({ query, onClear }) => (
  <div className={styles.empty} role="status" aria-live="polite">
    <div className={styles.emptyIcon} aria-hidden="true">📭</div>
    <p className={styles.emptyTitle}>No tasks found</p>
    <p className={styles.emptyDesc}>
      {query
        ? `No tasks match "${query}". Try different keywords.`
        : 'No tasks match the current filters.'}
    </p>
    <button className="btn-ghost" onClick={onClear}>
      Clear all filters
    </button>
  </div>
);

const TaskList = ({ tasks, onTaskClick, query, onClear }) => {
  if (tasks.length === 0) {
    return <EmptyState query={query} onClear={onClear} />;
  }

  return (
    <div
      className={styles.grid}
      role="list"
      aria-label={`${tasks.length} tasks`}
    >
      {tasks.map((task, index) => (
        <div key={task.id} role="listitem">
          <TaskCard task={task} onClick={onTaskClick} index={index} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
