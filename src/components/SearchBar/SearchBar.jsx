import { useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ value, onChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className={styles.wrapper}>
      <svg
        className={styles.icon}
        width="15" height="15" viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>

      <input
        ref={inputRef}
        className={`form-input ${styles.input}`}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tasks…  ⌘K"
        aria-label="Search tasks by title"
        spellCheck={false}
      />

      {value && (
        <button
          className={styles.clearBtn}
          onClick={() => onChange('')}
          aria-label="Clear search"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
