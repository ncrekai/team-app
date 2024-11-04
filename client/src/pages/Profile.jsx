// import { useParams, useLoaderData  } from "react-router-dom";

// export const loader = async ({ params }) => {
//     const contact = 
// }

const Profile = (props) => {
    const {fname, lname, email} = props
    // const routeParams = useParams()
    return (
        <div>
            <h3>Welcome User</h3>
            <p>First name: {fname}</p>
            <p>Last name: {lname}</p>
            <p>Email: {email}</p>
            </div>
    )
}
export default Profile