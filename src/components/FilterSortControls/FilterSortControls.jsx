import styles from './FilterSortControls.module.css';

const FilterSortControls = ({
  filterStatus,
  onFilterChange,
  sortOrder,
  onSortChange,
  counts,
  hasActiveFilter,
  onClearAll,
}) => {
  const filters = [
    { key: 'all', label: 'All', count: counts.total },
    { key: 'completed', label: 'Completed', count: counts.done },
    { key: 'pending', label: 'Pending', count: counts.pending },
  ];

  return (
    <div className={styles.bar}>
      <div className={styles.chips} role="group" aria-label="Filter tasks">
        {filters.map(({ key, label, count }) => (
          <button
            key={key}
            className={`chip ${filterStatus === key ? 'active' : 'inactive'}`}
            onClick={() => onFilterChange(key)}
            aria-pressed={filterStatus === key}
          >
            {label}
            <span className={styles.count}>{count}</span>
          </button>
        ))}
      </div>

      <div className={styles.right}>
        <label className={styles.sortLabel} htmlFor="sort-select">Sort</label>
        <select
          id="sort-select"
          className={styles.select}
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort tasks"
        >
          <option value="none">Default</option>
          <option value="az">Title A → Z</option>
          <option value="za">Title Z → A</option>
        </select>

        {hasActiveFilter && (
          <button
            className={styles.clearBtn}
            onClick={onClearAll}
            aria-label="Clear all filters"
          >
            ✕ Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterSortControls;
