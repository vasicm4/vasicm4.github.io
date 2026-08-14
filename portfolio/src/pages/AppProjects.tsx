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
                            <CardTitle className="font-open-sans">Aegis IoT</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-justify font-open-sans">A robust, highly available, and secure distributed system designed for real-time data ingestion, processing, and monitoring from IoT sensor nodes.</h1>
                        </CardContent>
                        <CardFooter>
                            <CardAction>
                                <a href="https://github.com/vasicm4/aegis-iot" target="_blank" rel="noreferrer">
                                    <Button className="cursor-pointer font-open-sans">Repository</Button>
                                </a>
                            </CardAction>
                        </CardFooter>
                    </Card>
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="font-open-sans">HNX Lake</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-justify font-open-sans">A cloud-based platform built entirely on AWS for collecting, processing, storing, and analyzing data from Hacker News and X (Twitter). Implements the Medallion architecture to manage data flow through distinct stages of refinement.</h1>
                        </CardContent>
                        <CardFooter>
                            <CardAction>
                                <a href="https://github.com/vasicm4/hnx-lake" target="_blank" rel="noreferrer">
                                    <Button className="cursor-pointer font-open-sans">Repository</Button>
                                </a>
                            </CardAction>
                        </CardFooter>
                    </Card>
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="font-open-sans">Pico-GPT</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-justify font-open-sans">A completely transparent, from-scratch implementation of a generative Transformer (decoder-only GPT) built using CuPy as the core numerical backend, with a PyTorch reference model used solely for gradient verification.</h1>
                        </CardContent>
                        <CardFooter>
                            <CardAction>
                                <a href="https://github.com/vasicm4/pico-gpt" target="_blank" rel="noreferrer">
                                    <Button className="cursor-pointer font-open-sans">Repository</Button>
                                </a>
                            </CardAction>
                        </CardFooter>
                    </Card>
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="font-open-sans">Futures Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-justify font-open-sans">A quantitative finance capstone project analyzing futures and stock market data, studying volatility patterns, and backtesting trading strategies — produced during the Petnica Computational Finance Seminar.</h1>
                        </CardContent>
                        <CardFooter>
                            <CardAction>
                                <a href="https://github.com/vasicm4/futures-analysis" target="_blank" rel="noreferrer">
                                    <Button className="cursor-pointer font-open-sans">Repository</Button>
                                </a>
                            </CardAction>
                        </CardFooter>
                    </Card>
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="font-open-sans">Chaotic Cupid</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-justify font-open-sans">A real-time, peer-to-peer matchmaking simulation where "Chaotic Cupid" acts as a background service routing love letters to users.</h1>
                        </CardContent>
                        <CardFooter>
                            <CardAction>
                                <a href="https://github.com/vasicm4/chaotic-cupid" target="_blank" rel="noreferrer">
                                    <Button className="cursor-pointer font-open-sans">Repository</Button>
                                </a>
                            </CardAction>
                        </CardFooter>
                    </Card>
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="font-open-sans">NoSqlDB - Key Value Database</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-justify font-open-sans">A Key-Value storage engine built as a console application. Implements the Log-Structured Merge-Tree (LSM) architecture with a WAL, Memtable, SSTables, Bloom filters, and an LRU cache.</h1>
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
                            <h1 className="text-justify font-open-sans">Genetic algorithm applied to a BlackBox optimization problem, targeting neural network parameter optimization when the error function is unknown in analytic form.</h1>
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
                            <CardTitle className="font-open-sans">Portfolio Optimization</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-justify font-open-sans">A financial engineering tool built in C++ that leverages Genetic Algorithms to solve the asset allocation problem. Evolves a population of portfolios to maximize the Sharpe Ratio, balancing risk-adjusted returns.</h1>
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
                            <CardTitle className="font-open-sans">Visor Inc Voom</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-justify font-open-sans">A ride-sharing cross-platform system with microservice-inspired architecture that implements real-time location tracking and driver-passenger matching.</h1>
                        </CardContent>
                        <CardFooter>
                            <CardAction>
                                <a href="https://github.com/vasicm4/visor-inc-voom" target="_blank" rel="noreferrer">
                                    <Button className="cursor-pointer font-open-sans">Repository</Button>
                                </a>
                            </CardAction>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default AppProjects;