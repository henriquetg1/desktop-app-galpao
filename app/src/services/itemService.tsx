import { Setor } from './setorService';
import { Galpao } from './galpaoService';

export interface Item {
    nome: string;
    setor: Setor[];
    posicao: string;
    quantidade: number;
    galpao: Galpao[];
  }
  
  export const createItem = async (item: Item): Promise<void> => {
    const response = await fetch('http://localhost:8080/itens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
  
    if (!response.ok) {
      throw new Error('Erro ao criar item');
    }
  };
  
  export const updateItem = async (id: string, item: Item): Promise<void> => {
    const response = await fetch(`http://localhost:8080/itens/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
  
    if (!response.ok) {
      throw new Error('Erro ao atualizar item');
    }
  };
  
  export const deleteItem = async (id: string): Promise<void> => {
    const response = await fetch(`http://localhost:8080/itens/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Erro ao excluir item');
    }
  };
  
  export const getItem = async (id: string): Promise<Item> => {
    const response = await fetch(`http://localhost:8080/itens/${id}`, {
      method: 'GET',
    });
  
    if (!response.ok) {
      throw new Error('Erro ao buscar item');
    }
  
    return response.json();
  };
  
  export const getItens = async (): Promise<Item[]> => {
    const response = await fetch('http://localhost:8080/itens', {
      method: 'GET',
    });
  
    if (!response.ok) {
      throw new Error('Erro ao buscar itens');
    }
  
    return response.json();
  };

