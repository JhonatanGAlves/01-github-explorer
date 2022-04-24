import RepositoryItem from "./RepositoryItem"

const RepositoryList = () => {
  const BASE_URL = "https://api.github.com/users/JhonatanGAlves/repos"

  const repository = {
    name: 'unform',
    description: 'Forms in ReactJS',
    url: 'https://github.com/unform/unform'
  }

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>

      <ul>
        <RepositoryItem repository={repository} />
        <RepositoryItem repository={repository} />
        <RepositoryItem repository={repository} />
        <RepositoryItem repository={repository} />
        <RepositoryItem repository={repository} />
        <RepositoryItem repository={repository} />
        <RepositoryItem repository={repository} />
      </ul>
    </section>
  )
}

export default RepositoryList