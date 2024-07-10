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
  
export const getItensPorSetor = async (setorId: string): Promise<Item[]> => {
    const response = await fetch(`http://localhost:8080/itens/setor/${setorId}`, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar itens');
    }

    return response.json();
};

