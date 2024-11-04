import { useState, useEffect } from 'react';
import { generatePath } from 'react-router';
import { Link } from 'react-router-dom';
import { getUser } from './../users.js'

const Dashboard = () => {
  const [user, setUser] = useState()
  
  useEffect(() => {
    const id = 1 // temp assigning id until login function built
    setUser(() => getUser(id))
  },[])

    if (user) {
      return (
        <div id='dashboard' className='page-outer'>
          <div className='page-inner'>
            <div className='page dashboard'>
              <div className='dashboard-container'>
                <div className='page-title'>Welcome {user.profile.fname}</div>
                <h3>My Trips</h3>
                {user.trips.map((trip,i) => <DisplayTrip key={`trip-${i}`} trip={trip} />)}
                <h3>My Lists</h3>
                {user.lists.map((list,i) => <DisplayList key={`list-${i}`} list={list} />)}
                <h3>My Profile</h3>
                <DisplayProfile userProfile={user.profile}/>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div id='dashboard' className='page-outer'>
        <div className='page-inner'>
          <div className='page dashboard'>
            <div className='dashboard-container'>
              <div className='page-title'>Welcome to the Dashboard</div>
          </div>
          </div>
        </div>
      </div>
      )
    }
  };

  const DisplayTrip = (props) => {
    const { trip } = props
    const path = generatePath('../user/:id/:entity/:entityId', {
      id: trip.user,
      entity: 'trips',
      entityId: trip.id
    })
    return (
      <div className='dashboard-display'>
        <div>Trip: <Link to={path}>{trip.place}</Link></div>
        <div>From: {trip.startDate}</div>
        <div>To: {trip.endDate}</div>
      </div>
    )
  }

  const DisplayList = ({ list }) => {
    const path = generatePath('../user/:id/:entity/:entityId', {
      id: list.user,
      entity: 'lists',
      entityId: list.id
    })
    return (
      <div className='dashboard-display'>
        <div><Link to={path}>{list.listName}</Link></div>
      </div>
    )
  }

  const DisplayProfile = (props) => {
    const {userProfile} = props
    const viewPath = generatePath('../user/:id', { id: userProfile.id })
    const editPath = generatePath('../user/:id/edit', { id: userProfile.id })
    return (
      <div className='dashboard-display'>
        <div><Link to={viewPath}>View Profile</Link></div>
        <div><Link to={editPath}>Edit Profile</Link></div>
      </div>
    )
    
  }

  export default Dashboard;
  