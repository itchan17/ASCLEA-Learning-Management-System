import AOS from "aos";
import "aos/dist/aos.css";
import "../../../css/animation.css";
import { useEffect, useState } from "react";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import LandingpageNav from "./LandingpageNav";
import {
    AiOutlinePhone,
    AiOutlineMail,
    AiOutlineFacebook,
    AiOutlineCheckCircle,
    AiOutlineCloseCircle
} from "react-icons/ai";
import { Link as ReactScrollLink } from "react-scroll";
import axios from 'axios';

export default function LandingPage({ text }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({
        success: null,
        message: ''
    });

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setSubmitStatus({
                success: false,
                message: 'Please fill in all fields.'
            });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setSubmitStatus({
                success: false,
                message: 'Please enter a valid email address.'
            });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ success: null, message: '' });

        try {
            const response = await axios.post('/contact', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            setSubmitStatus({
                success: response.data.success,
                message: response.data.message || 'Thank you for your message! We will get back to you soon.'
            });

            // Reset form if successful
            if (response.data.success) {
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus({
                success: false,
                message: 'Failed to send message. Please try again later.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="landing-page overflow-x-hidden">
            <LandingpageNav />
            <header
                id="home"
                className="relative h-[759px] w-full bg-cover bg-center flex flex-col justify-center"
                style={{
                    backgroundImage: `url(/images/landingpage_bg.webp)`,
                }}
            >
                {/* Header content */}
                <div className="flex flex-col items-center lg:items-start w-full px-5 lg:pl-[100px] space-y-10">
                    <div className="flex flex-col items-center lg:items-start space-y-5 text-ascend-white">
                        <h1 className="typing-header text-center lg:text-start font-shippori font-extrabold text-7xl sm:text-8xl lg:text-9xl text-shadow-black text-shadow-md">
                            ASCEND
                        </h1>

                        <p className="typing-subheading sm:text-nowrap text-center lg:text-start text-4xl lg:text-4xl italic text-shadow-black">
                            Center for{" "}
                            <span className="text-ascend-yellow font-semibold">
                                Professional
                            </span>{" "}
                            <span className="text-ascend-blue font-semibold">
                                Advancement
                            </span>
                        </p>
                    </div>

                    <button
                        className="w-60 py-3 space-x-1 bg-ascend-blue
                        hover:opacity-80 flex items-center justify-center cursor-pointer text-ascend-white transition-all duration-300"
                    >
                        <span className="font-semibold text-2xl">
                            Enroll Now
                        </span>
                    </button>
                </div>
            </header>

            {/* About Us */}
            <section
                id="about-us"
                className="flex justify-center w-full px-5 lg:px-[100px] py-20 lg:py-40"
            >
                <div className="relative border border-ascend-gray1 w-full lg:ml-40 md:w-170 lg:w-140 bg-ascend-white p-10 space-y-5 shadow-[5px_10px_15px_0px_#0a0a0a]">
                    <h1 className="text-4xl font-shippori font-semibold">
                        About Us
                    </h1>
                    <p className="text-size4 text-justify font-nunito-sans">
                        ASCEND Review Center has had its humble beginnings on
                        March 2015. It was founded then by a group of
                        professionals with outstanding inclination in Teacher
                        Education. Members of this dynamic team were Neilson A.
                        Silva, Lawrence Icasiano, Rosalia Pre and Roberto Aclo.
                        ASCEND started with a meagre of 13 students, but was
                        very thankful since they would be able to start sharing
                        ASCEND’s vision ‘Commitment to Service”. In March 2018,
                        ASCEND finally found the then what can be called, its
                        home! ASCEND acquire its quarter in Santa Rosa City,
                        Laguna. The quarter serves both as its business office
                        and its classroom. Driven with a strong determination
                        and having the academic potentials, ASCEND added
                        academic services by offering academic tutorials and
                        thesis consultations for both master’s and undergraduate
                        research. In 2019, in its good partnership with Asiatech
                        College, ASCEND started offering Certificate in Teaching
                        Program with 20 pilot students. Now and beyond, ASCEND
                        continuously  serves as an extension institution for
                        Teacher Education. Producing global teachers equipped
                        with the necessary tools required for Education 4.0
                    </p>
                    <div
                        data-aos="fade-right"
                        className="absolute hidden lg:block lg:right-60  xl:right-70 top-75 -z-5 bg-ascend-yellow w-xl h-135"
                    ></div>
                    <div
                        data-aos="fade-left"
                        className="absolute hidden lg:block lg:left-20  xl:left-60 bottom-75 -z-5 bg-ascend-blue border w-xl h-135"
                    ></div>
                </div>
            </section>
            <div className="bg-ascend-gray1 h-[0.5px] mx-5 lg:mx-[100px]" />

            {/* Mission & Vision */}
            <section
                id="mission&vison"
                className="sm:flex px-5 lg:px-[100px] py-20 lg:py-40 space-y-10 space-x-10"
            >
                <div
                    data-aos="zoom-in"
                    className="w-full sm:w-1/2 h-full space-y-5 "
                >
                    <h1 className="text-4xl font-shippori font-semibold">
                        Mission
                    </h1>
                    <p className="text-size4 italic text-justify font-nunito-sans">
                        ASCEND is envisioned to become the premier review school
                        for Teacher Education in Southern Luzon.
                    </p>
                </div>
                <div
                    data-aos="zoom-in"
                    className="w-full sm:w-1/2 h-full space-y-5"
                >
                    <h1 className="text-4xl font-shippori font-semibold">
                        Vision
                    </h1>

                    <ul className="list-disc italic pl-5 text-size4 text-justify font-nunito-sans">
                        <li>
                            To help students prepare for their licensure exams
                            by providing quality and effective review program.
                        </li>
                        <li>
                            To maintain a high standard of excellence for
                            Teacher Education aligned with the prescribed
                            curriculum and programs set by the national
                            government.
                        </li>
                        <li>
                            To become a partner of excellence among TEIs in
                            producing licensed professional teachers.
                        </li>
                    </ul>
                </div>
            </section>
            <div className="bg-ascend-gray1 h-[0.5px] mx-5 lg:mx-[100px]" />

            {/* Offered Services */}
            <section
                id="programs"
                className="px-5 lg:px-[100px] py-20 lg:py-40 space-y-10"
            >
                <h1 className="text-4xl text-center font-shippori font-semibold">
                    Offered Services
                </h1>
                <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center space-y-10 md:space-y-0 md:space-x-10 font-nunito-sans">
                    <div
                        data-aos="zoom-in"
                        className="w-full sm:w-120 space-y-2"
                    >
                        <img
                            className="w-full sm:w-120"
                            src="/images/let_review.svg"
                            alt=""
                        />
                        <h1 className="text-size6 font-semibold">LET Review</h1>
                        <p className="text-size4">
                            Teacher Certification in just one term. Your gateway
                            in teaching profession. Take the certification just
                            one semester and be qualified in taking the LET.
                        </p>
                    </div>

                    <div
                        data-aos="zoom-in"
                        className="w-full sm:w-120 space-y-2"
                    >
                        <img
                            className="w-full sm:w-120"
                            src="/images/ctp_program.svg"
                            alt=""
                        />
                        <h1 className="text-size6 font-semibold">
                            Certificate in Teaching Program
                        </h1>
                        <p className="text-size4">
                            Teacher Certification in just one term. Your gateway
                            in teaching profession. Take the certification just
                            one semester and be qualified in taking the LET.
                        </p>
                    </div>
                </div>
            </section>

            {/* Admission Requirements */}
            <section
                id="admission"
                className="relative bg-cover bg-center h-[1200px] space-y-10 bg-gradient-to-r from-black to-ascend-blue"
            >
                <div
                    className="bg-cover absolute z-0 w-full h-full opacity-15"
                    style={{
                        backgroundImage: `url(/images/admission_bg.webp)`,
                    }}
                ></div>
                <div className="flex flex-col items-center px-5 lg:px-[100px] py-20 lg:py-40 w-full space-y-10">
                    <h1 className="relative z-10 text-4xl text-center font-shippori font-semibold text-ascend-white">
                        Admission Requirements
                    </h1>
                    <div className="relative w-full sm:w-0">
                        <div
                            data-aos="flip-left"
                            className="absolute w-full sm:-right-70 lg:-left-2 top-95 lg:top-20 sm:w-120 sm:h-100 bg-ascend-white space-y-10 border border-ascend-gray1 shadow-[5px_10px_15px_0px_#0a0a0a] p-8 text-ascend-black"
                        >
                            <h1 className="font-shippori text-center text-size6 font-semibold">
                                For CTP
                            </h1>
                            <ol class="list-decimal ml-5 text-size4 font-nunito-sans">
                                <li>
                                    Original and Photocopy of TOR (Honorable
                                    Dismissal)
                                </li>
                                <li>
                                    Original and Photocopy of Birth Cert. (PSA)
                                </li>
                                <li>Photocopy of Marriage Certificate</li>
                                <li>Passport size picture (3pcs)</li>
                                <li>Long Brown and Plastic Envelope</li>
                                <li>Application Form</li>
                            </ol>
                        </div>
                        <div
                            data-aos="flip-right"
                            className="absolute w-full sm:-right-50 lg:-right-2 sm:w-120 h-100 bg-ascend-white space-y-10 border border-ascend-gray1 shadow-[5px_10px_15px_0px_#0a0a0a] p-8 text-ascend-black"
                        >
                            <h1 className="font-shippori text-center text-size6 font-semibold ">
                                For LET
                            </h1>
                            <ol class="list-decimal ml-5 text-size4 font-nunito-sans">
                                <li>Accomplished Application Form</li>
                                <li>NOA Photocopy</li>
                                <li>ID size picture (2pcs) </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Us */}
            <section id="contact" className="relative flex w-full md:h-100">
                <div
                    data-aos="fade-up"
                    className="px-5 py-10 md:p-10 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:-top-[50%] w-full max-w-280 md:border md:border-ascend-gray1 bg-ascend-white space-y-10 md:shadow-[5px_10px_15px_0px_#0a0a0a]"
                >
                    <div
                        id="contact"
                        className="w-full flex flex-col md:flex-row space-y-10 items-start md:space-y-0 font-nunito-sans"
                    >
                        <div className="w-full md:w-1/2 space-y-10 flex flex-col text-size4">
                            <h1 className="font-shippori text-4xl font-semibold">
                                Get in Touch
                            </h1>
                            <div className="space-x-2 flex items-center">
                                <AiOutlinePhone className="text-size6 shrink-0" />
                                <p>0919-914-9515 / 0993-423-9308</p>
                            </div>
                            <div className="space-x-2 flex items-center">
                                <AiOutlineMail className="text-size6 shrink-0" />
                                <p>ascendreview@yahoo.com</p>
                            </div>
                            <div className="space-x-2 flex items-center">
                                <AiOutlineFacebook className="text-size6 shrink-0" />
                                <p>
                                    ASCEND Center for Professional Advancement
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 space-y-6">
                            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    className="border border-ascend-black py-3 px-5 focus:outline-ascend-blue"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your email"
                                    className="border border-ascend-black py-3 px-5 focus:outline-ascend-blue"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                />
                                <textarea
                                    name="message"
                                    placeholder="Write a message"
                                    className="border border-ascend-black py-3 px-5 focus:outline-ascend-blue"
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                ></textarea>

                                {submitStatus.message && (
                                    <div className={`p-3 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} flex items-center space-x-2`}>
                                        {submitStatus.success ? (
                                            <AiOutlineCheckCircle className="text-xl" />
                                        ) : (
                                            <AiOutlineCloseCircle className="text-xl" />
                                        )}
                                        <span>{submitStatus.message}</span>
                                    </div>
                                )}

                                <PrimaryButton
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Sending...' : 'Submit'}
                                </PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="px-5 lg:px-[100px] py-10 lg:py-20 w-full bg-ascend-white border-t-[0.5px] border-ascend-gray1 space-y-20">
                <div className="grid lg:grid-cols-[1fr_2fr_2fr] gap-8 lg:gap-4 h-full font-nunito-sans">
                    <div>
                        <img
                            src="/images/ascend_logo.png"
                            alt=""
                            className="w-32 lg:w-40"
                        />
                    </div>
                    <div className="space-y-5 lg:space-y-10 ">
                        <p className="text-size4">
                            611 JPRizal Boulevard, Brgy. Labas, City of Santa
                            Rosa, Laguna
                        </p>
                        <p>0919-914-9515 / 0993-423-9308</p>
                        <p>ascendreview@yahoo.com</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 lg:gap-4">
                        <div>
                            <ul className="space-y-4">
                                {[
                                    { label: "Home", href: "home" },
                                    { label: "About Us", href: "about-us" },
                                    { label: "Programs", href: "programs" },
                                    { label: "Admission", href: "admission" },
                                    { label: "Contact", href: "contact" },
                                ].map((item) => (
                                    <li key={item.href}>
                                        <ReactScrollLink
                                            to={item.href}
                                            smooth={true}
                                            duration={500}
                                            offset={
                                                item.href === "contact" && -300
                                            }
                                            className="cursor-pointer hover:underline"
                                        >
                                            {item.label}
                                        </ReactScrollLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <ul className="space-y-4">
                                <li>
                                    <a
                                        href="https://www.facebook.com/ascendctp"
                                        className="cursor-pointer hover:underline"
                                    >
                                        Facebook
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-center text-ascend-gray2">
                    <span>© 2025 All rights reserved.</span>
                </div>
            </footer>
        </div>
    );
}

LandingPage.layout = null;
