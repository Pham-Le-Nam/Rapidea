import { Button } from "@base-ui/react";
import { ChevronLeftIcon } from "lucide-react";

type FilesProp = {
    course: any,
}

function Files ({ course }: FilesProp) {

    const getRootFolder = async () => {
        
    }

    return (
        <div className="flex flex-col items-center justify-start rounded-md border shadow-md w-full gap-3">
            
            <div className="relative w-full flex items-center">
            
                <Button className="absolute left-0 hover:bg-gray-100 border-r-2">
                    <ChevronLeftIcon  />
                </Button>

                <p className="mx-auto">
                    {course.title}
                </p>
            </div>
        </div>
    )
}

export default Files;