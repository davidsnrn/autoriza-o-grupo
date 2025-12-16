import { Student } from './types';

export const parseStudentData = (input: string): Student[] => {
  const lines = input.split('\n');
  const students: Student[] = [];

  lines.forEach((line) => {
    const cleanLine = line.trim();
    if (!cleanLine) return;

    // Try splitting by tab first, then multiple spaces, then comma
    let parts = cleanLine.split(/\t/);
    if (parts.length < 2) {
      parts = cleanLine.split(/\s{2,}/); // 2 or more spaces
    }
    if (parts.length < 2) {
      parts = cleanLine.split(',');
    }

    let id = parts[0] ? parts[0].trim() : '';
    let name = parts.slice(1).join(' ').trim();

    // Fallback: Check if first part looks like an ID (digits) and split manually if needed
    if (!name && id.length > 0) {
      const match = id.match(/^(\d+)\s+(.+)/);
      if (match) {
        id = match[1];
        name = match[2];
      } else if (!/^\d+$/.test(id)) {
        // If the "ID" isn't a number, assume the whole line is the name
        name = id;
        id = '';
      }
    }

    if (id || name) {
      students.push({ id, name });
    }
  });

  // Ensure at least one empty row if no data
  if (students.length === 0) {
    students.push({ id: '', name: '' });
  }

  return students;
};

export const getFormattedDate = (): string => {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString('pt-BR', { month: 'long' });
  const year = date.getFullYear();
  return `Nova Cruz/RN, ${day} de ${month} de ${year}.`;
};
