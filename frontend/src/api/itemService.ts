import axios from "axios";

const API_URL = "http://localhost:3000/api/item"; //local Api

export const createItem = async (item: { name: string; description: string; price: number }) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

export const getAllItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateItem = async (id: number, updatedItem: { name: string; description: string; price: number }) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedItem);
  return response.data;
};

export const deleteItem = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

