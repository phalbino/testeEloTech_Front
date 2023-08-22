import React, { useState, useEffect } from 'react';
import './PersonList.css'; // Importe o arquivo de estilos personalizados

function PersonList() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/pessoas')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar pessoas');
        }
        return response.json();
      })
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar pessoas:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading">Carregando...</p>; // Aplicando o estilo de carregamento
  }

  return (
    <div className="person-list-container">
      <h2 className="person-list-title">Lista de Pessoas</h2>
      <ul className="person-list">
        {people.map(person => (
          <li key={person.id} className="person-item">
            <p className="person-info">Nome: {person.nome || 'Nome não informado'}</p>
            <p className="person-info">CPF: {person.cpf.replace(/[^\d]/g, '')}</p>
            <p className="person-info">Data de Nascimento: {person.dataNascimento}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PersonList;
