import { Button } from "@/components/ui/button";

type educationProps = {
    username: string,
    isOwner?: boolean,
}

function Education({ username, isOwner = false }: educationProps) {
    // const [educationList, setEducationList] =

    return (
        <div className="flex flex-col items-start justify-start rounded-md border shadow-md w-full gap-3 px-3 py-3">
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="font-bold text-xl">
                    Education
                </h1>
                
                {isOwner && (
                    <Button asChild className="bg-white hover:bg-gray-100 text-black p-0 w-20">
                        <p className="text-lg">
                            Edit
                        </p>
                    </Button>
                )}
            </div>

            <div className="flex flex-row items-start justify-start gap-3 border-b w-full pb-3">
                <img src="http://localhost:1234/storage/media/default_avatar.png" className="rounded-full w-10 aspect-square"/>

                <div className="mt-2">
                    <h1 className="font-bold">
                        School name
                    </h1>

                    <h2 className="">
                        Major - Degree
                    </h2>

                    <h2 className="text-gray-500">
                        Start Date - End Date
                    </h2>

                    <h2 className="text-gray-500">
                        Location
                    </h2>

                    <p>
                        Description from this education, what did you learn here, what are your strengths after finishing this.
                    </p>
                </div>
            </div>
            
            <div className="flex flex-row items-start justify-start gap-3 border-b w-full pb-3">
                <img src="http://localhost:1234/storage/media/default_avatar.png" className="rounded-full w-10 aspect-square"/>

                <div className="mt-2">
                    <h1 className="font-bold">
                        School name
                    </h1>

                    <h2 className="">
                        Major - Degree
                    </h2>

                    <h2 className="text-gray-500">
                        Start Date - End Date
                    </h2>

                    <h2 className="text-gray-500">
                        Location
                    </h2>

                    <p>
                        Description from this education, what did you learn here, what are your strengths after finishing this.
                    </p>
                </div>
            </div>

            <Button asChild className="bg-white hover:bg-gray-100 text-black p-0 w-full">
                    <p>
                        Show More
                    </p>
            </Button>
        </div>
    );
}

export default Education;