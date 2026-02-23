import {Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";

function AppProjects() {
    return (
        <>
            <div className="p-8 md:px-10 bg-sidebar h-full">
                <div className="">
                    <h1 className="font-open-sans text-2xl font-bold">Projects</h1>
                </div>
                <div className="grid xl:grid-cols-3 py-8 gap-4">
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="font-open-sans">NoSqlDB - Key Value Database</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-justify font-open-sans">This project implements a Key-Value storage engine as a console application.
                            The system supports basic operations and builds upon the Log-Structured Merge-Tree (LSM) architecture</h1>
                        </CardContent>
                        <CardFooter>
                            <CardAction>
                                <a href="https://github.com/vasicm4/key-value-engine" target="_blank" rel="noreferrer">
                                    <Button className="cursor-pointer font-open-sans">Repository</Button>
                                </a>
                            </CardAction>
                        </CardFooter>
                    </Card>
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="font-open-sans">Black Box Optimization</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-justify font-open-sans">Genetic algorithm application to a BlackBox optimization problem,
                                targeting neural network parameter optimization when the error function is unknown in analytic form</h1>
                        </CardContent>
                        <CardFooter>
                            <CardAction>
                                <a href="https://github.com/vasicm4/black-box-optimization" target="_blank" rel="noreferrer">
                                    <Button className="cursor-pointer font-open-sans">Repository</Button>
                                </a>
                            </CardAction>
                        </CardFooter>
                    </Card>
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="font-open-sans">Visor Inc Voom</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-justify font-open-sans">A ride-sharing cross-platform system with microservice inspired architecture that implements real-time
                                location tracking and driver-passenger matching</h1>
                        </CardContent>
                        <CardFooter>
                            <CardAction>
                                <a href="https://github.com/kzi-nastava/mrs-team22-Visor-Inc" target="_blank" rel="noreferrer">
                                    <Button className="cursor-pointer font-open-sans">Repository</Button>
                                </a>
                            </CardAction>
                        </CardFooter>
                    </Card>
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="font-open-sans">Portfolio Optimization</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-justify font-open-sans">Pre-processed and analyzed historical stock market data using Pandas and NumPy,
                                used C++ and TBB to calculate asset returns, volatility and covariance matrix in order to assess risk</h1>
                        </CardContent>
                        <CardFooter>
                            <CardAction>
                                <a href="https://github.com/vasicm4/portfolio-optimization" target="_blank" rel="noreferrer">
                                    <Button className="cursor-pointer font-open-sans">Repository</Button>
                                </a>
                            </CardAction>
                        </CardFooter>
                    </Card>
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="font-open-sans">Language School Management System</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-justify font-open-sans">Architected a desktop ERP solution using the MVVM pattern in WPF,
                                centralizing operations for instructors, students, and administrative staff within a unified .NET environment.</h1>
                        </CardContent>
                        <CardFooter>
                            <CardAction>
                                <h1 className="font-open-sans">Not public yet :(</h1>
                            </CardAction>
                        </CardFooter>
                    </Card>
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="font-open-sans">Medical Clinic Software</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-justify font-open-sans">Engineered a high-performance patient management dashboard with React,
                                focusing on API integration and optimized rendering of dynamic healthcare datasets</h1>
                        </CardContent>
                        <CardFooter>
                            <CardAction>
                                <h1 className="font-open-sans">Not public yet :(</h1>
                            </CardAction>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default AppProjects;