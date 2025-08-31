import { NavLink } from "react-router-dom";

function Sitemap () {
    return (
        <>
        <div className="sitemap">
            <div className="sitemapitem">
                <NavLink to="" end>
                    Home
                </NavLink>
            </div>
            {/* <div className="sitemapitem">
                <NavLink to="about" end>
                    About
                </NavLink>
            </div>
            <div className="sitemapitem">
                <NavLink to="blog" end>
                    Blog
                </NavLink>
            </div>
            <div className="sitemapitem">
                <NavLink to="projects" end>
                    Projects
                </NavLink>
            </div>    */}
        </div>
            <h2 className="sitemapitem text-center">
                &copy; 2025 Maksim Vasic
            </h2>
        </>
    )
}

export default Sitemap;