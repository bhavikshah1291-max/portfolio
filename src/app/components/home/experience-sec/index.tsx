import React from 'react';
import ScrollReveal from "../../common/ScrollReveal";

const ExperienceSec = () => {
    const experiences = [
        {
            year: "2021-2026",
            title: "Senior Frontend Developer",
            company: "Fortinet Inc",
            type: "Sunnyvale, USA",
            description: "At Fortinet, I architected and independently developed multiple enterprise-grade React, Next.js, and TypeScript applications, including the Firewall ROI Calculator, Product Carbon Footprint Calculator, Firewall Upgrade Advisor, and OT Evaluation platform. I also led the redesign of Fortinet's global marketing website, delivering high-performance, responsive, ADA-compliant, and multilingual user experiences. Beyond feature development, I improved application performance, implemented secure authentication, established automated testing with Jest and Cypress, optimized SEO and Lighthouse scores, and collaborated across engineering, product, design, and QA teams to deliver scalable, production-ready solutions used by customers worldwide."},
         {
            year: "2018-2021",
            title: "Frontend Developer",
            company: "Kaiser Permanente",
            type: "Pleasanton, USA",
            description: "At Kaiser Permanente, I developed enterprise healthcare applications using React, Angular, Node.js, Express, GraphQL, PostgreSQL, and AEM. I built real-time dashboards for appointment and room management, developed scalable backend services and secure checkout workflows, and implemented testing, CI/CD, performance optimization, and monitoring solutions to deliver reliable, high-performance applications for healthcare staff and members."},
         {
            year: "2017-2018",
            title: "Software Developer",
            company: "Kohl’s",
            type: "Milpitas, USA",
            description: "Led the migration of Kohl’s E-Commerce Service Center from Oracle ATG to a React application, enabling agents to efficiently place orders on behalf of customers. Managed the full development lifecycle including architecture, implementation, testing, deployment, and post-launch optimization. Built scalable backend services using Node.js and Express and developed custom agent dashboards with role-based access control (ACL), improving operational efficiency, security, and data accessibility."
        },
         {
            year: "2016-2017",
            title: "Front End Developer",
            company: "American Express",
            type: "Phoenix, USA",
            description: "Developed AMEX API portal (Live), integrating React and Angular under one platform, improving API interactions and reducing latency. Developed User management, Signup Flow, Login, Form Validation and Product module in React. Developed Internal Dev Portal from JSP to Angular 2.0, enhancing UI performance."
        },
        {
            year: "2013-2014",
            title: "Software Developer",
            company: "Hi-Tek",
            type: "Mumbai, India",
            description: "Built scalable healthcare web applications, transitioning from traditional websites to AngularJS, implementing modular components, optimizing UI performance, and ensuring cross-browser compatibility." },
 
    ];

    return (
        <section id="experience">
            <div className="py-16 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
                        <h2>Experience</h2>
                    </div>

                    <div className="space-y-7 md:space-y-12">
                        {experiences.map((exp, index) => (
                            <ScrollReveal key={index} delay={index * 70}>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-4 xl:gap-8 items-start relative">
                                    <div className="">
                                        <h3 className="font-bold mb-2 text-black">{exp.year}</h3>
                                        <h4 className="text-lg font-normal">{exp.title}</h4>
                                    </div>

                                    <div className=" relative">
                                        {index < experiences.length && (
                                            <div className={`absolute left-0 top-3 w-px ${index < experiences.length - 1 ? 'h-40' : 'h-30'} bg-softGray`}></div>
                                        )}

                                        <div className="no-print absolute left-0 top-0 transform -translate-x-1/2">
                                            <div className={`no-print w-3.5 h-3.5 rounded-full border-1 bg-white flex items-center justify-center ${index === 0 ? 'border-primary' : 'border-black'
                                                }`}>
                                                {index === 0 && (
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="pl-4 lg:pl-7">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xl text-black font-normal">{exp.company}</span>
                                            </div>
                                            <p className="text-base font-normal">{exp.type}</p>
                                        </div>
                                    </div>

                                    <div className="pl-8 sm:pl-0">
                                        <p className="leading-relaxed text-base">{exp.description}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSec;