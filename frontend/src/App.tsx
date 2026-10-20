import { useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState(null);

  fetch("http://localhost:5000/health")
    .then(res => res.json())
    .then(data => setUser(data));

    console.log(user)

  return <div>
    <h1>Hello world</h1>
    <div>{user}</div>
  </div>;

}

export default App
