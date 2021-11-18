import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';

const persons = [
  { 
    name: 'Arto Hellas',
    number: '044 1245678',
    id: 1
  },
  { name: 'Ada Lovelace', number: '39-44-5323523'},
  { name: 'Dan Abramov', number: '12-43-234345'},
  { name: 'Mary Poppendieck', number: '39-23-6423122'},
]

ReactDOM.render(
  <App persons={persons} />,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

