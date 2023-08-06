import './Branch.css'
import { Props } from './domain'

export const Branch = ({ data }: Props) => {

  const branchFeatures = data.features.map(feature => <li className="branch__feature">{feature}</li>)
  return (
    <article className="branch">
      <h1 className="branch__title">{data.title}</h1>
      <h3>{data.subTitle}</h3>
      <ul className="branch__features">
        {branchFeatures}
      </ul>
    </article>
  )
}