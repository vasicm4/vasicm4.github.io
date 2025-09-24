import blackbox from "../assets/blackbox.png"
import tracker from "../assets/tracker.jpg"
import nosqldb from "../assets/nosqldb.png"
import se from "../assets/Search-Engine.svg"
import checkers from "../assets/checkers.jpg"
import hotel from "../assets/hotel.png"
import Project from "../components/Project"


function Projects() {
    return(
        <section>
            <div className="projects">
                <h1 className="title py-16">Projects</h1>
            </div>
            <div className="grid sm:px-4 xl:grid-cols-2 xl:grid-rows-3 xl:px-32 gap-16 pb-32">
                <Project type="xl:col-start-1 xl:row-start-1 project" image={<img src={blackbox} alt="Black Box" className="w-64 h-64 rounded-xl"/>} title="Black Box" link="https://github.com/vasicm4/black-box-optimization" description="This project applies a genetic algorithm to a BlackBox optimization problem, specifically targeting the optimization of neural network parameters when the error function is unknown in analytic form"/>
                <Project type="xl:col-start-2 xl:row-start-1 project" image={<img src={checkers} alt="Checkers" className="w-80 h-60 rounded-xl"/>} title="Checkers" link="https://github.com/vasicm4/checkers" description="Checkers game featuring an AI that makes strategic moves using the Minimax algorithm with Alpha-Beta pruning for optimal decision-making."/>
                <Project type="xl:col-start-1 xl:row-start-2 project"  image={<img src={nosqldb} alt="Key-Value Engine" className="w-80 h-40 rounded-xl"/>} title="Key-Value Engine" link="https://github.com/vasicm4/key-value-engine" description="This group project implements a Key-Value storage engine as a console application. The system supports basic operations and builds upon the Log-Structured Merge-Tree (LSM) architecture to ensure efficient data persistence and retrieval."/>
                <Project type="xl:col-start-2 xl:row-start-2 project"  image={<img src={hotel} alt="Hotel" className="w-64 h-64 rounded-xl"/>} title="OOP Hotel" link="https://github.com/vasicm4/oop-hotel" description="Java-based hotel management system designed for medium-scale organizations that provides functionalities for administrators, receptionists, janitors, and guests."/>
                <Project type="xl:col-start-1 xl:row-start-3 project"  image={<img src={se} alt="PDF Search Engine" className="w-64 h-64 rounded-xl"/>} title="PDF Search Engine" link="https://github.com/vasicm4/pdf-search-engine" description="Keyword-based PDF search engine with fully functioning logical operations, trie autocomplete, graph-based ranking and highlighted key-word exports."/>
                <Project type="xl:col-start-2 xl:row-start-3 project"  image={<img src={tracker} alt="Exercise Tracker API" className="w-64 h-64 rounded-xl"/>} title="Exercise Tracker API" link="https://github.com/vasicm4/exercise-tracker-api" description="API developed in C# that enables users to log and analyze their workout routines"/>
            </div>
        </section>
    )
}

export default Projects;