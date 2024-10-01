import { useParams } from "react-router-dom"

export default function AdDetails() {
    const { id } = useParams();
    
    return (
        <p>
            Details of ad {id}
        </p>
        
    )
    
}