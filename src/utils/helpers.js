let _nextId = 1000;
export const generateId = () => ++_nextId;

export const userHue  = (uid) => (uid * 67 + 17) % 360;
export const avatarBg = (uid) => `hsl(${userHue(uid)}, 52%, 38%)`;
export const avatarFg = (uid) => `hsl(${userHue(uid)}, 75%, 85%)`;

export const applyFilters = (tasks, query, status, sort) => {
  let result = [...tasks];

  if (query.trim()) {
    const q = query.toLowerCase().trim();
    result = result.filter((t) => t.title.toLowerCase().includes(q));
  }

  if (status === 'completed') result = result.filter((t) => t.completed);
  if (status === 'pending')   result = result.filter((t) => !t.completed);

  if (sort === 'az') result.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === 'za') result.sort((a, b) => b.title.localeCompare(a.title));

  return result;
};

export const validateTaskForm = ({ title, userId }) => {
  const errors = {};
  const t = (title  || '').trim();
  const u = (userId || '').toString().trim();

  if (!t)                     errors.title  = 'Title is required.';
  else if (t.length < 5)      errors.title  = 'Title must be at least 5 characters.';

  if (!u)                     errors.userId = 'User ID is required.';
  else if (!/^\d+$/.test(u))  errors.userId = 'User ID must be a positive integer.';
  else if (Number(u) < 1)     errors.userId = 'User ID must be ≥ 1.';

  return { valid: Object.keys(errors).length === 0, errors };
};

export const computeStats = (tasks) => {
  const total   = tasks.length;
  const done    = tasks.filter((t) => t.completed).length;
  const pending = total - done;
  const pct     = total ? Math.round((done / total) * 100) : 0;
  return { total, done, pending, pct };
};
