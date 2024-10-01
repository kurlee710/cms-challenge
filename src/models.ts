// src/models.ts
export interface Department {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  title: string;
  salary: number;
  department_id: number;
}
