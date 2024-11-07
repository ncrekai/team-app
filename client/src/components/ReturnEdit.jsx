import { Link } from 'react-router-dom'

const ReturnEdit = () => {
   return (
      <div className='return'>
         <div><Link to={-1}>go back</Link></div>
         <div><Link to='edit'>edit</Link></div>
      </div>
   )
}
export default ReturnEdit;