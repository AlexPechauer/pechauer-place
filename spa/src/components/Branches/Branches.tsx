import './Branches.css'
import { Branch } from './Branch'
import { values as branchValues, Value as BranchValue } from './Branch/domain'
import { UserClient } from '../../clients'

export const Branches = () => {

  //TODO: This is just an example
  const user = new UserClient()
  const users = user.GetAll()
  console.log('user:', users)

  const branches = branchValues.map(branch => <Branch data={branch}></Branch>)

  return (
    <section className="branches">
      <div className="branches__header">
        <h1>Choose your Pechauer Branch!</h1>
        <h3>...but choose wisely.</h3>
      </div>
      {branches}
    </section>
  )
}