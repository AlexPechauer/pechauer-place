import './Feed.css'
import { Food } from './Food/'

export const Feed = () => {
  return (
    <section className="feed">
      <div className="feed__header">
        <h1>Checkout out what's new!</h1>
      </div>
      <Food />
    </section>
  )
}