export interface Galpao {
    nome: string;
    endereco: string;
  }
  
  export const createGalpao = async (galpao: Galpao): Promise<void> => {
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
  