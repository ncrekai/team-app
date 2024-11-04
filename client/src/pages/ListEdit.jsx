import { useParams} from "react-router-dom";

const ListEdit = () => {
    const routeParams = useParams()
    console.log(routeParams)
    return (
        <div>
            <h3>Edit List</h3>
        </div>
    )
}
export default ListEdit