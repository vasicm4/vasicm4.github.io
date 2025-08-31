
function Timeline() {
    return (
        <div className="timeline">
            <h1 className="title col-start-1 row-start-1">Timeline</h1> 
                <ul className="timelinestart">
                    <li className="relative flex gap-12">
                        <div className="relative before:absolute before:left-[9px] before:h-full before:w-[2px] before:bg-gray-400 items-baseline">
                            <div className="dot" />
                        </div>
                        <div className="text-xl pb-16">
                            <h1>2023 - Present</h1>
                            <h2 className="text-2xl font-semibold text-gray-700 font-mono">Faculty of Technical Sciences, University of Novi Sad</h2>
                            <h3 className="text-xl">Software Engineering and Information Technologies</h3>
                            <h3 className="pb-5"><i>Novi Sad, Serbia</i></h3>
                            <h3 className="font-semibold">ARTIFACT Summer School</h3>
                            <ul className="list-disc ml-4 mt-2 pb-5">
                                <li>Explored physical and civil engineering aspects of urban flood risk management.</li>
                                <li>Studied and applied Convolutional Neural Networks (CNNs), LSTM networks and graph networks for flood modeling.</li>
                                <li>AI and machine learning integration in real-world scenarios.</li>
                                <li>Collaborated in a team to prepare a pitch and project for a startup competition.</li>
                                <li>Gained hands-on experience in interdisciplinary problem-solving, combining engineering, AI, and entrepreneurial skills.</li>
                            </ul>
                            <h3 className="font-semibold">StartIt Hot AI Summer</h3>
                            <ul className="list-disc ml-4 mt-2">
                                <li>Participated in workshops and lectures focused on artificial intelligence application.</li>
                                <li>Engaged with industry experts to learn the latest AI trends and tools.</li>
                            </ul>
                        </div>
                    </li>
                    <li className="relative flex gap-12">
                        <div>
                            <div className="dot" />
                        </div>
                        <div className="text-xl pb-4">
                            <h1>2019 - 2023</h1>
                            <h2 className="text-2xl font-semibold text-gray-700 font-mono">Grammar School “Jovan Jovanović Zmaj”</h2>
                            <h3 className="text-xl">Natural Sciences</h3>        
                            <h3 className="pb-5"><i>Novi Sad, Serbia</i></h3>
                            <h3 className="font-semibold">Erasmus+ Project - TIME for Digitalization</h3>
                            <ul className="list-disc ml-4 mt-2 pb-8">
                                <li>Collaborated with schools from Romania and Greece to develop digital teaching resources.</li>
                                <li>Participated in eTwinning projects exploring the concept of Time across disciplines.</li>
                                <li>Contributed to an open educational library of 28+ digital resources (videos, presentations, lesson plans).</li>
                                <li>Enhanced digital and pedagogical skills as part of a €87,000+ EU-funded initiative.</li>
                            </ul>
                            <h3 className="font-semibold">French Theater Section</h3>
                            <ul className="list-disc ml-4 mt-2">
                                <li>Led a group of schoolmates in a French-language theater performance.</li>
                                <li>Organized and conducted the event to raise funds for a friend in need.</li>
                                <li>Developed leadership, teamwork, and event coordination skills.</li>
                                <li>Enhanced public speaking and presentation abilities in French.</li>
                            </ul>
                        </div>
                    </li>
                </ul>
        </div>
    )
}

export default Timeline;