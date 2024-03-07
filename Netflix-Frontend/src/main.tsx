import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import axios from 'axios'


const baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.baseURL = baseURL;

ReactDOM.createRoot(document.getElementById('root')!).render(


    <App />

)