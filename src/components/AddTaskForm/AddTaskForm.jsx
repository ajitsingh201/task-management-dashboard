import { useState, useRef, useEffect } from 'react';
import Avatar from '../common/Avatar';
import Spinner from '../common/Spinner';
import { validateTaskForm, generateId } from '../../utils/helpers';
import styles from './AddTaskForm.module.css';

const FormField = ({ label, error, children }) => (
  <div className={styles.field}>
    <label className={styles.label}>{label}</label>
    {children}
    {error && (
      <p className={styles.errorMsg} role="alert">
        ⚠ {error}
      </p>
    )}
  </div>
);

const AddTaskForm = ({ onAdd, onToast }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const titleRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => titleRef.current?.focus(), 80);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setUserId('');
    setErrors({});
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const { valid, errors: errs } = validateTaskForm({ title, userId });
    if (!valid) { setErrors(errs); return; }

    setSubmitting(true);

    setTimeout(() => {
      onAdd({
        id: generateId(),
        title: title.trim(),
        userId: parseInt(userId, 10),
        completed: false,
      });
      onToast('Task created successfully! 🎉', 'success');
      setSubmitting(false);
      handleClose();
    }, 380);
  };

  const clearError = (field) =>
    setErrors((prev) => ({ ...prev, [field]: '' }));

  const uidValid = userId && !errors.userId && /^\d+$/.test(userId) && Number(userId) >= 1;

  return (
    <div className={styles.wrapper} id="add-task-form">
      <button
        className={styles.toggle}
        onClick={() => (open ? handleClose() : setOpen(true))}
        aria-expanded={open}
        aria-controls="add-task-body"
        type="button"
      >
        <div className={styles.toggleLeft}>
          <div
            className={`${styles.toggleIcon} ${open ? styles.toggleIconOpen : ''}`}
            aria-hidden="true"
          >
            {open ? '−' : '+'}
          </div>
          <span className={styles.toggleLabel}>
            {open ? 'Close Form' : 'Create New Task'}
          </span>
        </div>

        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <form
          id="add-task-body"
          className={styles.body}
          onSubmit={handleSubmit}
          noValidate
          aria-label="Add new task form"
        >
          <div className={styles.fieldsRow}>
            <FormField label="Title *" error={errors.title}>
              <textarea
                ref={titleRef}
                className={`form-input ${errors.title ? 'error' : ''}`}
                value={title}
                onChange={(e) => { setTitle(e.target.value); clearError('title'); }}
                placeholder="Describe the task clearly… (min 5 chars)"
                rows={3}
                aria-required="true"
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? 'title-error' : undefined}
              />
            </FormField>

            <FormField label="User ID *" error={errors.userId}>
              <input
                className={`form-input ${errors.userId ? 'error' : ''}`}
                type="text"
                inputMode="numeric"
                value={userId}
                onChange={(e) => { setUserId(e.target.value); clearError('userId'); }}
                placeholder="e.g. 3"
                aria-required="true"
                aria-invalid={!!errors.userId}
              />
              {uidValid && (
                <div className={styles.avatarPreview}>
                  <Avatar userId={parseInt(userId, 10)} size={22} />
                  <span className={styles.avatarLabel}>User #{userId}</span>
                </div>
              )}
            </FormField>
          </div>

          <div className={styles.actions}>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting
                ? <><Spinner size={14} /> Creating…</>
                : <><span className={styles.plusIcon}>+</span> Add Task</>
              }
            </button>

            <button
              type="button"
              className="btn-ghost"
              onClick={handleClose}
              disabled={submitting}
            >
              Cancel
            </button>

            <span className={styles.localNote}>Stored locally</span>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTaskForm;
