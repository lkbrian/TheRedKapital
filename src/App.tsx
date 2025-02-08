import { useEffect, useRef, useState } from "react";
import "./App.css";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import Dialog from "./components/Dialog/Dialog";
import {
  splashScreenWordings,
  navItems,
  productDescriptions,
  features,
  aboutUs,
  FAQs,
  loanBlogs,
} from "./uitls";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [direction, setDirection] = useState("enter"); // Keeps track of the direction (enter or leave)
  const [subject, setSubject] = useState("General Inquiry");
  const [visibleItems, setVisibleItems] = useState(3);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

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
  const toogleChat = () => {
    setChatOpen(!chatOpen);
  };

  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_PUBLIC_ID,
        }
      )
      .then(
        () => {
          console.log("SUCCESS!");
          toast.success("Message sent sucessfully !", {
            position: "top-right",
          });
          form.current?.reset();
          setSubject("General Inquiry");
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error(
            "Message failed to send we are working to resolve this error.",
            {
              position: "top-right",
            }
          );
        }
      );
  };
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setVisibleItems(3);
    } else if (window.innerWidth >= 768) {
      setVisibleItems(2);
    } else {
      setVisibleItems(1);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const nextSlide = () => {
    if (transitioning) return;
    setTransitioning(true);
    if (slideIndex < loanBlogs.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setSlideIndex(0);
    }
    if (currentSlideIndex < loanBlogs.length - visibleItems) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      setCurrentSlideIndex(0);
    }
  };

  const prevSlide = () => {
    if (transitioning) return;
    setTransitioning(true);

    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex < 0) {
      setSlideIndex(loanBlogs.length - 1);
    }

    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    } else {
      setCurrentSlideIndex(loanBlogs.length - visibleItems);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitioning(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentSlideIndex]);

  return (
    <div className="body--container">
      <header className="z-[1100] fixed w-[100%]">
        <nav className="secondary--nav max-sm:flex-col-reverse">
          <p>Reach us at info@redkapital.com | 0722 734 886</p>
          <div className="social-icons">
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
        <nav className="main--nav  ">
          <div className="header--logo">
            <img src="images/logo.png" alt="" />
          </div>
          <div className="header--links">
            <ul>
              {navItems.map((item) => (
                <li key={item.id} className="">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
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
            {navItems.map((item) => (
              <li
                onClick={toggleNav}
                key={item.id}
                className="list-none hover:text-gray-400"
              >
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="mt-[100px]">
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
              {/* <div className="shape--img--one shadow-xl shadow-[#f7191c]"></div> */}
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
                    src={item.image}
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
                    <a
                      href="#contact"
                      onClick={() => {
                        setSubject(item.name);
                      }}
                      className="bg-[#f7191c] text-white text-sm font-medium rounded-full px-6 py-2 mt-auto transition"
                    >
                      Apply now
                    </a>
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
            <h2 className="text-3xl sm:text-4xl  font-extrabold tracking-tight mb-6">
              Who We Are
            </h2>
            <p className="py-4 max-w-2xl text-center  text-white mx-auto">
              Red Kapital is a customer-focused financial partner, providing
              fast, reliable, and accessible loan solutions to empower
              individuals and businesses.
            </p>
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
        <section className="flex flex-row-reverse min-h-auto max-lg:flex-col min-md:min-h-[30vh] min-md:px-20 max-md:text-center">
          {/* Text Content */}
          <div className="flex-1 p-4 max-lg:pt-16 min-xl:pt-0">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#7d0800] mb-8 max-sm:text-center">
              History
            </h2>
            <p className="text-[1rem] w-[70%] max-md:mx-auto max-md:w-[96%]">
              Founded in 2010, The Red Kapital has grown from a small financial
              service provider into a trusted name in the industry, serving
              thousands of clients with dedication and expertise. Over the
              years, we have expanded our reach, consistently delivering
              innovative financial solutions that empower businesses and
              individuals alike.
            </p>
          </div>

          {/* Image and Stats */}
          <div className="flex-1 p-4 min-md:pt-20">
            <div className="relative box-border h-[500px] min-lg:p-16">
              <img
                className="object-contain h-full w-full rounded-md"
                src="/images/history.jpg"
                alt="Bank Group"
              />
              {/* Years of Experience Badge */}
              <div className="absolute bottom-[10%] right-[10%] bg-[#f7191c] text-white w-[150px] h-[150px] border-[12px] border-white flex flex-col justify-center items-center">
                <span className="font-extrabold text-6xl">7+</span>
                <span className="font-normal text-[1rem] -mt-2">years</span>
              </div>
            </div>
          </div>
        </section>

        <section id="why-us" className="py-16 md:py-20 bg-[#f2f2f2]">
          <div className="why--container mx-auto text-center max-w-6xl px-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#7d0800] mb-8 ">
              Why Choose Red Kapital?
            </h2>
            <p className="py-4 max-w-2xl text-center mx-auto">
              Red Kapital is a customer-focused financial partner, providing
              fast, reliable, and accessible loan solutions to empower
              individuals and businesses.
            </p>

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

        <div id="contact" className="flex-col w-[100%]">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#7d0800] mb-8 text-center">
            Contact us
          </h2>
          <p className="py-4 max-w-2xl text-center mx-auto">
            Ready to take the next step in your financial journey?
            <br /> Reach out to us, and we'll help you navigate your loan
            options.
          </p>
          <section className="flex flex-col-reverse min-xl:flex-row-reverse mb-0">
            {/* Map Section */}
            <div className="contact--map w-[100%] h-[450px] flex-1 ">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7919101113516!2d36.81761597585846!3d-1.2996633356427256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10e3f05157df%3A0x6fe3154c5f0c2ccb!2sLower%20Hill%20Duplex%20Building%2C%20Bunyala%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1738883871080!5m2!1sen!2ske"
                width="100%"
                height="100%"
                className="w-full h-200 lg:h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Contact Form Section */}
            <div className="contact--container w-[96%] gap-3 flex flex-row max-sm:flex-col sm:px-[1rem] md:w-[90%] lg:w-[80%] xl:px-[10px] flex-1  lg:p-2 pb-1.5">
              <div className="flex-1 max-sm:min-h-[220px] bg-[#7d0800] text-white rounded-l-md mr-1 p-2 max-sm:rounded-t-md max-sm:mr-0 max-sm:rounded-bl-none">
                <h2 className="text-2xl font-bold py-2 pb-3 mb-4">Reach Us</h2>
                <div className=" max-sm:h-[100%] space-y-4 max-md:flex flex-col max-md:justify-between">
                  <div className="flex flex-col gap-3 justify-between max-sm:h-[100%] ">
                    <div className="flex items-center gap-3">
                      <div className="border-[2px] border-white rounded-full p-1.5 w-[40px] h-[40px] flex items-center justify-center">
                        <i className="fas fa-phone-alt text-white text-lg"></i>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-[1.2rem]">Call Us</h3>
                        <span className="text-[0.9rem]">+254 703 122 558</span>
                        <span className="text-[0.9rem]">+254 722 734 886</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="border-[2px] border-white rounded-full p-1.5 w-[40px] h-[40px] flex items-center justify-center">
                        <i
                          // style={{ fontSize: "14px" }}
                          className="fas fa-envelope text-white text-lg"
                        ></i>
                      </div>

                      <div className="flex flex-col">
                        {" "}
                        <h3 className="font-semibold text-[1.2rem]">
                          Email Us
                        </h3>
                        <span>
                          <a
                            className="text-[0.9rem]"
                            href="mailto:info@redkapital.com"
                          >
                            info@redkapital.com
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 justify-between">
                    <div className="flex items-center gap-3">
                      <div className="border-[2px] border-white rounded-full p-1.5 w-[40px] h-[40px] flex items-center justify-center">
                        <i className="fas fa-map-marker-alt text-white text-lg"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[1.2rem]">
                          Head Office
                        </h3>
                        <p className="text-[0.9rem]">
                          Lower Hill Duplex Apartments,{" "}
                        </p>
                        <p className="text-[0.9rem]">
                          Suite 50, Lower Hill Road, Upper Hill.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="border-[2px] border-white rounded-full p-1.5 w-[40px] h-[40px] flex items-center justify-center">
                        <i className="fas fa-map-marker-alt text-white text-lg"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[1.2rem]">
                          Branch Office
                        </h3>
                        <p className="text-[0.9rem]">
                          Imarisha Sacco Building, 2nd Floor,
                        </p>
                        <p className="text-[0.9rem]">
                          {" "}
                          Nakuru-Kericho Highway,
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-2 pb-1.5">
                {" "}
                <h2 className="text-2xl  font-bold text-[#7d0800] mb-4">
                  Get in Touch
                </h2>
                <form
                  ref={form}
                  onSubmit={sendEmail}
                  className="flex flex-col w-[100%] ] mx-auto gap-4"
                  id="contact--form"
                >
                  <input
                    required
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7191c]"
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7191c]"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    name="number"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7191c]"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    name="Subject"
                    value={subject}
                    readOnly
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7191c]"
                  />
                  <textarea
                    required
                    placeholder="Message"
                    className="textarea--contact p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7191c] resize-none"
                    // rows="4"
                    name="message"
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-[#f7191c] text-white py-2 px-4 rounded-md hover:bg-[#c71617] transition duration-300"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
        <section id="blogs" className="w-full py-12 bg-[#f9f9f9] flex flex-col">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#7d0800] mb-2 text-center pt-4">
              Latest Blogs
            </h2>
            <p className="py-4 mx-auto max-w-2xl text-center self-center">
              Stay informed with our latest articles and learn how we can help
              you navigate your financial journey with tailored solutions to
              meet your needs.
            </p>
          </div>

          <div className="relative flex flex-col items-center justify-center w-[95%] md:w-[90%] lg:w-[75%] xl:w-[65%] mx-auto">
            {/* Left Arrow Button */}
            <button
              // style={{ width: "50px", height: "50px" }}
              className="flex items-center justify-center w-[40px] h-[40px] bg-[#7d0800] text-white p-2 rounded-full absolute -left-2 top-1/2 transform -translate-y-1/2 hover:bg-[#5d0600] transition-all"
              onClick={prevSlide}
            >
              <i className="fa-solid fa-chevron-left text-2xl"></i>
            </button>
            {/* Blogs Container */}
            <div className="blogs--container transition-transform duration-600 ease-in-out mx-auto flex gap-6 justify-center px-4">
              {loanBlogs
                .slice(currentSlideIndex, currentSlideIndex + visibleItems)
                .map((item, index) => (
                  <div
                    className={`blog--item bg-white p-6 shadow-xl rounded-xl w-full sm:w-[80%] md:w-[45%] min-lg:w-[30%] transition-all duration-500 ease-in-out 
            ${transitioning && index === 0 ? "scale-95 opacity-70" : ""}  
            ${
              transitioning && index === visibleItems - 1
                ? "scale-105 opacity-70"
                : ""
            }  
            ${
              !transitioning && index !== 0 && index !== visibleItems - 1
                ? "scale-100 opacity-100"
                : ""
            }  
            `}
                    key={index}
                  >
                    <h3 className="text-xl font-semibold text-[1rem] truncate mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#555] pt-2 text-[0.9rem] line-clamp-7">
                      {item.message}
                    </p>
                    <div className="flex justify-between items-center py-2">
                      <div className="flex gap-1.5 text-[0.85rem] text-[#f7191c] flex-row items-center cursor-pointer">
                        <span>Read more</span>
                        <i
                          style={{ fontSize: "12px" }}
                          className="fa-solid fa-arrow-right a--right"
                        ></i>
                      </div>
                      <span className="text-xs text-[#555]">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex gap-2 w-[100%] flex-wrap">
                      {item.hashtags.slice(2).map((hashtag, index) => (
                        <div
                          key={index}
                          className="bg-[#f7191d13] p-1 px-2 rounded-full"
                        >
                          <span className="text-[0.7rem] text-[#f7191c]">
                            {hashtag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-center items-center gap-2 mt-2">
              {loanBlogs.map((_, index) => (
                <div
                  className={`h-[10px] w-[10px] rounded-full ${
                    slideIndex === index
                      ? "bg-[#f7191c] scale-150"
                      : "bg-[#f7191d2f]"
                  }`}
                ></div>
              ))}
            </div>
            {/* Right Arrow Button */}
            <button
              className={`flex items-center justify-center bg-[#7d0800] w-[40px] h-[40px] text-white p-2 rounded-full absolute -right-2 top-1/2 transform -translate-y-1/2 hover:bg-[#5d0600] transition-all `}
              onClick={nextSlide}
              // disabled
            >
              <i className="fa-solid fa-chevron-right text-2xl"></i>
            </button>
          </div>
        </section>

        <section
          id="faqs"
          className="w-[100%] flex-col mx-auto px-5 bg-white min-h-sceen"
        >
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-5xl pt-6 tracking-tight text-[#7d0800]">
              FAQs
            </h2>
            <p className=" text-md mt-3  mx-auto max-w-2xl text-center">
              Have questions about our loan products or services? Our FAQ
              section provides clear and concise answers to the most common
              inquiries we receive. Whether you're looking for details on loan
              eligibility, application processes, or repayment options.
            </p>
          </div>

          <div className="grid divide-y divide-neutral-200  min-md:w-[70%] w-[90%] mx-auto mt-8">
            {FAQs.map((item, index) => (
              <div className="py-5 w-[100%]" key={index}>
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span className="hover:text-[#f7191c]">
                      {" "}
                      {item.question}
                    </span>
                    <span className="transition group-open:rotate-180">
                      <svg
                        fill="none"
                        height="24"
                        shapeRendering="geometricPrecision"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                    {item.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#f2f2f2]">
        <div className="container flex flex-col flex-wrap px-5 py-10 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
          <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
            <a className="flex items-center justify-center font-bold text-[#303030] title-font md:justify-start">
              <img src="images/logo.png" alt="" />
            </a>
          </div>
          <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-bold tracking-widest text-[#303030] uppercase title-font">
                Contact
              </h2>
              <nav className="list-none">
                <li className="mt-3">
                  <a href="mailto:info@redkapital.com">info@redkapital.com</a>
                </li>
                <li className="mt-3">
                  <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                    +254 722 734 886
                  </a>
                </li>
              </nav>

              <nav className="mb-10 list-none">
                <h2
                  style={{ marginTop: "10px" }}
                  className="mb-3 mt-4 text-sm font-bold tracking-widest text-[#303030] uppercase title-font"
                >
                  Socials
                </h2>
                <nav className="mb-10 list-none">
                  <li className="mt-3">
                    <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                      Instagram
                    </a>
                  </li>
                  <li className="mt-3">
                    <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                      Facebook
                    </a>
                  </li>
                  <li className="mt-3">
                    <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                      X
                    </a>
                  </li>
                  <li className="mt-3">
                    <a
                      href="https://api.whatsapp.com/send/?phone=254704807868&text="
                      target="_blank"
                      className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]"
                    >
                      Whatsapp
                    </a>
                  </li>
                </nav>
              </nav>
            </div>
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-bold tracking-widest text-[#303030] uppercase title-font">
                Quick links
              </h2>
              <nav className="mb-10 list-none">
                {navItems.map((item) => (
                  <li key={item.id} className="mt-3">
                    <a
                      className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]"
                      href={item.href}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </nav>
            </div>
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-bold tracking-widest text-[#303030] uppercase title-font">
                Products
              </h2>
              <nav className="mb-10 list-none">
                {productDescriptions.map((item, index) => (
                  <li key={index} className="mt-3">
                    <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                      {item.name}
                    </a>
                  </li>
                ))}
                <h2
                  style={{ marginTop: "10px" }}
                  className="mb-3 text-sm font-bold tracking-widest text-[#303030] uppercase title-font"
                >
                  Company
                </h2>
                <nav className="list-none">
                  <li className="mt-1">
                    <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                      Careers
                    </a>
                  </li>
                </nav>
              </nav>
            </div>
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2
                // style={{ marginTop: "10px" }}
                className="mb-3 text-sm font-bold tracking-widest text-[#303030] uppercase title-font"
              >
                Offices
              </h2>
              <nav className="mb-10 list-none">
                <li className="">
                  <p>
                    <strong>Nairobi</strong>
                  </p>
                  <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                    Lower Hill Duplex Apartments,
                    <br />
                    Suite 50, Lower Hill Road, Upper Hill.
                  </a>
                </li>
                <li className="mt-3">
                  <p>
                    <strong>Kericho</strong>
                  </p>
                  <a className=" cursor-pointer hover:text-[#f7191c] text-[.9rem]">
                    Imarisha Sacco Building,
                    <br />
                    2nd Floor,
                    <br />
                    Nakuru-Kericho Highway,
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="border-t border-[#f7191c]">
          <div className="container px-5 mx-auto">
            <p className="text-sm text-[#f7191c] capitalize xl:text-center">
              The Red Kapital © 2025 All rights reserved
            </p>
            <span className="text-xs">
              Developed by{" "}
              <a href="mailto:lkbrian.info@gmail.com">lkbrian.info@gmail.com</a>
            </span>
          </div>
        </div>
      </footer>

      <div
        className={`chat--dialog fixed z-[2000] bottom-[120px] right-[40px] max-sm:right-1 h-[500px] w-[350px] rounded-[.3rem] transform ${
          chatOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-1000 z-40 ${
          chatOpen ? "visible" : "hidden"
        }`}
      >
        <Dialog open={chatOpen} onClose={setChatOpen} />
      </div>
      <button onClick={toogleChat} className="floating--button">
        <i className="fa-solid fa-message"></i>
      </button>
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
