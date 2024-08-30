export interface Galpao {
  id: string;
  nome: string;
  endereco: string;
  setores?: Setor[];  // Adiciona a propriedade setores
}

import { buscarSetoresPorGalpao } from './setorService';
import { Setor } from './setorService';

export const createGalpao = async (galpao: Omit<Galpao, 'id'>): Promise<Galpao> => {
  const response = await fetch('http://localhost:8080/galpoes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(galpao),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar galpão');
  }

  const createdGalpao = await response.json();
  return createdGalpao;  // Retorna o galpão criado com o id gerado
};

export const updateGalpao = async (id: string, galpao: Galpao): Promise<void> => {
  const response = await fetch(`http://localhost:8080/galpoes/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(galpao),
  });

  if (!response.ok) {
      throw new Error('Erro ao atualizar galpão');
  }
};

export const deleteGalpao = async (id: string): Promise<void> => {
  const response = await fetch(`http://localhost:8080/galpoes/${id}`, {
      method: 'DELETE',
  });

  if (!response.ok) {
      throw new Error('Erro ao excluir galpão');
  }
};

export const getGalpao = async (id: string): Promise<Galpao> => {
  const response = await fetch(`http://localhost:8080/galpoes/${id}`, {
      method: 'GET',
  });

  if (!response.ok) {
      throw new Error('Erro ao buscar galpão');
  }

  const galpao = await response.json();
  galpao.setores = await buscarSetoresPorGalpao(id);  // Busca os setores
  return galpao;
};
