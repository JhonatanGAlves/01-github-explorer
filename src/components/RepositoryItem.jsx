import React from 'react'

const RepositoryItem = (props) => {
  return (
    <li>
      <strong>{props.repository.name ?? 'default'}</strong>
      <p>{props.repository.description}</p>

      <a href={props.repository.url}>
        Acessar repositório
      </a>
    </li>
  )
}

export default RepositoryItem