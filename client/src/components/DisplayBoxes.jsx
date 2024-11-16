import { generatePath } from 'react-router';
import { Link } from 'react-router-dom';

export const DisplayTrip = ({ user, trip }) => {
  // console.log(user)
  // console.log(trip.name)
  const path = generatePath('../user/:id/trips/:tripid', {
    id: user,
    tripid: trip._id
  })
  return (
    <div className='dashboard-display'>
      <div>Trip: <Link to={path}>{trip.name}</Link></div>
      <div>From: {trip.startDate}</div>
      <div>To: {trip.endDate}</div>
    </div>
  )
}

export const DisplayList = ({ user, list }) => {
  console.log(user)
  const path = generatePath('../user/:id/:entity/:entityId', {
     id: user,
     entity: 'wishlists',
     entityId: list._id
   })
  return (
    <div className='dashboard-display'>
      <div><Link to={path}>{list.name}</Link></div>
    </div>
  )
}

export const DisplayProfile = ({ userProfile }) => {
  const viewPath = generatePath('../user/:id', { id: userProfile.id })
  const editPath = generatePath('../user/:id/edit', { id: userProfile.id })
  return (
    <div className='dashboard-display'>
      <div><Link to={viewPath}>View Profile</Link></div>
      <div><Link to={editPath}>Edit Profile</Link></div>
    </div>
  )
}