import styles from './Toast.module.css';

const TOAST_CONFIG = {
  success: { icon: '✓', colorVar: 'var(--color-green)', bgOpacity: 'rgba(34,197,94,0.1)', borderOpacity: 'rgba(34,197,94,0.28)' },
  error:   { icon: '✕', colorVar: 'var(--color-red)',   bgOpacity: 'rgba(239,68,68,0.1)', borderOpacity: 'rgba(239,68,68,0.28)' },
  info:    { icon: 'i', colorVar: 'var(--color-blue)',  bgOpacity: 'rgba(59,130,246,0.1)', borderOpacity: 'rgba(59,130,246,0.28)' },
  warn:    { icon: '!', colorVar: 'var(--color-amber)', bgOpacity: 'rgba(245,158,11,0.1)', borderOpacity: 'rgba(245,158,11,0.28)' },
};

const ToastItem = ({ toast }) => {
  const cfg = TOAST_CONFIG[toast.type] || TOAST_CONFIG.info;

  return (
    <div
      className={styles.toast}
      style={{ borderColor: cfg.borderOpacity }}
      role="alert"
      aria-live="assertive"
    >
      <div
        className={styles.iconWrap}
        style={{ background: cfg.bgOpacity, color: cfg.colorVar }}
      >
        {cfg.icon}
      </div>
      <span className={styles.message}>{toast.message}</span>
    </div>
  );
};

const ToastContainer = ({ toasts }) => {
  if (toasts.length === 0) return null;

  return (
    <div className={styles.container} aria-label="Notifications">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
};

export default ToastContainer;
