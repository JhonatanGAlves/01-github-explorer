import { render } from 'react-dom'
import { App } from './App'

/* render, é uma função que recebe 2 parâmetros, o primeiro é o que eu quero que seja renderizado e o segundo é onde eu quero que isso seja renderizado, ou seja, todo o conteúdo do component App será renderizado dentro da id root, que é o nome de um id de um div que está dentro do arquivo index.html, que é o arquivo responsável por exibir no browser todo o conteúdo da minha aplicação. */
render(<App />, document.getElementById('root'))