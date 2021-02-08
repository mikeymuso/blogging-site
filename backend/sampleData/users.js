import bcrypt from 'bcryptjs';

export const sampleUsers = [
  {
    username: 'Admin user',
    password: bcrypt.hashSync('123456', 10),
    firstName: 'Mike',
    lastName: 'Cotton',
    email: 'admin@example.com',
    isAdmin: true,
    dateCreated: Date.now(),
  },
  {
    username: 'John',
    password: bcrypt.hashSync('123456', 10),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    isAdmin: false,
    dateCreated: Date.now(),
  },
  {
    username: 'Jane',
    password: bcrypt.hashSync('123456', 10),
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    isAdmin: false,
    dateCreated: Date.now(),
  },
];
