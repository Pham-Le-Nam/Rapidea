import { useParams } from "react-router-dom";

function Course () {
    const { id } = useParams()

    return (
        <div className="flex flex-col items-center justify-start px-2 gap-3 w-full max-w-350">
            <div className="flex flex-col items-center justify-start rounded-md border shadow-md w-full gap-3">
                <img src={`${import.meta.env.VITE_PHOTO_STORAGE}default_background.jpg`} className="w-full aspect-3/1 object-cover rounded-md" />
                
                Course {id}
            </div>
        </div>
    )
}

export default Course;