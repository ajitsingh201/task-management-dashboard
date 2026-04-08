import styles from './Loader.module.css';

const SkeletonCard = () => (
  <div className={styles.card} aria-hidden="true">
    <div className={styles.topRow}>
      <div className={`skeleton ${styles.titleBar}`} />
      <div className={`skeleton ${styles.badgeBar}`} />
    </div>
    <div className={`skeleton ${styles.line}`} style={{ width: '88%' }} />
    <div className={`skeleton ${styles.line}`} style={{ width: '55%' }} />
    <div className={styles.divider} />
    <div className={styles.footer}>
      <div className={styles.footerLeft}>
        <div className={`skeleton ${styles.avatar}`} />
        <div className={`skeleton ${styles.line}`} style={{ width: 60 }} />
      </div>
      <div className={`skeleton ${styles.line}`} style={{ width: 42 }} />
    </div>
  </div>
);

const Loader = ({ count = 8 }) => (
  <div className={styles.grid} role="status" aria-label="Loading tasks…">
    <span className={styles.srOnly}>Loading tasks…</span>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default Loader;
