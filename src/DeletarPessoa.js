import React, { useState } from 'react';

function DeletarPessoa() {
  const [cpf, setCPF] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/pessoa/${cpf}`, {
        method: 'DELETE',
      });

      const responseData = await response.json();

      if (response.ok) {
        setResponseMessage(responseData.message);
      } else {
        setResponseMessage(responseData.message || 'Erro ao excluir pessoa');
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      setResponseMessage('Erro ao fazer a requisição');
    }
  };

  return (
    <div>
      <h2>Excluir Pessoa por CPF</h2>
      <div>
        <label>CPF:</label>
        <input type="text" value={cpf} onChange={e => setCPF(e.target.value)} />
      </div>
      <button onClick={handleDelete}>Excluir Pessoa</button>
      <p>{responseMessage}</p>
    </div>
  );
}

export default DeletarPessoa;
