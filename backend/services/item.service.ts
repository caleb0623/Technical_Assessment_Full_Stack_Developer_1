// export const getAllItems = async () => {
//   return [
//     {
//       id: 1,
//       name: 'Item 1',
//       price: 100,
//     },
//     {
//       id: 2,
//       name: 'Item 2',
//       price: 200,
//     },
//   ];
// }

import pool from '../db.config'; 

//get all items
export const getAllItems = async () => {
  const [rows] = await pool.query('SELECT * FROM items');
  return rows;
};

//create item
export const createItem = async (name: string, description: string, price: number) => {
  const [result] = await pool.query(
    'INSERT INTO items (name, description, price) VALUES (?, ?, ?)',
    [name, description, price]
  );
  return { id: result, name, description, price };
};


//getitem by ID
export const getItemById = async (id: number) => {
  const [rows] = await pool.query('SELECT * FROM items WHERE id = ?', [id]);
  return rows;
};

//update item
export const updateItem = async (id: number, name: string, description: string, price: number) => {
  const [result] = await pool.query(
    'UPDATE items SET name = ?, description = ?, price = ? WHERE id = ?',
    [name, description, price, id]
  );
  return result;
};

//delete item
export const deleteItem = async (id: number) => {
  const [result] = await pool.query('DELETE FROM items WHERE id = ?', [id]);
  return result;
};
