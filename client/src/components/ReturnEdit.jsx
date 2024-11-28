import { Link } from 'react-router-dom'

const ReturnEdit = () => {
   return (
      <div className='return'>
         <div><Link to={-1}>Go Back</Link></div>
         <div><Link to='edit'>Edit</Link></div>
      </div>
   )
}
export default ReturnEdit;