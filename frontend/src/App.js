import React, { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [sql, setSql] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSql('');

    try {
      const response = await fetch('http://localhost:3001/api/sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setSql(data.sql);
    } catch (error) {
      console.error('Error fetching SQL:', error);
      setSql('Error fetching SQL. Please check the console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Vanna.AI (Mock)</h1>
        <p>Ask a question, get a SQL query.</p>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question..."
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Generate SQL'}
          </button>
        </form>
        {sql && (
          <div className="result">
            <h2>Generated SQL:</h2>
            <pre>{sql}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;