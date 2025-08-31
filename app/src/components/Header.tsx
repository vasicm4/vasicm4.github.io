import { NavLink } from "react-router-dom";


function Header() {
    return (
        <>
            <header>
                <div className="logoitem">
                    <NavLink to="/" end>
                        m
                    </NavLink>
                </div>
                {/* <div className="navlist">
                    <div className="navitem">
                        <NavLink to="about" end>
                            ABOUT
                        </NavLink>
                    </div>
                    <div className="navitem">
                        <NavLink to="blog" end>
                            BLOG
                        </NavLink>
                    </div>
                    <div className="navitem">
                        <NavLink to="projects" end>
                            PROJECTS
                        </NavLink>
                    </div>
                </div> */}
            </header>
        </>
    )
}

export default Header;