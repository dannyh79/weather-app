import React from 'react';

const api = {
  key: '664eac603809f1426027912a55140749',
  url: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  return (
    <div className="app">
      <main className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Type in the city name to search..."
        />
      </main>
    </div>
  );
}

export default App;
