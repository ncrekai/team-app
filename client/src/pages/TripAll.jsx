import { useParams, generatePath, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../services/authContext';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid2';


const TripAll = () => {
   const { user } = useContext(AuthContext);
   const id = useParams().userId;

   const path = generatePath('../user/:id/trips/new', {
      id: id,
    })

   if(!user) {
      return <div>Loading user trips...</div>
   } else {
      return (
         <div className='page-inner'>
            <div className='page lists'>
               <div className='page-title'>All My Trips</div>
               <div className='body-container'>
                     <Grid container spacing={2}>
                     {user.trips.map((trip, i) => <DisplayTrip key={`trip-${i}`} user={id} trip={trip} />)}
                     </Grid>
                     <Button href={path} color='success' variant='contained'>Add New Trips</Button>

               </div>
            </div>
         </div>
      );
   }
};

export default TripAll;

const DisplayTrip = ({ user, trip }) => {
   const path = generatePath('../user/:id/trips/:tripid', {
     id: user,
     tripid: trip._id
   })
   return (
     <div className='display-all'>
      <Grid item xs={8}>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">{trip.name}</Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{trip.destination}</Typography>
        <Typography variant="body2"><em>From: </em>{trip.startDate.slice(0,10)}</Typography>
        <Typography variant="body2"><em>To: </em>{trip.endDate.slice(0,10)}</Typography>
      </CardContent>
      <CardActions>
        <Button href={path} size="small">See All</Button>
      </CardActions>
    </Card>
    </Grid>
       {/* <div>Trip: <Link to={path}>{trip.name}</Link></div>
       <div>From: {trip.startDate.slice(0,10)}</div>
       <div>To: {trip.endDate.slice(0,10)}</div> */}
     </div>
   )
 }