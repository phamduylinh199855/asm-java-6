export interface User {
  id?: number;
  username: string;
  password: string;
  roles: string[]; // e.g. ['USER', 'ADMIN']
}
