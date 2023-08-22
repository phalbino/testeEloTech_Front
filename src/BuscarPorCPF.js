import React, { useState } from 'react';

function BuscarPorCPF() {
  const [cpf, setCPF] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleCPFChange = e => {
    setCPF(e.target.value);
  };

  const handleCPFSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/pessoa/${cpf}`);
      const responseData = await response.json();
      
      console.log(responseData); // Verifique a resposta da API no console
      
      if (response.ok) {
        setResponseMessage(responseData.message);
        
        const pessoa = responseData.request.requestObjects.pessoa;
        
        setResponseData(pessoa);
      } else {
        setResponseMessage(responseData.message || 'Erro ao buscar pessoa');
        setResponseData(null);
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      setResponseMessage('CPF Não Localizado');
      setResponseData(null);
    }
  };

  return (
    <div>
      <h2>Buscar Pessoa por CPF</h2>
      <div>
        <label>CPF:</label>
        <input type="text" value={cpf} onChange={handleCPFChange} />
        <button type="button" onClick={handleCPFSearch}>Buscar</button>
      </div>
      <p>{responseMessage}</p>
      {responseData && (
        <div>
          <p>Nome: {responseData.nome || 'Nome não informado'}</p>
          <p>CPF: {responseData.cpf || 'CPF não informado'}</p>
          <p>Data de Nascimento: {responseData.dataNascimento || 'Data de nascimento não informada'}</p>
        </div>
      )}
    </div>
  );
}

export default BuscarPorCPF;
