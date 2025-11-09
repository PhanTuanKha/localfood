export interface User {
  username: string;
  password: string;
  role: 'customer' | 'admin' | 'vendor';
  phone?: string;
  email?: string;
  address?: string;
  description?: string;
  image?: string;
}

export let users: User[] = [{
    username: 'nicky', password: '123456', role: 'admin'},
    {
    username: 'user1', password: 'abcdef', role: 'customer'},
    {
    username: 'Tandoori Pizza London', password: 'yummypizzawithtandoori', role:'vendor'
    },
    {
      username: 'PhanTuanKha', password:'sauluoi', role: 'admin'
    },
    {
      username: 'gautruc', password: 'toichilaconca', role: 'customer'
    },
    {
      username: 'nakhongbietnauan', password: '1234', role: 'customer'
    }
]
export function addUser(newUser: User) {
  users.push(newUser);
}

export function checkLogin(username: string, password: string): User | null {
  return users.find(user => user.username === username && user.password === password) || null;
}