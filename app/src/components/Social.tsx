import InstagramLogo from "../icons/InstagramLogo";
import GithubLogo from "../icons/GithubLogo";
import LinkedinLogo from "../icons/LinkedinLogo";

function Social() {
    return (
        <div className="space-y-2">
            <h1 className="social">Stay In Touch</h1>
            <a href="https://www.instagram.com/maximbuilds/" className="socialtitem">
                <InstagramLogo/>
                <h1>@maximbuilds</h1>
            </a>
            <a href="https://github.com/vasicm4" className="socialtitem">
                <GithubLogo/>
                <h1>vasicm4</h1>
            </a>
            <a href="https://rs.linkedin.com/in/maksim-vasi%C4%87-514b11327" className="socialtitem">
                <LinkedinLogo/>
                <h1>Maksim Vasic</h1>
            </a>
        </div>
    )
}

export default Social;