import { useState, useEffect } from 'react';
import Badge from '../common/Badge';
import Avatar from '../common/Avatar';
import Spinner from '../common/Spinner';
import styles from './TaskModal.module.css';

const MetaCell = ({ label, children }) => (
  <div className={styles.metaCell}>
    <p className={styles.metaLabel}>{label}</p>
    <div className={styles.metaValue}>{children}</div>
  </div>
);

const TaskModal = ({ task, onClose, onToggle }) => {
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleToggle = async () => {
    if (toggling) return;
    setToggling(true);
    await onToggle(task.id, !task.completed);
    setToggling(false);
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
      aria-hidden="false"
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Task details: ${task.title}`}
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headerDot} aria-hidden="true" />
            <span className={styles.headerLabel}>Task Details</span>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.heroRow}>
            <Avatar userId={task.userId} size={44} />
            <div className={styles.heroText}>
              <p className={styles.heroSub}>Assigned to</p>
              <p className={styles.heroName}>User #{task.userId}</p>
            </div>
            <div className={styles.heroStatus}>
              <Badge completed={task.completed} />
            </div>
          </div>

          <div className={styles.section}>
            <p className={styles.sectionLabel}>Task Title</p>
            <p className={styles.taskTitle}>{task.title}</p>
          </div>

          <div className={styles.metaGrid}>
            <MetaCell label="Task ID">
              <span className={styles.monoVal}>#{task.id}</span>
            </MetaCell>
            <MetaCell label="User ID">
              <span className={styles.monoVal}>#{task.userId}</span>
            </MetaCell>
            <MetaCell label="Status">
              <Badge completed={task.completed} />
            </MetaCell>
            <MetaCell label="Source">
              <span className={styles.plainVal}>JSONPlaceholder</span>
            </MetaCell>
          </div>

          <button
            className={task.completed ? 'btn-danger' : 'btn-success'}
            onClick={handleToggle}
            disabled={toggling}
            aria-label={task.completed ? 'Mark task as pending' : 'Mark task as completed'}
          >
            {toggling ? (
              <><Spinner size={15} /> Updating…</>
            ) : task.completed ? (
              '↺  Revert to Pending'
            ) : (
              '✓  Mark as Completed'
            )}
          </button>

          <p className={styles.escHint}>
            Press{' '}
            <kbd className={styles.kbd}>Esc</kbd>
            {' '}to close
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
