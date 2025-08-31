import EmailLogo from "../icons/EmailLogo";
import WhatsAppLogo from "../icons/WhatsAppLogo";

function Contact() {
    return (
        <div className="space-y-2">
            <h1 className="contact">Contact Me</h1>
            <div className="contactitem">
                <EmailLogo/>
                <a href="mailto:vasicmaksim4@gmail.com" className="text-sm md:text-xl">vasicmaksim4@gmail.com</a>
            </div>
            <div className="contactitem">
                <WhatsAppLogo/>
                <h1>+381641122138</h1>
            </div>
        </div>
    )
}

export default Contact;