import SearchBar from '../SearchBar/SearchBar';
import styles from './Header.module.css';

const Header = ({ searchQuery, onSearchChange, onNewTaskClick, theme, onThemeToggle }) => (
  <header className={styles.header}>
    <div className={styles.inner}>
      <div className={styles.logo}>
        <div className={styles.logoIcon} aria-hidden="true">✓</div>
        <div className={styles.logoText}>
          <p className={styles.logoTitle}>TaskFlow</p>
          <p className={styles.logoSub}>Management Dashboard</p>
        </div>
      </div>

      <div className={styles.searchWrap}>
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>

      <div className={styles.spacer} />

      <button
        className={styles.themeToggle}
        onClick={onThemeToggle}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <button className="btn-primary" onClick={onNewTaskClick} aria-label="Create new task">
        <span className={styles.plusIcon} aria-hidden="true">+</span>
        New Task
      </button>
    </div>
  </header>
);

export default Header;
