const API_BASE = 'https://jsonplaceholder.typicode.com';

export const fetchTodos = async () => {
  const response = await fetch(`${API_BASE}/todos`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: Failed to fetch tasks.`);
  }
  const data = await response.json();
  return data.slice(0, 100);
};

export const updateTodo = (id, patch) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.18) {
        reject(new Error('Server error (simulated). Changes rolled back.'));
      } else {
        resolve({ id, ...patch });
      }
    }, 900);
  });
