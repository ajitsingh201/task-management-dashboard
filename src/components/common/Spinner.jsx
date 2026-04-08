const Spinner = ({ size = 16 }) => (
  <span
    style={{
      display: 'inline-block',
      width: size,
      height: size,
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'spin 0.65s linear infinite',
      flexShrink: 0,
    }}
    aria-hidden="true"
  />
);

export default Spinner;
