import { useState, useEffect } from "react"
import RepositoryItem from "./RepositoryItem"
import '../styles/repositories.scss'

const RepositoryList = () => {
  const [repositories, setRepositories] = useState([])
  const BASE_URL = "https://api.github.com/orgs/rocketseat/repos"

  useEffect(() => {
    fetch(BASE_URL)
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