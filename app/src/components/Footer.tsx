import Contact from "./Contact";
import Sitemap from "./Sitemap";
import Social from "./Social";

function Footer() {
    return (
        <>
            <footer>
                <div className="md:flex md:justify-center space-y-16 md:space-x-16 md:px-16 md:py-16">    
                    <Contact/>
                    <Social />
                </div>
                <Sitemap/>
            </footer>
        </>
    )
}

export default Footer;