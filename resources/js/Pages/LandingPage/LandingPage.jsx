import LandingpageNav from "./LandingpageNav";

export default function LandingPage({ text }) {
    return (
        <div>
            <LandingpageNav />
            <header className="relative h-[759px] w-full bg-cover bg-center flex flex-col justify-center bg-gradient-to-b from-black to-gray-400">
                <div
                    className="border-white bg-cover absolute z-0 w-full h-full opacity-20"
                    style={{
                        backgroundImage: `url(/images/landingpage_bg.webp)`,
                    }}
                ></div>
                {/* Header content */}
                <div className="text-center lg:text-start flex flex-col items-center lg:items-start w-full px-5 lg:pl-[100px] space-y-10">
                    <div className="space-y-5 text-ascend-white">
                        <h1 className=" font-shippori font-extrabold text-7xl sm:text-8xl lg:text-9xl text-shadow-black text-shadow-md">
                            ASCEND
                        </h1>
                        <p className="text-4xl lg:text-4xl italic text-shadow-black">
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
            <section className="flex justify-center w-full px-5 lg:px-[100px] py-20 lg:py-40">
                <div className="relative border w-full lg:ml-40 md:w-170 lg:w-140 bg-ascend-white p-10 space-y-5 shadow-[5px_10px_15px_0px_#3d3d3d]">
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
                    <div className="absolute hidden lg:block lg:right-60  xl:right-70 top-75 -z-5 bg-ascend-yellow w-xl h-135"></div>
                    <div className="absolute hidden lg:block lg:left-20  xl:left-60 bottom-75 -z-5 bg-ascend-blue border w-xl h-135"></div>
                </div>
            </section>
            <div className="bg-ascend-black h-[0.5px] mx-5 lg:mx-[100px]" />
            {/* Mission & Vision */}
            <section className="sm:flex px-5 lg:px-[100px] py-20 lg:py-40 space-y-10 space-x-10">
                <div className="w-full sm:w-1/2 h-full space-y-5">
                    <h1 className="text-4xl font-shippori font-semibold">
                        Mission
                    </h1>
                    <p className="text-size4 italic text-justify font-nunito-sans">
                        ASCEND is envisioned to become the premier review school
                        for Teacher Education in Southern Luzon.
                    </p>
                </div>
                <div className="w-full sm:w-1/2 h-full space-y-5">
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
            <div className="bg-ascend-black h-[0.5px] mx-5 lg:mx-[100px]" />

            {/* Offered Services */}
            <section className="px-5 lg:px-[100px] py-20 lg:py-40 space-y-10">
                <h1 className="text-4xl text-center font-shippori font-semibold">
                    Offered Services
                </h1>
                <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center space-y-10 md:space-y-0 md:space-x-10 font-nunito-sans">
                    <div className="w-full sm:w-120 space-y-2">
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

                    <div className="w-full sm:w-120 space-y-2">
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
            <section className="relative bg-cover bg-center h-[1320px] space-y-10 bg-gradient-to-r from-black to-ascend-blue">
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
                    <div className="relative w-full sm:w-0 border border-white">
                        <div className="absolute w-full sm:-right-70 lg:-left-2 top-95 lg:top-20 sm:w-120 sm:h-100 bg-ascend-white space-y-10 border shadow-[5px_10px_15px_0px_#0a0a0a] p-8 text-ascend-black">
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
                        <div className="absolute w-full sm:-right-50 lg:-right-2 sm:w-120 h-100 bg-ascend-white space-y-10 border shadow-[5px_10px_15px_0px_#0a0a0a] p-8 text-ascend-black">
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
        </div>
    );
}

LandingPage.layout = null;
