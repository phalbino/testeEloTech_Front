import React, { useState } from 'react';

function AtualizarPessoa() {
  const [cpf, setCPF] = useState('');
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleCPFChange = e => {
    setCPF(e.target.value);
  };

  const handleSubmit = async () => {
    const requestBody = {
      nome,
      dataNascimento,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/pessoa/${cpf}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (response.ok) {
        setResponseMessage(responseData.message);
      } else {
        setResponseMessage(responseData.message || 'Erro ao atualizar pessoa');
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      setResponseMessage('Erro ao fazer a requisição');
    }
  };

  return (
    <div>
      <h2>Atualizar Pessoa</h2>
      <div>
        <label>CPF:</label>
        <input type="text" value={cpf} onChange={handleCPFChange} />
      </div>
      <div>
        <label>Novo Nome:</label>
        <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
      </div>
      <div>
        <label>Nova Data de Nascimento:</label>
        <input
          type="text"
          value={dataNascimento}
          onChange={e => setDataNascimento(e.target.value)}
        />
      </div>
      <button type="button" onClick={handleSubmit}>Atualizar Pessoa</button>
      <p>{responseMessage}</p>
    </div>
  );
}

export default AtualizarPessoa;
