import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AnalysisImage from "../assets/Intuitive Analytics picotgram.svg";
import CustomizableImage from "../assets/Customizable Settings pict.svg";
import SeamlessImage from "../assets/Seamless Management picot.svg";
import bgImage from "../assets/B.G.svg";
import surveyHosting from "../assets/Survey Hosting.jpg";
import StatisticalAnalysis from "../assets/Statistical Analysis.jpg";
import Academic from "../assets/Academic.png";
import Research from "../assets/Research Paper Support.jpg";
import languageImage from "../assets/Dual-Language Platform-pictogram.jpg";
import paymentImage from "../assets/Fair Compensation .jpg";
import verifyImage from "../assets/Verified Participants.jpg";
import responseImage from "../assets/One-Time Response Policy.jpg";
import empoweringTextImage from "../assets/brand asset.svg";
import backgroundImage from "../assets/background.svg";
import HeroVideo from "../assets/hero_section_video.mp4";
import wordBg from "../assets/brand asset.svg";
import dollarImage from "../assets/DollarImage.png";
import empoweringBgImage from "../assets/B.G.svg";
import empoweringImage from "../assets/empoweringHome.png";
import "./css/Home.css";
import Container from "../components/Container";
function Home() {
  const { t, i18n } = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  useEffect(() => {
    const updateMaxIndex = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const totalItems = container.children.length;
      const containerWidth = container.offsetWidth;
      const itemsPerView = window.innerWidth >= 1024 ? 2 : 1;
      setMaxIndex(Math.max(totalItems - itemsPerView, 0));
    };
    updateMaxIndex();
    window.addEventListener("resize", updateMaxIndex);
    return () => {
      window.removeEventListener("resize", updateMaxIndex);
    };
  }, []);

  const scrollToService = (index) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const item = container.children[0];
      if (!item) return;

      const gap = parseInt(getComputedStyle(container).gap || 32);
      const itemWidth = item.offsetWidth + gap;

      container.scrollBy({
        left: (index - currentIndex) * itemWidth,
        behavior: "smooth",
      });

      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    scrollToService(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    scrollToService(newIndex);
  };

  return (
    <div className="home-page" style={{ direction }}>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src={HeroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content Overlay */}
        <Container className="h-full" style={{ direction }}>
          <div className="relative z-10 text-white h-full flex flex-col justify-center">
            <div className="max-w-[704px]">
              <p className="text-xl max-w-[800px] mb-8 opacity-95 text-start">
                {t("Welcome to surveyInk")}
              </p>

              <p className="text-[60px] font-semibold mb-6 leading-[72px] text-start text-[#6CAEDB]">
                {t("Connecting Minds, One Survey At A Time")}
              </p>

              <div className="flex gap-4 justify-start">
                <a
                  href="/signup"
                  className="px-5 py-2 w-[138px] h-11 text-base font-semibold rounded-full bg-[#F19303] text-white text-center flex items-center justify-center"
                >
                  {t("Get_Started") || "Get Started"}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <Container>
        <section className="mt-20 bg-white text-center">
          <div className="max-w-[1317px] mx-auto px-4">
            <p className="text-[#F19303] text-[19px] font-normal font-poppins mb-2">
              {t("where data meets innovation.")}
            </p>

            <h2 className="text-[33px] font-semibold font-poppins text-black mb-10 leading-[1.3]">
              {t("A Dashboard Designed for Clarity")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
              <div className="flex flex-col items-center p-6">
                <div className="w-[75px] h-[75px] flex items-center justify-center mb-5">
                  <img
                    src={AnalysisImage}
                    alt="Analytics icon"
                    className="w-[60px] h-[60px]"
                  />
                </div>
                <h3 className="text-[28px] font-semibold text-black mb-3">
                  {t("Intuitive Analytics")}
                </h3>
                <p className="text-[16px] font-normal text-black leading-6">
                  {t("Gain instant insights with charts and reports.")}
                </p>
              </div>

              <div className="flex flex-col items-center p-6">
                <div className="w-[75px] h-[75px] flex items-center justify-center mb-5">
                  <img
                    src={SeamlessImage}
                    alt="Management icon"
                    className="w-[75px] h-[75px]"
                  />
                </div>
                <h3 className="text-[28px] font-semibold text-black mb-3">
                  Seamless Management
                </h3>
                <p className="text-[16px] font-normal text-black leading-6">
                  Effortlessly manage your survey respondents.
                </p>
              </div>

              <div className="flex flex-col items-center p-6">
                <div className="w-[86px] h-[86px] flex items-center justify-center mb-5">
                  <img
                    src={CustomizableImage}
                    alt="Settings icon"
                    className="w-[86px] h-[86px]"
                  />
                </div>
                <h3 className="text-[28px] font-semibold text-black mb-3">
                  Customizable Settings
                </h3>
                <p className="text-[16px] font-normal text-black leading-6">
                  Tailor your dashboard to fit your needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Container>

      {/* Services Section */}
      <section
        style={{
          padding: "4rem 1rem",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          marginTop: "50px",
          position: "relative",
          direction: i18n.language === "ar" ? "rtl" : "ltr",
        }}
      >
        <div
          className="overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        />
        <Container>
          <div
            style={{
              maxWidth: "1485px",
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                style={{
                  background: "#fff",
                  border: "1px solid #eaeaea",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  opacity: currentIndex === 0 ? 0.5 : 1,
                }}
              >
                {i18n.language === "ar" ? "→" : "←"}
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === maxIndex}
                style={{
                  background: "#fff",
                  border: "1px solid #eaeaea",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: currentIndex === maxIndex ? "not-allowed" : "pointer",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  opacity: currentIndex === maxIndex ? 0.5 : 1,
                }}
              >
                {i18n.language === "ar" ? "←" : "→"}
              </button>
            </div>

            {/* Services Carousel */}
            <div
              style={{
                overflow: "hidden",
                position: "relative",
                maxWidth: "1485px",
              }}
            >
              <div
                ref={containerRef}
                style={{
                  display: "flex",
                  gap: "2rem",
                  width: "100%",
                  scrollBehavior: "smooth",
                  height: "396px",
                  overflowX: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {/*first*/}
                <div
                  className="
    flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col
    h-[396px]
    w-full sm:w-full lg:w-1/2
    max-w-[720px]
  "
                >
                  <div className="flex-2 w-full overflow-hidden">
                    <img
                      src={StatisticalAnalysis}
                      alt={t("Statistical Analysis")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className={`p-8 flex-1 ${
                      i18n.language === "ar" ? "text-right" : "text-center"
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-[#1a1a2e]">
                      {t("Statistical Analysis")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(
                        "Expert statistical analysis to help you interpret your data."
                      )}
                    </p>
                  </div>
                </div>

                {/*second */}
                <div
                  className="
    flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col
    h-[396px]
    w-full sm:w-full lg:w-1/2
    max-w-[720px]
  "
                >
                  <div className="flex-2 w-full overflow-hidden">
                    <img
                      src={Academic}
                      alt={t("Academic")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className={`p-8 flex-1 ${
                      i18n.language === "ar" ? "text-right" : "text-center"
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-[#1a1a2e]">
                      {t("Academic Publishing Help")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("Guidance through the academic publishing process.")}
                    </p>
                  </div>
                </div>

                {/*third*/}
                <div
                  className="
    flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col
    h-[396px]
    w-full sm:w-full lg:w-1/2
    max-w-[720px]
  "
                >
                  <div className="flex-2 w-full overflow-hidden">
                    <img
                      src={surveyHosting}
                      alt={t("surveyHosting")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className={`p-8 flex-1 ${
                      i18n.language === "ar" ? "text-right" : "text-center"
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-[#1a1a2e]">
                      {t("Survey Hosting")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("Secure and reliable hosting for your surveys.")}
                    </p>
                  </div>
                </div>

                {/*fourth*/}
                <div
                  className="
    flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col
    h-[396px]
    w-full sm:w-full lg:w-1/2
    max-w-[720px]
  "
                >
                  <div className="flex-2 w-full overflow-hidden">
                    <img
                      src={Research}
                      alt={t("Research")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className={`p-8 flex-1 ${
                      i18n.language === "ar" ? "text-right" : "text-center"
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-[#1a1a2e]">
                      {t("Data Collection")}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t("High-quality data collection methods.")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        style={{
          marginTop: "80px",
          backgroundColor: "#ffffff",
          padding: "40px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1317px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Left Side - Text and Buttons */}
          <div style={{ flex: 1, minWidth: "300px", paddingRight: "20px" }}>
            {/* <div style={{ position: 'relative', display: 'inline-block', paddingLeft: '8px' ,marginTop:'89px'}}></div> */}
            <h2
              style={{
                fontSize: "35px",
                fontFamily: "Poppins",
                fontWeight: "600",
                color: "#395692",
                marginBottom: "20px",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* الحرفين "Su" داخل span بخلفية صورة */}
              <span
                style={{
                  display: "inline-block",
                  position: "relative",
                  width: "70px", // تقدر تعدل حسب حجم الحرف
                  height: "45px",
                  // marginRight: '5px',
                }}
              >
                <img
                  src={wordBg}
                  alt=""
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "50px",
                    height: "40px",
                    zIndex: 1,
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "inline-block",
                    width: "400px",
                    height: "100%",
                    textAlign: "center",
                    lineHeight: "45px",
                    color: "#395692",
                  }}
                >
                  Supported Currencies
                </span>
              </span>
            </h2>
            <span
              style={{ color: "#000", fontWeight: "normal", fontSize: "16px" }}
            >
              We currently support transactions in
              <br />
            </span>
            <span
              style={{
                color: "#F19303",
                fontWeight: "normal",
                fontSize: "18px",
              }}
            >
              Egyptian Pound (EGP) & American Dollars (USD)
            </span>
            <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#FEA319",
                  border: "none",
                  borderRadius: "15px",
                  width: "117px",
                  height: "39px",
                  cursor: "pointer",
                  background:
                    "linear-gradient(0deg, #395692 0%, #395692 100%), #F19303",
                }}
              >
                More
              </button>
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "transparent",
                  color: "#3699DD",
                  border: "1px solid #395692",
                  borderRadius: "15px",
                  cursor: "pointer",
                }}
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
            <img
              src={dollarImage}
              alt="Currency Support"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>
      </section>
      <section
        style={{
          marginTop: "80px",
          backgroundImage: `url(${empoweringBgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          // padding: '40px 0',
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch", // تمتد الصور بالنسبه لطول الcontainer
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Left Side - Text and Curvy Image */}
          <div
            style={{
              flex: 1,
              paddingLeft: "8px",
              marginTop: "70px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <img
              src={empoweringTextImage}
              alt="Curvy Overlay"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "50px",
                height: "40px",
                zIndex: 1,
              }}
            />

            <p
              style={{
                fontSize: "35px",
                fontWeight: "600",
                color: "#23407F",
                lineHeight: "1.2",
                marginBottom: "0.5rem",
                fontFamily: "Poppins",
                position: "relative",
                zIndex: 2,
              }}
            >
              Empowering Research
              <br />
              in The Middle East
            </p>
            <span
              style={{
                maxWidth: "400px",
                display: "block",
                fontSize: "16px",
                color: "#333",
                lineHeight: "1.5",
                fontFamily: "Poppins",
              }}
            >
              Survey Ink empowers Middle East researchers with verified
              participants, expert support, and bilingual tools for faster,
              affordable insights. Freelancers gain flexible, meaningful work by
              contributing to impactful academic, market, and thesis research
              projects.
            </span>
          </div>

          {/* Right Side - Full Height Image with 3D Style */}
          {/* <div style={{
      flex: 1,
      position: 'relative',
      display: 'flex',
      left:'9.6rem',
      // alignItems: 'stretch',
      // justifyContent: 'flex-end',
      width:"956px"
    }}>
      <img 
        src={empoweringImage} 
        alt="Empowering Illustration" 
        style={{
          width: '100%',
          height: '457px',
          objectFit: 'cover',
        }} 
      />
    </div> */}
        </div>
        <div className="join-section">
          <button
            className="join-btn"
            style={{
              backgroundColor: "#F19303",
              color: "#FEFEFF",
              border: "none",
              width: "120px",
              height: "38px",
              // padding: '12px 24px',
              borderRadius: "40px",
              fontWeight: "600",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              marginBottom: "90px",
              marginTop: "10px",
              marginLeft: "165px",
              fontFamily: "Poppins",
              fontStyle: "normal",
              textAlign: "center",
            }}
            onClick={() => navigate("/signup")}
          >
            JOIN US
          </button>
        </div>
      </section>

      {/* <section
  data-aos="fade-up"
  style={{
    width: '1550px',
    // height: 'auto',
    // margin: '0 auto',
    // backgroundColor:'#F4F4F4',
    padding: '3rem 2rem',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
  }}
> */}
      {/* <div
  style={{
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    position: 'relative',
    paddingLeft: '2rem', // مسافة من يسار الصفحة حسب الاتجاه
    textAlign: 'start',
  }}
> */}
      {/* <div style={{ position: 'relative' }}> */}
      {/* Curvy color image overlay */}
      {/* <img
      src={empoweringTextImage}
      alt="Curvy Overlay"
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '50px',
        height: '40px',
        zIndex: 1,
      }}
    /> */}

      {/* Heading text */}
      {/* <h2
      style={{
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#3699DD',
        lineHeight: '1.2',
        marginBottom: '0.5rem',
        position: 'relative',
        zIndex: 2,
        textAlign: 'start',
      }}
    >
      Why Join SurveyInk?
    </h2>
  </div>
</div> */}

      {/* Cards Container */}
      {/* <div
    style={{
      display: 'flex',
      gap: '1.5rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop:'47px'
    }}
  > */}
      {/* Card 1 */}
      {/* <div style={cardJoinStyle}>
      <img src={languageImage} alt="Survey Hosting" style={imageJoinStyle} />
      <h3 style={cardJoinTitleStyle}>Dual-Language Platform</h3>
      <p style={cardJoinTextStyle}>
        Secure and reliable hosting for your surveys, ensuring data integrity and accessibility across the region.
      </p>
    </div> */}

      {/* Card 2 */}
      {/* <div style={cardJoinStyle}>
      <img src={paymentImage} alt="Research Support" style={imageJoinStyle} />
      <h3 style={cardJoinTitleStyle}>Fair Compensation </h3>
      <p style={cardJoinTextStyle}>
        Comprehensive assistance with research paper development, from methodology to final presentation.
      </p>
    </div> */}

      {/* Card 3 */}
      {/* <div style={cardJoinStyle}>
      <img src={verifyImage} alt="Statistical Analysis" style={imageJoinStyle} />
      <h3 style={cardJoinTitleStyle}>Verified Participants</h3>
      <p style={cardJoinTextStyle}>
        Expert statistical analysis to help you interpret your data and draw accurate conclusions.
      </p>
    </div> */}

      {/* Card 4 */}
      {/* <div style={cardJoinStyle}>
      <img src={responseImage} alt="Academic Publishing" style={imageJoinStyle} />
      <h3 style={cardJoinTitleStyle}>One-Time Response Policy</h3>
      <p style={cardJoinTextStyle}>
        Guidance through the academic publishing process, increasing your chances of success.
      </p>
    </div>
  </div>
</section> */}

      {/* <section
  data-aos="fade-up"
  style={{
    width: '100%',
    maxWidth: '1550px',
    height: '448px',
    margin: '0 auto',
    background: '#000',
    padding: '2rem',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }}
>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2
      style={{
        fontSize: '33px',
        fontWeight: '600',
        color: '#395692',
        lineHeight: '1.4',
        maxWidth: '900px',
        marginBottom: '20px',
      }}
    >
      So, what are you waiting for? Get your exclusive services in one hand
    </h2>

    <button
      style={{
        backgroundColor: '#395692',
        color: '#FEFEFF',
        border: 'none',
        width: '120px',
        height: '38px',
        borderRadius: '40px',
        fontWeight: '600',
        fontSize: '16px',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        textAlign: 'center',
      }}
    >
      Get Started
      </button>
      </div>
      </section> */}

      <section
        style={{
          marginTop: "80px",
          backgroundColor: "#ffffff",
          textAlign: "center",
          height: "250px",
        }}
      >
        <div
          style={{
            maxWidth: "1317px",
            marginLeft: "61.5px",
          }}
        >
          <h2
            style={{
              fontSize: "33px",
              fontWeight: "600",
              color: "#395692",
              lineHeight: "1.4",
              maxWidth: "900px",
              marginBottom: "20px",
              marginLeft: "15rem",
              marginTop: "10rem",
            }}
          >
            So, what are you waiting for? Get your exclusive services in one
            hand
          </h2>

          <button
            style={{
              backgroundColor: "#395692",
              color: "#FEFEFF",
              border: "none",
              width: "120px",
              height: "38px",
              borderRadius: "40px",
              fontWeight: "600",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              fontFamily: "Poppins",
              fontStyle: "normal",
              textAlign: "center",
            }}
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

const styles = {
  button: {
    display: "inline-block",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "all 0.3s ease",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
  },
};

const cardJoinStyle = {
  width: "280px",
  // backgroundColor: '#fff',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  // padding: '1rem',
  borderRadius: "12px",
  // boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "307px",
};

const imageJoinStyle = {
  width: "273px",
  height: "160.722px",
  objectFit: "cover",
  borderRadius: "14px 0px 0 14px",
  marginBottom: "10px",
};

const cardJoinTitleStyle = {
  color: "#FEA319",
  fontSize: "18px",
  fontWeight: "700",
  fontStyle: "normal",
  // marginBottom: '0.5rem',
  fontFamily: "Poppins",
  paddingLeft: "13.33px",
  width: "253.948px",
  height: "23.075px",
};

const cardJoinTextStyle = {
  color: "#fff",
  fontSize: "12px",
  lineHeight: "1.5",
  fontFamily: "Poppins",
  paddingLeft: "13.33px",
  width: "247.925px",
};

export default Home;
