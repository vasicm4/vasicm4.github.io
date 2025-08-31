import Me from "../assets/picture.jpg"

function Home () {
    return (
        <main>
                <div className="grid justify-items-center">
                <img src={Me} alt="My picture" className="w-48 h-48 rounded-full object-cover"/>
                <div className="p-8">
                    <h1 className="title">Maksim Vasic</h1>
                    <h2 className="subtitle"><i>transform your vision into reality</i></h2>
                </div>
            </div>
        </main>
    )
}

export default Home;