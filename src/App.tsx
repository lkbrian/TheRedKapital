import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [direction, setDirection] = useState("enter"); // Keeps track of the direction (enter or leave)

  const splashScreenWordings = [
    {
      title: "Empowering You, Every Step of the Way!",
      explanation:
        "Our loaning process is designed to support you at every stage, making your financial journey smoother and more accessible.",
    },
    {
      title: "Fast, Flexible Loans When You Need Them Most!",
      explanation:
        "We offer fast approval and flexible repayment options, ensuring you get the help you need quickly and on your terms.",
    },
    {
      title: "Your Trusted Partner in Financial Freedom!",
      explanation:
        "With our expertise and commitment, we’re here to help you gain control over your financial future, providing the resources you need to thrive.",
    },
    {
      title: "Quick, Easy, and Secure Loan Solutions!",
      explanation:
        "Get approved for a loan quickly with our easy application process, all while ensuring your information is secure and protected.",
    },
  ];

  // const tagLine: string = "Bridging your fainacial gap";
  const productDescriptions = [
    {
      category: "Business Loans",
      name: "LPO Financing",
      description:
        "A short-term loan for suppliers with tenders from reputable organizations. Covers up to 100% of expected costs to complete the job. Loan approval within 24 hours if terms and conditions are met.",
    },
    {
      category: "Business Loans",
      name: "Business Loans",
      description:
        "Tailored loans for businesses needing trade finance, stock purchase, business improvement, or other business-related needs.",
    },
    {
      category: "Business Loans",
      name: "Invoice Discounting",
      description:
        "Loans for individuals who have delivered orders, issued invoices, and are awaiting payments, usually within 1-2 months.",
    },
    {
      category: "Business Loans",
      name: "Cheque Discounting",
      description:
        "Loans based on post-dated cheques from reputable organizations like restaurants and hospitals. Loan term ranges from 1 week to 1 month.",
    },
    {
      category: "Personal Loans",
      name: "Salary Advance",
      description:
        "Loans for salaried employees from the 15th of the month, repaid upon receiving their salary. Available for private organizations with an MOU with Red Kapital.",
    },
  ];
  const features = [
    {
      title: "Quick Approvals",
      description:
        "Loan approvals in under an hour, with disbursements processed within 30 minutes.",
    },
    {
      title: "Hassle-Free Process",
      description:
        "Simple, straightforward application process with minimal requirements.",
    },
    {
      title: "Flexible Terms",
      description:
        "Customizable repayment plans to suit your cash flow and needs.",
    },
    {
      title: "Tailored Products",
      description:
        "Financing solutions customized to meet both personal and business needs.",
    },
    {
      title: "Dedicated Support",
      description:
        "A partner you can rely on to grow and succeed, with support at every step.",
    },
    {
      title: "Transparent Policies",
      description:
        "Clear and fair policies to ensure trust and confidence in every transaction.",
    },
  ];
  const aboutUs = [
    {
      title: "Mission",
      content:
        "To empower individuals and businesses by providing fast, flexible, and reliable financial solutions tailored to their unique needs.",
    },
    {
      title: "Vision",
      content:
        "To be the leading financial partner recognized for innovation, trust, and exceptional customer service, inspiring success for generations.",
    },
    {
      title: "History",
      content:
        "Founded in 2010, The Red Kapital has grown from a small financial service provider into a trusted name in the industry, serving thousands of clients with dedication and expertise.",
    },
  ];
  const length = splashScreenWordings.length;
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDirection("leave"); // Start moving out
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % length);
        setDirection("enter"); // Start moving in
      }, 600); // Wait for the "leave" animation to complete
    }, 10000); // Change word every 3 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [length]);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="body--container">
      <header className="z-[1100]">
        <nav className="secondary--nav max-sm:flex-col-reverse">
          <p>Reach us at info@redkapital.com | 0722 734 886</p>
          <div className="social-icons">
            <a aria-label="TikTok">
              <i className="fab fa-tiktok"></i>
            </a>
            <a aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </nav>
        <nav className="main--nav">
          <div className="header--logo">
            <img src="images/RedKapitalLogo.png" alt="" />
          </div>
          <div className="header--links">
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#products">Products</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#why-us">Why Us</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
            <button
              type="button"
              className="inquire--button px-4 py-1 rounded-full"
            >
              Inquire
            </button>
            <div onClick={toggleNav} className="menu--icon ml-2">
              <i className="fa-solid fa-bars text-[1.35rem] cursor-pointer"></i>
            </div>
          </div>
        </nav>
        <nav
          className={`fixed z-[2000] top-0 left-0 h-full w-64 bg-[#7d0800] text-white transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-40 lg:hidden`}
        >
          <button
            onClick={toggleNav}
            className="absolute top-4 right-4 rounded-full flex items-center justify-center h-[30px] w-[30px] text-gray-400 hover:text-white"
          >
            <i className="fa-solid fa-close"></i>
          </button>
          <ul className="mt-20 space-y-4 px-4 ">
            <li className="list-none hover:text-gray-400">
              <a href="#home">Home</a>
            </li>
            <li className="list-none hover:text-gray-400">
              <a href="#about">About</a>
            </li>
            <li className="list-none hover:text-gray-400">
              <a href="#services">Services</a>
            </li>
            <li className="list-none hover:text-gray-400">
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {/* Home Section */}
        <section id="home" className=" min-h-[40vh] p-1 min-lg:p-[3rem]">
          <div className="home--content">
            <div className="content">
              <h1
                className={`text-4xl font-bold text-gray-800 transition-all duration-1000 
          ${
            direction === "enter"
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-[-60%]"
          }`}
              >
                {splashScreenWordings[currentWordIndex].title}
              </h1>

              <p
                className={`home--explain text-4xl font-bold text-gray-800 transition-all duration-1000 
          ${
            direction === "enter"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[100%]"
          }`}
              >
                {splashScreenWordings[currentWordIndex].explanation}
              </p>
            </div>
            {/* <div className="home--shape"></div> */}
          </div>
          <div className="home--images">
            <div className="home--image--one relative">
              <img src="images/12-loan-works.png" alt="Loan image" />
              <div className="loan--card p-2 rounded-md bg-[#7d0800] text-white">
                <p>Your loan has been disbursed</p>
                <span className="font-bold text-2xl">KES 32,350</span>
              </div>
              <div className="shape--img--one shadow-xl shadow-[#f7191c]"></div>
              {/* <div className="shape--img--two"></div> */}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="products" className="py-[1rem]">
          <h1 className="relative text-4xl text-[#7d0800] border-b-[4px] border-[#f7191c]   pt-4.5 font-[800]">
            Our Products
          </h1>
          <p className="py-4 max-w-2xl text-center">
            Our company offers a variety of financing solutions to meet your
            financial needs, including salary advances, business loans, and
            asset financing
          </p>
          <div className="products--container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:w-[75%] gap-8 mx-auto w-[90%] place-items-center">
            {productDescriptions.map((item, index) => (
              <div
                key={index}
                className="product bg-white shadow-md shadow-[#7d080046] rounded-lg overflow-hidden transition-shadow"
              >
                <div className="product--image h-40">
                  <img
                    src="images/Bankgroup.jpg"
                    alt="Product Image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <h4 className="text-lg font-bold text-[#7d0800] text-center mb-2">
                    {item.name}
                  </h4>
                  <p className="text-gray-600 text-sm text-center mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  <div className="flex flex-row justify-around gap-0.5 w-full">
                    <button className="bg-[#f7191c] text-white text-sm font-medium rounded-full px-2 py-2 mt-auto transition">
                      {item.category}
                    </button>
                    <button className="bg-[#f7191c] text-white text-sm font-medium rounded-full px-6 py-2 mt-auto transition">
                      Apply now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="pt-[2rem] max-sm:flex max-sm:flex-col h-[40vh] relative p-0.5 max-sm:py-16 max-sm:h-fit min-lg:pt-[4rem] text-white"
        >
          <img
            src="images/Bankgroup.jpg"
            alt="Background"
            className=" -z-20 absolute inset-0 w-full h-full object-cover"
          />
          <div className=" -z-10 absolute inset-0 bg-gradient-to-r from-[#f7191c] to-[#7d0800] opacity-75"></div>
          <div className="about--container mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
              Who We Are
            </h2>
            <p className="text-base sm:text-lg  text-white max-w-3xl mx-auto mb-8">
              Red Kapital is a customer-focused financial partner, providing
              fast, reliable, and accessible loan solutions to empower
              individuals and businesses.
            </p>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col items-center text-white rounded-lg p-6 w-full">
                <h3 className="text-xl sm:text-2xl font-semibold  mb-3">
                  Mission
                </h3>
                <p className="text-sm sm:text-base text-center mb-4">
                  Our mission is to be the most trusted financial partner,
                  empowering customers with fast, flexible, and accessible
                  financial solutions to help them succeed.
                </p>
              </div>
              <div className="flex flex-col items-center text-white  rounded-lg p-6 w-full">
                <h3 className="text-xl sm:text-2xl font-semibold  mb-3">
                  Vision
                </h3>
                <p className="text-sm sm:text-base text-center mb-4">
                  Our vision is to create an inclusive financial ecosystem where
                  every individual and business can thrive with the right
                  support at the right time.
                </p>
              </div>
            </div> */}
          </div>

          <div className="cards w-[90%] mx-auto absolute min-lg:w-[80%] flex flex-row flex-nowrap max-sm:flex-col max-sm:relative justify-between rounded-md gap-[1rem] -bottom-4 min-md:-bottom-14 min-lg:-bottom-14">
            {aboutUs.map((item, index) => (
              <div
                className="card flex flex-col shadow-md w-1/4 max-md:w-1/2 max-lg:w-1/3 max-sm:w-[90%] max-sm:justify-center bg-white opacity-98 rounded-[.5rem] mx-auto max-xl:w-1/4"
                key={index}
              >
                <div className="flex flex-row  justify-center items-end gap-2 max-sm:flex-col max-sm:items-center">
                  <h1
                    // id="stroke"
                    className="text-5xl font-[900] text-[#7d0800]"
                  >
                    0 {index + 1}
                  </h1>
                  <h1 className="text-2xl text-center font-[800] text-[#f7191c]">
                    {item.title}
                  </h1>
                </div>
                <p className="w-[90%] text-center mx-auto text-[.95rem] text-[#111] py-1.5">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="why-us" className="py-16 md:py-20 bg-white">
          <div className="why--container mx-auto text-center max-w-6xl px-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#7d0800] mb-8">
              Why Choose Red Kapital?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-[#f9f9f9] shadow-xl rounded-xl p-6"
                >
                  <span className="text-4xl text-[#f7191c] mb-4">✔</span>
                  <h4 className="text-lg sm:text-xl font-semibold text-[#7d0800] mb-4">
                    {feature.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-700 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="flex flex-col-reverse lg:flex-row gap-8 mb-0"
        >
          {/* Map Section */}
          <div className="contact--map w-[100%] h-[450px] flex-1 min-lg:flex-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d63821.41328108796!2d36.814923!3d-1.2699330999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ske!4v1737978315523!5m2!1sen!2ske"
              width="100%"
              height="100%"
              className="w-full h-200 lg:h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Form Section */}
          <div className="contact--container w-[100%]  sm:px-[1rem] md:w-[70%] lg:w-[60%] xl:px-[3rem] flex-1  lg:p-2">
            <h2 className="text-2xl font-bold text-center text-[#7d0800] mb-4">
              Get in Touch
            </h2>
            <form className="flex flex-col w-[100%] ] mx-auto gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7191c]"
              />
              <input
                type="email"
                placeholder="Email"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7191c]"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7191c]"
              />
              <textarea
                placeholder="Message"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7191c] resize-none"
                // rows="4"
              ></textarea>
              <button
                type="submit"
                className="bg-[#f7191c] text-white py-2 px-4 rounded-md hover:bg-[#c71617] transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-100">
        <div className="container flex flex-col flex-wrap px-5 py-10 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
          <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
            <a className="flex items-center justify-center font-bold text-[#303030] title-font md:justify-start">
              <img src="images/logo.png" alt="" />
            </a>
            {/* <p className="mt-2 text-sm ">{tagLine}</p> */}
            {/* <div className="mt-4">
              <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
                <a className="ml-3 cursor-pointer">logo</a>
                <a className="ml-3  cursor-pointer"></a>
                <a className="ml-3  cursor-pointer"></a>
                <a className="ml-3  cursor-pointer"></a>
              </span>
            </div> */}
          </div>
          <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-bold tracking-widest text-[#303030] uppercase title-font">
                About
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                    Company
                  </a>
                </li>
                <li className="mt-3">
                  <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                    Careers
                  </a>
                </li>
                <li className="mt-3">
                  <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                    Blog
                  </a>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-bold tracking-widest text-[#303030] uppercase title-font">
                Support
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                    Contact Support
                  </a>
                </li>
                <li className="mt-3">
                  <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                    Help Resources
                  </a>
                </li>
                <li className="mt-3">
                  <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                    Release Updates
                  </a>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-bold tracking-widest text-[#303030] uppercase title-font">
                Platform
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                    Terms &amp; Privacy
                  </a>
                </li>
                <li className="mt-3">
                  <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                    Pricing
                  </a>
                </li>
                <li className="mt-3">
                  <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                    FAQ
                  </a>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-bold tracking-widest text-[#303030] uppercase title-font">
                Contact
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                    Send a Message
                  </a>
                </li>
                <li className="mt-3">
                  <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                    Request a Quote
                  </a>
                </li>
                <li className="mt-3">
                  <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                    +123-456-7890
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="border-t border-[#f7191c]">
          <div className="container px-5 py-2 mx-auto">
            <p className="text-sm text-[#f7191c] capitalize xl:text-center">
              Tris Technologies © 2025 All rights reserved{" "}
            </p>
          </div>
        </div>
      </footer>
      <a
        href="https://api.whatsapp.com/send/?phone=254704807868&text="
        target="_blank"
        className="floating--icon"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
}

export default App;
