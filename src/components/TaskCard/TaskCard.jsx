import Badge from '../common/Badge';
import Avatar from '../common/Avatar';
import styles from './TaskCard.module.css';

const TaskCard = ({ task, onClick, index }) => {
  const staggerDelay = `${Math.min(index * 0.045, 0.28)}s`;

  return (
    <article
      className={styles.card}
      style={{ animationDelay: staggerDelay }}
      onClick={() => onClick(task)}
      onKeyDown={(e) => e.key === 'Enter' && onClick(task)}
      role="button"
      tabIndex={0}
      aria-label={`Open details for task: ${task.title}`}
    >
      <div className={styles.shimmerLine} aria-hidden="true" />

      <div className={styles.topRow}>
        <p className={styles.title}>{task.title}</p>
        <Badge completed={task.completed} size="sm" />
      </div>

      <div className={styles.divider} />

      <div className={styles.footer}>
        <div className={styles.userInfo}>
          <Avatar userId={task.userId} size={28} />
          <div className={styles.userText}>
            <span className={styles.userLabel}>Assigned to</span>
            <span className={styles.userId}>User #{task.userId}</span>
          </div>
        </div>
        <span className={styles.taskId}>#{task.id}</span>
      </div>
    </article>
  );
};

export default TaskCard;
