
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


export let users: User[] = [
  {
    username: 'nicky',
    password: '123456',
    role: 'admin',
    phone: '+84987654321',
    email: 'nicky.admin@localfood.com'
  },
  {
    username: 'user1',
    password: 'abcdef',
    role: 'customer',
    phone: '+84123456789',
    email: 'user1@gmail.com'
  },
  {
    username: 'Tandoori Pizza London',
    password: 'yummypizzawithtandoori',
    role: 'vendor',
    phone: '+84123459999',
    email: 'contact@tandooripizza.vn',
    address: '45 Lê Duẩn, Quận 1, TP.HCM',
    description: 'Nhà hàng chuyên các món pizza mang phong cách Ý.',
    image: 'assets/images/vendors/tandoori_pizza.png'
  },
  {
    username: 'PhanTuanKha',
    password: 'sauluoi',
    role: 'admin',
    phone: '+84991234567',
    email: 'phantuankha@uel.edu.vn'
  },
  {
    username: 'gautruc',
    password: 'toichilaconca',
    role: 'customer',
    phone: '+84777777777',
    email: 'gautruc@gmail.com'
  },
  {
    username: 'nakhongbietnauan',
    password: '1234',
    role: 'customer',
    phone: '+84888888888',
    email: 'na@gmail.com'
  }
];

export function addUser(newUser: User) {
  users.push(newUser);
}

export function checkLogin(username: string, password: string): User | null {
  return users.find(user => user.username === username && user.password === password) || null;
}
