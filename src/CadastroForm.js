import React, { useState } from 'react';

function CadastroForm({ onCadastroSuccess }) {
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [contatos, setContatos] = useState([{ nome: '', telefone: '', email: '' }]);
  const [responseMessage, setResponseMessage] = useState('');

  const handleAddContato = () => {
    setContatos([...contatos, { nome: '', telefone: '', email: '' }]);
  };

  const handleContatoChange = (index, field, value) => {
    const updatedContatos = [...contatos];
    updatedContatos[index][field] = value;
    setContatos(updatedContatos);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const requestBody = {
      nome,
      cpf,
      dataNascimento,
      contatos
    };

    try {
      const response = await fetch('http://localhost:8080/api/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const responseData = await response.json();

      if (response.ok) {
        setResponseMessage(responseData.message);
        onCadastroSuccess();
      } else {
        setResponseMessage(responseData.message || 'Erro ao cadastrar pessoa');
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      setResponseMessage('Pessoa Cadastrada');
    }
  };

  return (
    <div>
      <h2>Cadastrar Pessoa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
        </div>
        <div>
          <label>CPF:</label>
          <input type="text" value={cpf} onChange={e => setCPF(e.target.value)} />
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <input
            type="text"
            value={dataNascimento}
            onChange={e => setDataNascimento(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={handleAddContato}>
            Adicionar Contato
          </button>
          {contatos.map((contato, index) => (
            <div key={index}>
              <label>Nome do Contato: </label>
              <input
                type="text"
                value={contato.nome}
                onChange={e => handleContatoChange(index, 'nome', e.target.value)}
              />
			  <div>
              <label>Telefone: </label>
              <input
                type="text"
                value={contato.telefone}
                onChange={e => handleContatoChange(index, 'telefone', e.target.value)}
              />
			  </div>
              <label>Email: </label>
              <input
                type="text"
                value={contato.email}
                onChange={e => handleContatoChange(index, 'email', e.target.value)}
              />
            </div>
          ))}
        </div>
        <button type="submit">Cadastrar Pessoa</button>
        <p>{responseMessage}</p>
      </form>
    </div>
  );

}

export default CadastroForm;
