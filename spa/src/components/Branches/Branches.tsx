import './Branches.css'
import { Branch } from './Branch'
import { values as branchValues } from './Branch/domain'

export const Branches = () => {
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