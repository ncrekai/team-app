import { useState, useEffect } from 'react';
import { generatePath } from 'react-router';
import { Link } from 'react-router-dom';
import data from './../temp-data.js'

const Dashboard = (props) => {
  const {USER} = props;
  console.log(USER)
  // const [userProfile, setUserProfile] = useState({});
  // const [userTrips, setUserTrips] = useState([]);
  // const [userLists, setUserLists] = useState([]);
  
  // useEffect(() => {
  //   const id = 1
  //   let currentTrips = data.trips.filter(trip => trip.user === id)
  //   let currentLists = data.lists.filter(list => list.user === id)
  //   setUserTrips(currentTrips)
  //   setUserLists(currentLists)
  //   setUserProfile(data.profiles.find((profile) => profile.id === id))
  // },[])
    return (
      <div id='dashboard' className='page-outer'>
        <div className='page-inner'>
          <div className='page dashboard'>
            <div className='page-title'>Welcome {USER.profile.fname}</div>
            <div className='dashboard-container'>
              <h3>My Trips</h3>
              {USER.trips.map((trip,i) => <DisplayTrip key={`trip-${i}`} trip={trip} />)}
              <h3>My Lists</h3>
              {USER.lists.map((list,i) => <DisplayList key={`list-${i}`} list={list} trips={USER.trips} />)}
              <h3>My Profile</h3>
              <DisplayProfile userProfile={USER.profile}/>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DisplayTrip = (props) => {
    const { trip } = props
    const path = generatePath('/user/:id/:entity/:entityId', {
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

  const DisplayList = (props) => {
    const { list, trips } = props
    const path = generatePath('/user/:id/:entity/:entityId', {
      id: list.user,
      entity: 'lists',
      entityId: list.id
    })
    const getTrip = () => {
      if (list.trip) {
        let trip = trips.find(el => el.id == list.trip.id)
        return trip.place
      }
    }
    return (
      <div className='dashboard-display'>
        { list.trip ? getTrip() : null }
        <div><Link to={path}>{list.listName}</Link></div>
      </div>
    )
  }

  const DisplayProfile = (props) => {
    const {userProfile} = props
    const viewPath = generatePath('user/:id', { id: userProfile.id })
    const editPath = generatePath('user/:id/edit', { id: userProfile.id })
    return (
      <div className='dashboard-display'>
        <div><Link to={viewPath}>View Profile</Link></div>
        <div><Link to={editPath}>Edit Profile</Link></div>
      </div>
    )
    
  }

  export default Dashboard;
  