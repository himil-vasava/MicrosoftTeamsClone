import React, { Component } from 'react'
class Intro extends Component {
    loadScript = function (src) {
        var tag = document.createElement('script');
        tag.async = false;
        tag.src = src;
        document.getElementsByTagName('body')[0].appendChild(tag);
    }
    componentDidMount() {
        this.loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js');

        this.loadScript('https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/js/webflow.bb1ee4564.js');
    }
    removeWebflow = (name) => {
        let obj = document.getElementsByClassName("w-webflow-badge")[0];
        if (obj != null || obj != undefined) 
            obj.remove();
    }
    render() {
        const rem = window.setInterval(() => this.removeWebflow(rem), 1);
        return (
            <>
                <meta charset="utf-8"/><meta content="width=device-width, initial-scale=1" name="viewport"/><meta content="Webflow" name="generator"/><link href="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/css/himils-top-notch-project.webflow.c3943a661.css" rel="stylesheet" type="text/css"/>
                    <div className="hero">
                    <div data-collapse="medium" data-animation="default" data-duration="400" data-doc-height="1" role="banner" className="nav w-nav">
                        <div className="nav-inner">
                            <div className="nav-logo-wrap"><a href="#" className="brand w-nav-brand"><img src="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e57d9f1d5c6e59b94752f7_logo1-removebg-preview%20(1).png" height="100" alt=""/></a></div>
                            <div className="nav-menu-wrap">
                                <nav role="navigation" className="nav-menu-2 w-nav-menu"><a href="#about" className="nav-link w-nav-link">About</a><a href="#features" className="nav-link w-nav-link">Features</a><a href="#" className="nav-link w-nav-link">How to Use</a><a href="/auth" className="nav-link w-nav-link">Sign In</a></nav>
                                <div className="menu-button w-nav-button">
                                <div className="menu-icon w-icon-nav-menu"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="section center">
                    <img src="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e56ec999cd25d826740ac7_arrow.svg" alt="" className="arrow"/>
                    <div data-w-id="6b220cb1-4b9c-7fb0-75b9-53ff4a6c35a2" style={{WebkitTransform:'translate3d(0, 30PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',MozTransform:'translate3d(0, 30PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',msTransform:'translate3d(0, 30PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',transform:'translate3d(0, 30PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',opacity:0}} className="hero-content">
                        <h1 className="heading-3">Interact</h1>
                        <h3 className="hero-subhead">Grow your network 10x with Interact</h3>
                        <a href="#" className="button w-button">Get the App</a>
                    </div>
                    <img src="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e56ec999cd254c06740ab6_img-top.png" style={{WebkitTransform:'translate3d(0, 60PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',MozTransform:'translate3d(0, 60PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',msTransform:'translate3d(0, 60PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',transform:'translate3d(0, 60PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',opacity:0}} data-w-id="77e69727-c455-8e07-0990-833a661c94ea" sizes="(max-width: 479px) 80vw, (max-width: 767px) 70vw, 100vw" srcset="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e56ec999cd254c06740ab6_img-top-p-500.png 500w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e56ec999cd254c06740ab6_img-top.png 731w" alt="" className="hero-image"/>
                    </div>
                    <div id="about" className="section wide img">
                    <div data-w-id="b126983d-9126-fc06-c81d-1318685e2add" style={{WebkitTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',MozTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',msTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',transform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',opacity:0}} className="wrap">
                        <div className="title">Connect to any part of the world </div>
                        <h2>Everything you need to connect with your dear ones !!</h2>
                    </div>
                    <div className="wrapper"><img src="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e5735dd6c7c137c05e2ef0_team-meeting-online-conference-call.jpg" sizes="90vw" srcset="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e5735dd6c7c137c05e2ef0_team-meeting-online-conference-call-p-800.jpeg 800w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e5735dd6c7c137c05e2ef0_team-meeting-online-conference-call-p-1080.jpeg 1080w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e5735dd6c7c137c05e2ef0_team-meeting-online-conference-call-p-1600.jpeg 1600w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e5735dd6c7c137c05e2ef0_team-meeting-online-conference-call-p-2000.jpeg 2000w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e5735dd6c7c137c05e2ef0_team-meeting-online-conference-call-p-2600.jpeg 2600w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e5735dd6c7c137c05e2ef0_team-meeting-online-conference-call-p-3200.jpeg 3200w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e5735dd6c7c137c05e2ef0_team-meeting-online-conference-call.jpg 3508w" alt=""/></div>
                    </div>
                    <div className="section">
                    <div id="features" className="feature-wrap _1">
                        <div data-w-id="4593c4b7-56e8-060a-be57-648b0e08fc65" style={{WebkitTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',MozTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',msTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',transform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',opacity:0}} className="feature-content">
                            <div className="title">Features</div>
                            <h2 className="black">Team</h2>
                            <p>Create a Team<br/>Join a Team<br/>Create different teams for different purposes.Each team has its own mechanism</p>
                        </div>
                        <div className="feature-image"><img src="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e575c61c7b58afb5f69490_9970.jpg" width="341" sizes="(max-width: 479px) 191.6750030517578px, (max-width: 991px) 40vw, 50vw" srcset="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e575c61c7b58afb5f69490_9970-p-800.jpeg 800w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e575c61c7b58afb5f69490_9970-p-1080.jpeg 1080w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e575c61c7b58afb5f69490_9970-p-1600.jpeg 1600w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e575c61c7b58afb5f69490_9970-p-2000.jpeg 2000w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e575c61c7b58afb5f69490_9970-p-2600.jpeg 2600w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e575c61c7b58afb5f69490_9970-p-3200.jpeg 3200w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e575c61c7b58afb5f69490_9970.jpg 4415w" alt="" className="image-2"/></div>
                    </div>
                    <div id="features" className="feature-wrap">
                        <div data-w-id="d14efc6f-da20-e394-c4cf-a01540526a60" style={{WebkitTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',MozTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',msTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',transform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',opacity:0}} className="feature-content">
                            <h2 className="black">Chat</h2>
                            <p>Chat with your team members.<br/>Chat with users attending the meeting.<br/>All your team chat will be stored and thus useful information will not be erased.</p>
                        </div>
                        <div className="feature-image"><img src="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e57678854b48a2ab7681aa_work-chat-concept-illustration_114360-1071.jpg" width="341" sizes="(max-width: 479px) 90vw, (max-width: 991px) 40vw, 50vw" srcset="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e57678854b48a2ab7681aa_work-chat-concept-illustration_114360-1071-p-500.jpeg 500w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e57678854b48a2ab7681aa_work-chat-concept-illustration_114360-1071.jpg 626w" alt="" className="image-2"/></div>
                    </div>
                    <div id="features" className="feature-wrap _1">
                        <div data-w-id="ba44a535-22fb-ec40-22e8-c801f1a6ccf6" style={{WebkitTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',MozTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',msTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',transform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',opacity:0}} className="feature-content">
                            <h2 className="black">Video</h2>
                            <p>Video call with anyone inside or outside your team.<br/>Mute yourself in between.<br/>Video can turned on and off in between the meeting.</p>
                        </div>
                        <div className="feature-image"><img src="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e5770b5ca6c7428a9f75f1_group-video-concept-illustration_114360-4792.jpg" width="341" sizes="(max-width: 479px) 100vw, (max-width: 991px) 40vw, 50vw" srcset="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e5770b5ca6c7428a9f75f1_group-video-concept-illustration_114360-4792-p-500.jpeg 500w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e5770b5ca6c7428a9f75f1_group-video-concept-illustration_114360-4792.jpg 626w" alt="" className="image-2"/></div>
                    </div>
                    <div id="features" className="feature-wrap">
                        <div data-w-id="674dcbf6-6009-a2ec-f04d-c66a26eb5aaa" style={{WebkitTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',MozTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',msTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',transform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',opacity:0}} className="feature-content">
                            <h2 className="black">Invite</h2>
                            <p>Invite a person to join your team by sending the team code.<br/>Invite to join the meeting by sending the meeting link.<br/>This all could be done just by users&#x27;s emailId</p>
                        </div>
                        <div className="feature-image"><img src="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e578309d55eace8633059d_invite-concept-illustration_114360-5273.jpg" width="341" sizes="(max-width: 479px) 90vw, (max-width: 991px) 40vw, 50vw" srcset="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e578309d55eace8633059d_invite-concept-illustration_114360-5273-p-500.jpeg 500w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e578309d55eace8633059d_invite-concept-illustration_114360-5273.jpg 626w" alt="" className="image-2"/></div>
                    </div>
                    <div data-animation="slide" data-nav-spacing="8" data-duration="500" data-infinite="1" data-w-id="321c18fb-db93-7e62-3afc-4dab2862f5d4" style={{WebkitTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',MozTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',msTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',transform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',opacity:0}} className="quote-slider w-slider">
                        <div className="w-slider-mask">
                            <div className="w-slide">
                                <div className="quote-wrap">
                                <img src="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e56ec999cd255d8c740ac8_quotation.svg" width="58" alt="" className="quote-icon"/>
                                <h3>Interact is used by me very frequently to attend my live classNamees. It is very easy to use and provides many functionalities. In the time of pandemic it is becoming very helpful</h3>
                                <div className="quote-attribution">
                                    <p>Achal Talati</p>
                                    <div className="quote-dash"></div>
                                    <p><strong>Student, IIT Roorkee</strong></p>
                                </div>
                                </div>
                            </div>
                            <div className="w-slide">
                                <div className="quote-wrap">
                                <img src="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e56ec999cd255d8c740ac8_quotation.svg" width="58" alt="" className="quote-icon"/>
                                <h3>This Web application is very important to me as it helps me to connect with my team members in day to day life. I am able to communicate and coordinate using it much efficiently.</h3>
                                <div className="quote-attribution">
                                    <p>Himil Vasava </p>
                                    <p className="paragraph-2"><strong className="bold-text-2">Full Stack Web Developer</strong></p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="left-arrow w-slider-arrow-left">
                            <div className="slider-arrow w-icon-slider-left"></div>
                        </div>
                        <div className="right-arrow w-slider-arrow-right">
                            <div className="slider-arrow w-icon-slider-right"></div>
                        </div>
                        <div className="slide-nav w-slider-nav w-slider-nav-invert w-round"></div>
                    </div>
                    <div data-w-id="23f92271-dba9-fb12-00d3-758ef4d10fb2" style={{WebkitTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',MozTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',msTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',transform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',opacity:0}} className="feature-wrap logos">
                        <div className="w-layout-grid grid"><img src="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e57018dd3f832964e7ee33_603b8fa41d3cc571ef8fb609_iconfinder_mongodb_1012822.svg" loading="lazy" alt=""/><img src="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e57181f47ab7c3e28ecba7_603ba3da16b10d5fe25e785c_redux-logo-p-130x130q80.png" loading="lazy" alt=""/><img src="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e57181470245afbac5940e_6048a5d645404d8e20706320_socket-p-130x130q80.png" loading="lazy" alt=""/><img src="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e57181e2841babd08a3b50_603b8ec6c64cec5969a17252_iconfinder_React.js_logo_1174949.svg" loading="lazy" alt="" className="image-5"/><img src="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e57182402102e0505379fd_603b8f3a29478f14c01c6817_iconfinder_nodejs-new-pantone-black_1012818.svg" loading="lazy" alt="" className="image-6"/><img src="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e5728de2841b4b238a4701_sendgrid-vector-logo.png" loading="lazy" alt=""/></div>
                    </div>
                    </div>
                    <div className="bottom-image-wrap"><img src="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e56ec999cd252db6740ab4_bg-apps.jpg" sizes="(max-width: 2500px) 100vw, 2500px" srcset="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e56ec999cd252db6740ab4_bg-apps-p-500.jpeg 500w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e56ec999cd252db6740ab4_bg-apps-p-1080.jpeg 1080w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e56ec999cd252db6740ab4_bg-apps-p-2000.jpeg 2000w, https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e56ec999cd252db6740ab4_bg-apps.jpg 2500w" alt=""/></div>
                    <div id="download" className="section wide purple">
                    <div data-w-id="376e2a1f-ec70-0dab-11ea-b1863101e37b" style={{WebkitTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',MozTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',msTransform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',transform:'translate3d(0, 40PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',opacity:0}} className="wrap">
                        <h2>Ready to get started?</h2>
                        <div className="button-wrap"><a href="/auth" className="button w-button">Sign In</a></div>
                    </div>
                    </div>
                    <div className="footer">
                    <div className="wrap">
                        <img src="https://uploads-ssl.webflow.com/60e56ec999cd255920740a6a/60e57d9f1d5c6e59b94752f7_logo1-removebg-preview%20(1).png" width="136" alt=""/>
                        <div className="footer-list"><a href="#" className="footer-link">Email</a><a href="#" className="footer-link">Instagram</a><a href="#" className="footer-link">Facebook</a><a href="#" className="footer-link">Twitter</a></div>
                    </div>
                    </div>
            </>
        )

    }
}

export default Intro