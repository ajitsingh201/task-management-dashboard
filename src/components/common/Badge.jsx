const Badge = ({ completed, size = 'md' }) => {
  const isSmall = size === 'sm';

  const styles = {
    wrapper: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: isSmall ? 4 : 5,
      padding: isSmall ? '2px 9px' : '4px 12px',
      borderRadius: 9999,
      fontSize: isSmall ? 11 : 12,
      fontWeight: 600,
      letterSpacing: '0.025em',
      whiteSpace: 'nowrap',
      flexShrink: 0,
      background: completed ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
      color: completed ? '#22C55E' : '#F59E0B',
      border: `1px solid ${completed ? 'rgba(34,197,94,0.25)' : 'rgba(245,158,11,0.25)'}`,
    },
    dot: {
      width: isSmall ? 5 : 6,
      height: isSmall ? 5 : 6,
      borderRadius: '50%',
      background: 'currentColor',
      display: 'inline-block',
      animation: completed ? undefined : 'pulse 2s infinite',
    },
  };

  return (
    <span style={styles.wrapper}>
      <span style={styles.dot} />
      {completed ? 'Completed' : 'Pending'}
    </span>
  );
};

export default Badge;
