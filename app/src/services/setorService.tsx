import { Galpao } from './galpaoService';
import { Item } from './itemService';

export interface Setor {
    id: string;
    nome: string;
    galpao: Galpao;
    itens: Item[]; // Adiciona a propriedade itens
}

export const createSetor = async (galpaoId: string, setor: Setor): Promise<void> => {
    const response = await fetch(`http://localhost:8080/setores/galpao/${galpaoId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(setor),
    });

    if (!response.ok) {
        throw new Error('Erro ao cadastrar setor');
    }
};

export const updateSetor = async (id: string, setor: Setor): Promise<void> => {
    const response = await fetch(`http://localhost:8080/setores/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(setor),
    });

    if (!response.ok) {
        throw new Error('Erro ao atualizar setor');
    }
};

export const deleteSetor = async (id: string): Promise<void> => {
    const response = await fetch(`http://localhost:8080/setores/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Erro ao excluir setor');
    }
};

export const getSetor = async (id: string): Promise<Setor> => {
    const response = await fetch(`http://localhost:8080/setores/${id}`, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar setor');
    }

    const data = await response.json();
    console.log('getSetor data:', data); // Log dos dados recebidos
    return data;
};


export const buscarSetores = async (): Promise<Setor[]> => {
    const response = await fetch('http://localhost:8080/setores', {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar setores');
    }

    return response.json();
};

export const buscarSetoresPorGalpao = async (galpaoId: string): Promise<Setor[]> => {
    const response = await fetch(`http://localhost:8080/setores/galpao/${galpaoId}`, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar setores do galpão');
    }

    return response.json();
};
