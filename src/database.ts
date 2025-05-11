type User = {
  age: number;
  hobbies: string[];
  id?: string;
  username: string;
};

export const usersDB: User[] = [{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "age": 25,
  "hobbies": ["fly"],
  "username": "Alex"
}]