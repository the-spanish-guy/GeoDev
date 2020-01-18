import React, { useState, useEffect } from 'react';
import api from './services/api';

import './root.css';
import './App.css';
import './Sidebar.css'
import './Main.css'
import DevItem from './components/DevItem/index'
import DevForm from './components/DevForm/index'

function App() {

  //state for search devs
  const [ devs, setDevs ] = useState([])
  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');
      console.log(response)
      setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)
    /**
     * A cada novo dev adicionado ele irá retornar os devs que já existem
     * mais o dev que acabou de ser cadastrado
     */
    setDevs([...devs, response.data])
    console.log(response.data)
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
