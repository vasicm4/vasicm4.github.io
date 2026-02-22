import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";


function AppProjects() {
    return (
        <>
            <div className="p-4">
                <div className="py-4">
                    <h1 className={"font-open-sans text-2xl font-bold"}>Personal projects</h1>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default AppProjects;