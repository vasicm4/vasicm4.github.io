import Timeline from "../components/Timeline";
import Me from "../assets/picture.jpg"

function About() {
    return(
        <section className="about">
            <h1 className="title">About Me</h1>
            <div className="py-20">
                <div className="profile">
                    <div className="profileleft">
                        <img src={Me} alt="My picture" className="w-48 h-48 rounded-full object-cover"/>
                        <h1 className="p-8 text-gray-600 font-semibold text-xl md:text-3xl">Maksim Vasic</h1>
                    </div>
                    <ul className="profileright">
                        <li className="text-xl text-gray-800">Passionate about Machine Learning, AI and Distributed Systems.</li>
                        <li className="text-xl text-gray-800">Eager to explore new ideas, concepts and technologies.</li>
                        <li className="text-xl text-gray-800">Blending teamwork, leadership, and innovation in every project.</li>
                        <li className="text-xl text-gray-800">I enjoy turning challenges into opportunities for growth.</li>
                        <li className="text-xl text-gray-800">Building toward a future where tech and creativity meet</li>                    
                    </ul>
                </div>
            </div>
            <Timeline/>
        </section>
    )
}

export default About;