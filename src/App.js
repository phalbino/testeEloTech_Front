import React, { useState } from 'react';
import './App.css';
import PersonList from './PersonList';
import BuscarPorCPF from './BuscarPorCPF';
import AtualizarPessoa from './AtualizarPessoa';
import CadastroForm from './CadastroForm';
import DeletarPessoa from './DeletarPessoa'; // Importe o componente DeletarPessoa

function App() {
  const [selectedFunction, setSelectedFunction] = useState(null);

  const renderSelectedFunction = () => {
    switch (selectedFunction) {
      case 'list':
        return <PersonList />;
      case 'search':
        return <BuscarPorCPF />;
      case 'update':
        return <AtualizarPessoa />;
      case 'create':
        return <CadastroForm />;
      case 'delete': // Adicione a opção de deletar pessoa
        return <DeletarPessoa />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aplicação EloTech</h1>
        <div>
          <button onClick={() => setSelectedFunction('list')}>Listar Pessoas</button>
          <button onClick={() => setSelectedFunction('search')}>Buscar por CPF</button>
          <button onClick={() => setSelectedFunction('update')}>Atualizar Pessoa</button>
          <button onClick={() => setSelectedFunction('create')}>Cadastrar Pessoa</button>
          <button onClick={() => setSelectedFunction('delete')}>Deletar Pessoa</button>
        </div>
        <hr />
        {renderSelectedFunction()}
      </header>
    </div>
  );
}

export default App;
