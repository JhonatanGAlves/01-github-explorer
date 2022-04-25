import { useState, useEffect } from "react"
import RepositoryItem from "./RepositoryItem"
import '../styles/repositories.scss'

type Repository = {
  id: string
  name: string
  description: string
  url: string
}

const RepositoryList = () => {
  const [repositories, setRepositories] = useState<Repository[]>([])

  useEffect(() => {
    fetch("https://api.github.com/orgs/rocketseat/repos")
      .then(response => response.json())
      .then(data => setRepositories(data))
  }, [])

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>

      <ul>
        {repositories.map(repository => {
          return <RepositoryItem key={repository.id} repository={repository} />
        })}
      </ul>
    </section>
  )
}

export default RepositoryList