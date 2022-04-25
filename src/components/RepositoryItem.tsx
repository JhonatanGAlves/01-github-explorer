import React from 'react'

type RepositoryItemProps = {
  repository: {
    name: string
    description: string
    url: string
  }
}

const RepositoryItem = (props: RepositoryItemProps) => {
  return (
    <li>
      <strong>{props.repository.name}</strong>
      <p>{props.repository.description}</p>

      <a href={props.repository.url}>
        Acessar repositório
      </a>
    </li>
  )
}

export default RepositoryItem