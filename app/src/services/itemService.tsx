import { Setor } from './setorService';
import { Galpao } from './galpaoService';

export interface Item {
  id: string;
  nome: string;
  posicao: string;
  quantidade: number;
  setor: Setor;
  galpao: Galpao;
}
  
  export const createItem = async (setorId: string, item: Item): Promise<void> => {
    const response = await fetch(`http://localhost:8080/itens/setor/${setorId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
  
    if (!response.ok) {
      throw new Error('Erro ao cadastrar item');
    }
  }
  
  export const updateItem = async (itemId: string, item: Item): Promise<void> => {
    const response = await fetch(`http://localhost:8080/itens/editar/${itemId}`, {
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
  
  export const deleteItem = async (itemId: string): Promise<void> => {
    const response = await fetch(`http://localhost:8080/itens/${itemId}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Erro ao excluir item');
    }
  };
  
  export const getItem = async (itemId: string): Promise<Item> => {
    const response = await fetch(`http://localhost:8080/itens/${itemId}`, {
      method: 'GET',
    });
  
    if (!response.ok) {
      throw new Error('Erro ao buscar item');
    }
  
    return response.json();
  };
  
  export const getItensPorSetor = async (setorId: string): Promise<Item[]> => {
    const response = await fetch(`http://localhost:8080/itens/setor/${setorId}`, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar itens');
    }

    const data = await response.json();
    console.log('getItensPorSetor data:', data); // Log dos dados recebidos
    return data;
};

