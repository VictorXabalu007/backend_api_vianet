import { kknex } from "../db/database.js";

// Função para obter um usuário por email
export function getUserByEmail(email) {
  try {
    const user = kknex('Usuario').where({
      email
    }).first();
    return user;
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    throw error;
  }
}
export function getUserByID(id) {
  try {
    const user = kknex('Usuario').where({
      id
    }).first();
    return user;
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    throw error;
  }
}

//vai mostrar as informaçoes
//ainda n funciona
export async function getInformationByID(id) {
  try {
    const user = await kknex('Usuario').where({
      id
    }).first();
    return user;
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    throw error;
  }
}
