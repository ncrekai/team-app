import { useParams } from "react-router-dom";

const Profile = (props) => {
    const {fname, lname, email} = props
    const routeParams = useParams()
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