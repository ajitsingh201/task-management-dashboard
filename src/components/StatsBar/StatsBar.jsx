import styles from './StatsBar.module.css';

const StatCard = ({ label, value, color, icon, sub }) => (
  <div className={styles.card}>
    <div className={styles.glow} style={{ background: `${color}12` }} />
    <div className={styles.cardInner}>
      <div>
        <p className={styles.cardLabel}>{label}</p>
        <p className={styles.cardValue} style={{ color }}>{value}</p>
        {sub && <p className={styles.cardSub}>{sub}</p>}
      </div>
      <div className={styles.cardIcon} style={{ background: `${color}18`, border: `1px solid ${color}28` }}>
        <span aria-hidden="true">{icon}</span>
      </div>
    </div>
  </div>
);

const ProgressCard = ({ done, total, pct }) => (
  <div className={styles.card}>
    <div className={styles.progressTop}>
      <p className={styles.cardLabel}>Progress</p>
      <p className={styles.progressPct}>{pct}%</p>
    </div>
    <div className={styles.track}>
      <div className={styles.fill} style={{ width: `${pct}%` }} />
    </div>
    <p className={styles.cardSub} style={{ marginTop: 8 }}>
      {done} of {total} tasks done
    </p>
  </div>
);

const StatsBar = ({ stats }) => {
  if (!stats || stats.total === 0) return null;

  return (
    <div className={styles.grid} role="region" aria-label="Task statistics">
      <StatCard
        label="Total Tasks"
        value={stats.total}
        color="#3B82F6"
        icon="📋"
        sub={`${stats.pct}% complete`}
      />
      <StatCard
        label="Completed"
        value={stats.done}
        color="#22C55E"
        icon="✅"
        sub="Tasks finished"
      />
      <StatCard
        label="Pending"
        value={stats.pending}
        color="#F59E0B"
        icon="⏳"
        sub="In progress"
      />
      <ProgressCard done={stats.done} total={stats.total} pct={stats.pct} />
    </div>
  );
};

export default StatsBar;
