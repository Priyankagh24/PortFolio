import { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const SECTIONS = ["Home","About","Skills","Education","Experience","Projects","Certificates","Memories","Contact"];

const SKILLS_LIST = [
  { name: "Data Structures & Algorithms", pct: 88 },
  { name: "Full Stack (React / Node.js)", pct: 85 },
  { name: "Python & Data Engineering", pct: 80 },
  { name: "Java / C / C++", pct: 78 },
  { name: "Cloud (AWS / Azure)", pct: 65 },
  { name: "Machine Learning / AI", pct: 70 },
  { name: "Database (MongoDB / PostgreSQL)", pct: 82 },
  { name: "Docker / CI-CD", pct: 60 },
];

const PROJECTS = [
  { title:"FRA Atlas AI", tech:"React · Tailwind CSS ·FastAPI · React-Leaflet ·TensorFlow · PostgreSQL", desc:"OCR pipeline to digitize scanned FRA claim documents + CNN land-use classifier trained on EuroSAT satellite data.", link:"https://github.com/Priyankagh24/FRA-Atlas-AI", bg:"#1a1a2e", icon:"🛰️" , img:"/projects/FRA.png" },
  { title:"NeuroViz", tech:"Python · FastAPI · React · SciPy · Three.js · MNE", desc:"Full-stack EEG analysis app with 4-step DSP pipeline, 3D brain model with electrode sensors, and FAA computation.", link:"https://neuroviz.vercel.app", bg:"#0f2027", icon:"🧠" , img:"/projects/neuro.png"},
  { title:"Personal Finance Dashboard", tech:"React · Node.js · Express.js ·MongoDB · Tailwind CSS", desc:"Track income, expenses, account balances with interactive charts, JWT auth, and Excel export.", link:"https://personal-finance-dashboard-beta-seven.vercel.app/", bg:"#16213e", icon:"💰" , img:"/projects/finance.png"},
  { title:"Real Time Code Editor", tech:"React · Node.js · Socket.IO · CodeMirror", desc:"Collaborative multi-user code editor with live sync via WebSockets, syntax highlighting, and unique room IDs.", link:"https://real-time-code-editor-4-wov1.onrender.com/", bg:"#1a1a2e", icon:"⚡", img:"/projects/code editor.png" },
  { title:"DataViz AI", tech:"HTML5 · CSS3 · JavaScript · Python · Flask · spaCy · gTTS · Pandas · Matplotlib · Numpy · MoviePy", desc:"Text-to-video and CSV-to-video pipeline generating narrated infographic MP4s from user prompts.", link:"https://github.com/Priyankagh24/CreatorViz-Studios", bg:"#0d1b2a", icon:"🎬" , img:"/projects/dataviz.png"},
  { title:"Uber Data Analytics", tech:"Python · BigQuery · GCP · Looker Studio", desc:"End-to-end data pipeline for 100K+ NYC TLC trip records with geospatial dashboards.", link:"https://github.com/Priyankagh24/Uber-Data-Analytics", bg:"#162032", icon:"🚗", img:"/projects/uber.png" },
];

const CERTS = [
  { title:"AWS Cloud Practitioner Essentials", by:"Amazon Web Services", when:"Jan 2026", accent:"#FF9900" , img:"/certs/aws.jpeg",link:"https://drive.google.com/file/d/1Dzemw3RIZCrJi1G9_pEWvqx_zbxPxBXA/view?usp=drive_link"},
  { title:"Introduction to Data Analytics", by:"IBM / Coursera", when:"2nd Jan 2026", accent:"#1F70C1" ,img:"/certs/data analytics.jpeg" , link:"https://www.coursera.org/account/accomplishments/verify/3122QH3LDEQR?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course"},
  { title:"Graph Theory Programming Camp", by:"AlgoUniversity", when:"2025", accent:"#E53E3E" ,img:"/certs/algo.png" , link:"https://d3uam8jk4sa4y4.cloudfront.net/static/certificates/graph_camp/priyanka-ghosh.png"},
  { title:"Walmart Advanced Software Engineering Simulation", by:"Walmart Global Tech / Forage", when:"13th Mar 2024", accent:"#00BFFF",img:"/certs/walmart.png" ,link:"https://drive.google.com/file/d/1c60AQ_L4R6q822AfyR8l5q88BGrEQfAz/view?usp=drive_link "},
  { title:"LangChain for LLM App Development", by:"Simplilearn SkillUP", when:"23rd Oct 2025", accent:"#805AD5",img:"/certs/langchain.png" ,link:"https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI1MTQ4IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvOTIyMzQ3MF85NDk1NzAwMTc2MTI0ODIxOTc3OC5wbmciLCJ1c2VybmFtZSI6IlByaXlhbmthIEdob3NoIn0%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F8169%2FLangChain-for-LLM-App-Development%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1407423895189755328&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVLyq3NCk1zQz3iEiyrytKTUstKsrMS49PKsovL04tsnXOKMrPTQUANv6Rdz8AAAA%3D"},
  { title:"Android Developer Virtual Internship", by:"Google for Developers / AICTE", when:"Oct–Dec 2024", accent:"#FFD700" ,img:"/certs/aicte.png",link:"https://drive.google.com/file/d/1sCtUAEquVFge7QlqWjFo-frWYyM209nl/view?usp=drive_link"},
  { title:"KIITEE RANK-571 Merit Scholarship", by:"KIIT", when:"Oct–Dec 2023", accent:"#FF4081" ,img:"/certs/KIITEE Merit scholarship.jpeg",link:"https://drive.google.com/file/d/1qlazuCBqPa8jgyK_Tf7euWXmkFTmMO9n/view?usp=drive_link "},
  { title:"Data Analytics Essentials", by:"IBM/Coursera", when:"2nd Jan 2026", accent:"#34A800" ,img:"/certs/credly.png" ,link: "https://www.credly.com/badges/41e7ff14-bbbd-4397-b106-3609babfc201/public_url"},
  { title:"Introduction to Generative AI", by:"Microsoft Build 2026", when:"24th Oct 2025", accent:"#1F70C1" ,img:"/certs/genai.png" ,link: "https://learn.microsoft.com/en-in/users/priyankaghosh-1547/achievements/yp26y3hr"},

];

const EDUCATION = [
  { school:"Kalinga Institute of Industrial Technology (KIIT)", degree:"B.Tech · Computer Science & Engineering", period:"Jul 2023 - Jul 2027", score:"CGPA: 8.56", detail:" Awarded KIITEE Merit Scholarship for securing AIR 571 in the entrance examination. Active member of coding clubs and tech communities on campus." , marksheet:"/marksheets/cgpa.pdf"},
  { school:"Army Public School, Barrackpore", degree:"Class 12 - Physics, Chemistry, Mathematics & Biology", period:"Apr 2021 - May 2022", score:"Percentage: 92.2%", detail:"Proud Army school alumna — disciplined, driven, and always pushing forward." , marksheet:"/marksheets/12th.pdf"},
   {
    school:"Army Public School, Barrackpore",
    degree:"Class 10",
    period:"Apr 2019 - May 2020",
    score:"Percentage: 89%",   // 👉 change to your real percentage
    detail:"Completed Class 10 with strong academic performance.",
    marksheet:"/marksheets/10th.pdf"
  }
];


const HERO_SLIDES = [
  { line1:"Hi! I'm", line2:"Priyanka Ghosh", sub:"Full Stack Developer & Problem Solver" },
  { line1:"I solve", line2:"Hard Problems", sub:"300+ LeetCode · Competitive Programmer" },
  { line1:"KIIT '27", line2:"CSE · CGPA 8.56", sub:"AIR 571 KIITEE · Merit Scholar" },
];


const MEMORIES = [
  { img: "/memories/1.jpeg", caption: "Tech fest street break — coding + ice creams 🍦" },

  { img: "/memories/2.jpeg", caption: "DBMS class chaos before submission 😂" },

  { img: "/memories/4.jpeg", caption: "KIIT Fest Day-1" },

  { img: "/memories/5.jpeg", caption: "Between lectures" },

  { img: "/memories/6.jpeg", caption: "KIIT Fest 2025 — music & madness 🎉" },

  { img: "/memories/7.jpg", caption: "Post-hackathon chill evening on campus" },

  { img: "/memories/8.jpeg", caption: "Welcoming juniors — first impressions matter ✨" },

  { img: "/memories/9.jpeg", caption: "Meeting international delegates — global vibes 🌍" },

  { img: "/memories/12.jpg", caption: "Last day of 4th sem" },

  { img: "/memories/11.jpeg", caption: "Final economics lecture — attendance suddenly 100%" },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("Home");
  const [slide, setSlide] = useState(0);
  const [openEdu, setOpenEdu] = useState(null);
  const [animSkills, setAnimSkills] = useState(false);
  const sectionRefs = useRef({});
  const skillsRef = useRef(null);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 3800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.dataset.sec); });
    }, { threshold: 0.25 });
    Object.values(sectionRefs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!skillsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimSkills(true); }, { threshold: 0.2 });
    obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = sec => {
    sectionRefs.current[sec]?.scrollIntoView({ behavior: "smooth" });
  };

  const secRef = sec => el => { sectionRefs.current[sec] = el; };

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'Poppins', sans-serif", background:"#0f0f0f", color:"#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#111}::-webkit-scrollbar-thumb{background:#DAA520;border-radius:2px}
        .nav-item{width:100%;padding:11px 28px;font-size:11.5px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:#666;cursor:pointer;transition:all .2s;border-left:2px solid transparent;display:block;user-select:none;}
        .nav-item:hover,.nav-item.active{color:#DAA520;border-left-color:#DAA520;background:rgba(218,165,32,0.06);}
        .sec{padding:80px 60px;min-height:100vh;display:flex;flex-direction:column;justify-content:center;}
        .tag{font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#DAA520;margin-bottom:8px;font-weight:600;}
        .h2{font-size:40px;font-weight:800;line-height:1.1;margin-bottom:10px;}
        .h2 span{color:#DAA520;}
        .bar-bg{background:#222;border-radius:2px;height:6px;width:100%;overflow:hidden;}
        .bar-fill{height:100%;background:linear-gradient(90deg,#DAA520,#c8960a);border-radius:2px;transition:width 1.3s cubic-bezier(.4,0,.2,1);}
        .proj-card{background:#161616;border:1px solid #232323;border-radius:12px;overflow:hidden;transition:transform .3s,border-color .3s,box-shadow .3s;}
        .proj-card:hover{transform:translateY(-6px);border-color:rgba(218,165,32,0.4);box-shadow:0 16px 40px rgba(0,0,0,0.4);}
        .cert-card{background:#161616;border-radius:10px;padding:22px 24px;border-left:3px solid;transition:transform .25s,background .2s;}
        .cert-card:hover{transform:translateY(-3px);background:#1c1c1c;}
        .acc-btn{width:100%;text-align:left;background:none;border:none;color:inherit;font-family:inherit;font-size:15px;font-weight:700;cursor:pointer;padding:18px 22px;display:flex;justify-content:space-between;align-items:center;transition:background .2s;}
        .acc-btn:hover{background:rgba(218,165,32,0.04);}
        .ci{width:100%;background:#181818;border:1px solid #2a2a2a;border-radius:8px;padding:13px 16px;color:#fff;font-family:inherit;font-size:13px;outline:none;transition:border .2s;margin-bottom:14px;display:block;}
        .ci:focus{border-color:#DAA520;}
        .btn{background:#DAA520;color:#000;border:none;padding:13px 36px;border-radius:6px;font-family:inherit;font-weight:700;font-size:13px;letter-spacing:1.5px;cursor:pointer;text-transform:uppercase;transition:background .2s;}
        .btn:hover{background:#c8960a;}
        .btn-o{background:transparent;border:1.5px solid #DAA520;color:#DAA520;padding:13px 36px;border-radius:6px;font-family:inherit;font-weight:700;font-size:13px;letter-spacing:1.5px;cursor:pointer;text-transform:uppercase;transition:all .2s;}
        .btn-o:hover{background:#DAA520;color:#000;}
        @keyframes slideUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        .su{animation:slideUp .55s ease both;}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        .cursor{animation:blink 1s step-end infinite;}
      `}</style>

      {/* ════ FIXED LEFT SIDEBAR ════ */}
      <aside style={{ width:240, minWidth:240, height:"100vh", position:"sticky", top:0, background:"#111111", display:"flex", flexDirection:"column", alignItems:"center", padding:"36px 0 24px", borderRight:"1px solid #1e1e1e", overflowY:"auto" }}>
        {/* Avatar circle */}
       {/* ── PROFILE PHOTO SECTION ── */}
{/* ── PROFILE PHOTO SECTION ── */}
<div style={{
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  overflow: "hidden",
  border: "2px solid #DAA520",
  marginBottom: "15px",
  flexShrink: 0   // 👈 IMPORTANT FIX
}}>
  <img 
    src="/my-photo/photo.jpeg"
    alt="Priyanka Ghosh"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }}
  />
</div>
        <p style={{ fontSize:13, fontWeight:700, color:"#fff", marginBottom:2 }}>Priyanka Ghosh</p>
        <p style={{ fontSize:10, color:"#DAA520", letterSpacing:2, textTransform:"uppercase", marginBottom:4 }}>Full Stack Dev</p>
        <p style={{ fontSize:10, color:"#555", marginBottom:28 }}>KIIT '27 · CSE</p>

        {/* Gold divider */}
        <div style={{ width:40, height:1, background:"linear-gradient(90deg,transparent,#DAA520,transparent)", marginBottom:28 }} />

        {/* Nav links */}
        <nav style={{ width:"100%", flex:1 }}>
          {SECTIONS.map(s => (
            <span key={s} className={`nav-item ${activeSection===s?"active":""}`} onClick={() => scrollTo(s)}>{s}</span>
          ))}
        </nav>

       {/* Social icons */}
<div style={{ marginTop: 'auto', display: "flex", gap: 12, paddingTop:40, paddingBottom: 20 , justifyContent:"center",marginBottom: '5px'}}>
  {[
    { id: 'gh', icon: <FaGithub />, url: "https://github.com/Priyankagh24" },
    { id: 'li', icon: <FaLinkedinIn />, url: "https://linkedin.com/in/priyankaghosh07" },
    { id: 'lc', icon: <SiLeetcode />, url: "https://leetcode.com/u/ghosh_priyanka/" }
  ].map((social) => (
    <a 
      key={social.id} 
      href={social.url} 
      target="_blank" 
      rel="noreferrer" 
      style={{ 
        width: 38, 
        height: 38, 
        borderRadius: '50%', // Circular icons look cleaner
        background: "#1a1a1a", 
        border: "1px solid #2a2a2a", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        fontSize: 18, 
        color: "#DAA520", 
        textDecoration: "none", 
        transition: "all 0.3s ease" 
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#DAA520";
        e.currentTarget.style.background = "rgba(218, 165, 32, 0.1)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#2a2a2a";
        e.currentTarget.style.background = "#1a1a1a";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {social.icon}
    </a>
  ))}
</div>

        <p style={{ fontSize:9, color:"#333", marginTop:16, letterSpacing:1 }}>© 2025 PRIYANKA GHOSH</p>
      </aside>

      {selectedCert && (
  <div
    onClick={() => setSelectedCert(null)}
    style={{
      position:"fixed",
      top:0,
      left:0,
      width:"100vw",
      height:"100vh",
      background:"rgba(0,0,0,0.9)",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      zIndex:9999,
      cursor:"zoom-out"
    }}
  >
    <img
      src={selectedCert}
      alt="certificate"
      style={{
        maxWidth:"90%",
        maxHeight:"90%",
        borderRadius:10,
        boxShadow:"0 0 40px rgba(0,0,0,0.8)"
      }}
    />
  </div>
)}

      {/* ════ MAIN ════ */}
      <main style={{ flex:1, overflowY:"auto" }}>

        {/* ── HOME ── */}
        <section data-sec="Home" ref={secRef("Home")} style={{ minHeight:"100vh", position:"relative", display:"flex", alignItems:"center", padding:"0 60px", background:"#0a0a0a", overflow:"hidden" }}>
          <div style={{ position:"absolute", right:"8%", top:"20%", width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle, rgba(218,165,32,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(218,165,32,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(218,165,32,0.025) 1px,transparent 1px)", backgroundSize:"55px 55px", pointerEvents:"none" }} />

          <div style={{ position:"relative", zIndex:1, maxWidth:720 }}>
            {/* Slide dots */}
            <div style={{ display:"flex", gap:8, marginBottom:48 }}>
              {HERO_SLIDES.map((_,i) => (
                <div key={i} onClick={() => setSlide(i)} style={{ width:i===slide?28:8, height:3, borderRadius:2, background:i===slide?"#DAA520":"#333", cursor:"pointer", transition:"width .4s" }} />
              ))}
            </div>

            <div key={slide} className="su">
              <p style={{ fontSize:12, letterSpacing:5, color:"#DAA520", textTransform:"uppercase", marginBottom:20, fontWeight:500 }}>
                Portfolio · 2025
              </p>
              <h1 style={{ fontSize:"clamp(44px,6vw,82px)", fontWeight:800, lineHeight:1.05, marginBottom:18 }}>
                {HERO_SLIDES[slide].line1}<br />
                <span style={{ color:"#DAA520" }}>{HERO_SLIDES[slide].line2}</span>
                <span className="cursor" style={{ color:"#DAA520" }}>_</span>
              </h1>
              <p style={{ fontSize:17, color:"#777", marginBottom:44, fontWeight:300, letterSpacing:.5 }}>
                {HERO_SLIDES[slide].sub}
              </p>
            </div>

            <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              <button className="btn" onClick={() => scrollTo("Projects")}>View Projects</button>
              <button className="btn-o" onClick={() => scrollTo("Contact")}>Hire Me</button>
            </div>

            {/* Stats */}
            <div style={{ display:"flex", gap:48, marginTop:64, paddingTop:40, borderTop:"1px solid #1a1a1a" }}>
              {[["8.56","CGPA at KIIT"],["300+","LeetCode Solved"],["20+","Projects Built"],["6+","Certifications"]].map(([v,l]) => (
                <div key={l}>
                  <p style={{ fontSize:30, fontWeight:800, color:"#DAA520", lineHeight:1 }}>{v}</p>
                  <p style={{ fontSize:11, color:"#555", marginTop:5, letterSpacing:.5 }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section data-sec="About" ref={secRef("About")} className="sec" style={{ background:"#0d0d0d" }}>
          <p className="tag">Who am I?</p>
          <h2 className="h2">About <span>Me</span></h2>
          <div style={{ width:50, height:2, background:"#DAA520", marginBottom:40 }} />
          <div style={{ display:"grid", gridTemplateColumns:"1.1fr 0.9fr", gap:60, alignItems:"start" }}>
            <div>
              <p style={{ color:"#bbb", lineHeight:2, fontSize:14.5, marginBottom:16 }}>
                Hi! I'm <strong style={{color:"#DAA520"}}>Priyanka Ghosh</strong>, a B.Tech Computer Science student at KIIT University, Bhubaneswar, with a CGPA of <strong style={{color:"#fff"}}>8.56</strong>. I love building full-stack web applications, data pipelines, and AI-powered tools.
              </p>
              <p style={{ color:"#bbb", lineHeight:2, fontSize:14.5, marginBottom:16 }}>
                I interned at <strong style={{color:"#fff"}}>HackerEarth</strong> as a Technical Problem Setter, crafting algorithmic challenges across 37+ programming languages for global hackathons and coding assessments.
              </p>
              <p style={{ color:"#bbb", lineHeight:2, fontSize:14.5, marginBottom:36 }}>
                Ranked <strong style={{color:"#fff"}}>1st out of 100+</strong> in KodeWreck · Secured <strong style={{color:"#fff"}}>AIR 571</strong> in KIITEE 2023 · Organized Game of Codes 2.0. I'm an Army Public School alumna — disciplined, driven, and always growing.
              </p>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                {["React.js","Node.js","Python","Java","MongoDB","PostgreSQL","AWS","Docker"].map(t => (
                  <span key={t} style={{ background:"rgba(218,165,32,0.08)", border:"1px solid rgba(218,165,32,0.2)", color:"#DAA520", borderRadius:4, padding:"4px 12px", fontSize:11.5, fontWeight:600 }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {[["Name","Priyanka Ghosh"],["University","KIIT, Bhubaneswar"],["Degree","B.Tech CSE (2023–2027)"],["CGPA","8.56"],["Internship","HackerEarth — Problem Setter"],["Email","pghosh7504@gmail.com"],["Location","Kolkata, West Bengal"]].map(([l,v]) => (
                <div key={l} style={{ display:"flex", gap:16, padding:"11px 0", borderBottom:"1px solid #1a1a1a" }}>
                  <span style={{ color:"#DAA520", fontSize:12, fontWeight:700, minWidth:96 }}>{l}:</span>
                  <span style={{ color:"#ccc", fontSize:13 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section data-sec="Skills" ref={el => { secRef("Skills")(el); skillsRef.current = el; }} className="sec" style={{ background:"#0a0a0a" }}>
          <p className="tag">What I work with</p>
          <h2 className="h2">My <span>Skills</span></h2>
          <div style={{ width:50, height:2, background:"#DAA520", marginBottom:40 }} />
          <p style={{ color:"#666", fontSize:13, marginBottom:40, lineHeight:1.8 }}>
            I'm a fast learner and love picking up new technologies. Here's a snapshot of my current skill set:
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px 64px", marginBottom:48 }}>
            {SKILLS_LIST.map(({ name, pct }) => (
              <div key={name}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontSize:12.5, fontWeight:500, color:"#ccc" }}>{name}</span>
                  <span style={{ fontSize:11, color:"#DAA520", fontWeight:600 }}>{pct}%</span>
                </div>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: animSkills ? `${pct}%` : "0%" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
            {[
              { label:"Frontend", items:["React.js (TypeScript)","Next.js","TailwindCSS","Three.js"] },
              { label:"Backend", items:["Node.js / Express","FastAPI / Flask","REST API Design","WebSockets"] },
              { label:"Database", items:["MongoDB","PostgreSQL","BigQuery","Redis"] },
              { label:"DevOps / Cloud", items:["Docker","GitHub Actions","AWS Basics","Azure Basics"] },
            ].map(({ label, items }) => (
              <div key={label} style={{ background:"#161616", border:"1px solid #222", borderRadius:10, padding:18 }}>
                <p style={{ color:"#DAA520", fontSize:11, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", marginBottom:12, paddingBottom:8, borderBottom:"1px solid #2a2a2a" }}>{label}</p>
                {items.map(it => <p key={it} style={{ color:"#888", fontSize:12.5, marginBottom:7 }}>▸ {it}</p>)}
              </div>
            ))}
          </div>
        </section>

      {/* ── EDUCATION ── */}
<section data-sec="Education" ref={secRef("Education")} className="sec" style={{ background: "#0d0d0d" }}>
  <p className="tag">Academic Journey</p>
  <h2 className="h2">My <span>Education</span></h2>
  <div style={{ width: 50, height: 2, background: "#DAA520", marginBottom: 40 }} />

  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
    {EDUCATION.map((edu, i) => (
  <div key={i} style={{ 
    background: "#161616", 
    border: "1px solid #222", 
    borderRadius: 12, 
    overflow: "hidden",
    marginBottom: 12 
  }}>
    <button 
      className="acc-btn" 
      onClick={() => setOpenEdu(openEdu === i ? null : i)}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "20px",
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <div style={{ flex: 1 }}>
        <p style={{ color: "#DAA520", fontSize: 10, letterSpacing: 2, marginBottom: 6, fontWeight: 600, textTransform: "uppercase" }}>
          {edu.period}
        </p>
        <p style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
          {edu.school}
        </p>
        
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 15
        }}>
          <p style={{ fontSize: 13, color: "#aaa", margin: 0, fontWeight: 400 }}>
            {edu.degree}
          </p>

          {/* RIGHT SIDE: SCORE + BUTTON */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Score Badge */}
            <div style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#DAA520",
              background: "rgba(218, 165, 32, 0.1)",
              border: "1px solid rgba(218, 165, 32, 0.3)",
              padding: "4px 12px",
              borderRadius: "20px",
              whiteSpace: "nowrap"
            }}>
              {edu.score}
            </div>

            {/* View Report Link */}
            <a 
              href={edu.marksheet} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // Prevents the accordion from closing when clicking the button
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#fff",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "1px",
                padding: "5px 12px",
                borderRadius: "20px",
                border: "1px solid #333",
                background: "#222",
                transition: "0.3s all"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#DAA520";
                e.currentTarget.style.color = "#DAA520";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#333";
                e.currentTarget.style.color = "#fff";
              }}
            >
              View Report
            </a>
          </div>
        </div>
      </div>
      
      <span style={{ color: "#DAA520", fontSize: 20, marginLeft: 20, opacity: 0.7 }}>
        {openEdu === i ? "−" : "+"}
      </span>
    </button>

    {openEdu === i && (
      <div style={{ padding: "0 20px 20px 20px", color: "#999", fontSize: 13.5, lineHeight: 1.8, borderTop: "1px solid #222" }}>
        <p style={{ marginTop: 15 }}>{edu.detail}</p>
      </div>
    )}
  </div>
))}
  </div>

  <p style={{ fontSize: 10, letterSpacing: 3, color: "#DAA520", textTransform: "uppercase", fontWeight: 700, marginBottom: 20 }}>
    Achievements
  </p>
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
    {[
      "🥉 3rd position — Ideaforge2k24, NSS KIIT",
      "🎓 KIITEE Merit Scholarship — AIR 571 (2023)",
      "🏅 Rank 1 / 100+ in KodeWreck recruitment contest",
      "📣 Organized Game of Codes 2.0 — 200% more participants",
      "⚡ 300+ LeetCode problems solved",
      "🏆 Winner — Ignithon (Intermediate Category), K-1000",
      "💡 20+ projects built across web, data, and AI domains",
      "🥈 Rank 2 / 200+ — Encode 3.0 · Won ₹2500",


    ].map((a, i) => (
      <div key={i} style={{ 
        background: "rgba(218,165,32,0.04)", 
        border: "1px solid rgba(218,165,32,0.12)", 
        borderRadius: 8, 
        padding: "12px 16px", 
        fontSize: 13, 
        color: "#ccc", 
        lineHeight: 1.6 
      }}>
        {a}
      </div>
    ))}
  </div>
</section>

        {/* ── EXPERIENCE ── */}
        <section data-sec="Experience" ref={secRef("Experience")} className="sec" style={{ background:"#0a0a0a" }}>
          <p className="tag">Work History</p>
          <h2 className="h2">My <span>Experience</span></h2>
          <div style={{ width:50, height:2, background:"#DAA520", marginBottom:48 }} />

          <div style={{ position:"relative", paddingLeft:36 }}>
            <div style={{ position:"absolute", left:0, top:6, bottom:0, width:2, background:"linear-gradient(#DAA520 60%, transparent)" }} />
            <div style={{ position:"relative" }}>
              <div style={{ position:"absolute", left:-42, top:4, width:14, height:14, borderRadius:"50%", background:"#DAA520", border:"3px solid #0a0a0a", boxShadow:"0 0 0 2px #DAA520" }} />
              <p style={{ color:"#DAA520", fontSize:10, letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>May 2025 – July 2025 · Remote</p>
              <h3 style={{ fontSize:22, fontWeight:800, marginBottom:4 }}>Technical Problem Setter Intern</h3>
              <p style={{ color:"#888", fontSize:14, fontWeight:500, marginBottom:20 }}>HackerEarth</p>
              <div style={{ background:"#161616", border:"1px solid #222", borderRadius:10, padding:24, display:"flex", flexDirection:"column", gap:14 }}>
                {["Designed and validated 5+ algorithmic and mathematical problems for hackathons and assessments, ensuring optimal constraints and edge-case coverage.",
                  "Reviewed peer submissions and maintained language-specific code stubs across 37+ languages, improving problem clarity and correctness."].map((b,i) => (
                  <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                    <span style={{ color:"#DAA520", marginTop:2, flexShrink:0 }}>▸</span>
                    <p style={{ color:"#aaa", fontSize:14, lineHeight:1.8 }}>{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section data-sec="Projects" ref={secRef("Projects")} className="sec" style={{ background:"#0d0d0d" }}>
          <p className="tag">What I've built</p>
          <h2 className="h2">My <span>Projects</span></h2>
          <div style={{ width:50, height:2, background:"#DAA520", marginBottom:40 }} />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:22 }}>
            {PROJECTS.map((p, i) => (
              <div key={i} className="proj-card">
               <div style={{
  height:150,
  background:"#000",
  position:"relative",
  overflow:"hidden"
}}>
  <img
    src={p.img}
    alt={p.title}
    style={{
      width:"100%",
      height:"100%",
      objectFit:"cover"
    }}
  />

  {/* dark overlay (same effect you had) */}
  <div style={{
    position:"absolute",
    inset:0,
    background:"linear-gradient(transparent 40%, rgba(0,0,0,0.6))"
  }} />
</div>
                <div style={{ padding:22 }}>
                  <h3 style={{ fontSize:15.5, fontWeight:700, marginBottom:6, color:"#fff" }}>{p.title}</h3>
                  <p style={{ fontSize:10.5, color:"#DAA520", marginBottom:12, fontWeight:600, letterSpacing:.5 }}>{p.tech}</p>
                  <p style={{ fontSize:12.5, color:"#777", lineHeight:1.75, marginBottom:18 }}>{p.desc}</p>
                  {p.link !== "#" && (
                    <a href={p.link} target="_blank" rel="noreferrer" style={{ color:"#DAA520", fontSize:11, fontWeight:700, textDecoration:"none", letterSpacing:1.5, textTransform:"uppercase", borderBottom:"1px solid #DAA52066", paddingBottom:2 }}>View Project ↗</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

    {/* ── CERTIFICATES ── */}
<section data-sec="Certificates" ref={secRef("Certificates")} className="sec" style={{ background: "#0a0a0a" }}>
  <p className="tag">Credentials & Courses</p>
  <h2 className="h2">My <span>Certificates</span></h2>
  <div style={{ width: 50, height: 2, background: "#DAA520", marginBottom: 40 }} />
  
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 16 }}>
    {CERTS.map((c, i) => (
      <div key={i} className="cert-card" style={{ 
        borderLeftColor: c.accent,
        display: "flex",
        flexDirection: "column",
        background: "#111",
        padding: "20px",
        borderRadius: "0 12px 12px 0",
        minHeight: "340px" // Keeps all cards uniform
      }}>

        {/* IMAGE BOX */}
        <div style={{
          width: "100%",
          height: 140,
          marginBottom: 14,
          borderRadius: 8,
          overflow: "hidden",
          background: "#111"
        }}>
          <img 
            src={c.img} 
            alt={c.title}
            onClick={() => setSelectedCert(c.img)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "pointer"
            }}
          />
        </div>

        {/* TEXT SECTION */}
        <div style={{ flex: 1 }}> {/* flex: 1 pushes the button to the bottom */}
          <p style={{ fontSize: 11, color: c.accent, fontWeight: 700, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>
            {c.when}
          </p>

          <h3 style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 7, color: "#fff" }}>
            {c.title}
          </h3>

          <p style={{ fontSize: 12, color: "#666", marginBottom: 20 }}>
            {c.by}
          </p>
        </div>

        {/* CREDENTIAL BUTTON - Now inside the parent div */}
        <a 
          href={c.link} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 16px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: "700",
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: c.accent,
            border: `1px solid ${c.accent}44`,
            background: "transparent",
            transition: "all 0.3s ease",
            marginTop: "auto" // Ensures it stays at the bottom
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = c.accent;
            e.currentTarget.style.color = "#000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = c.accent;
          }}
        >
          View Credential 
          <span style={{ marginLeft: "8px" }}>↗</span>
        </a>

      </div> // This properly closes the cert-card
    ))}
  </div>
</section>




{/* ── COLLEGE MEMORIES ── */}
<section data-sec="Memories" ref={secRef("Memories")} className="sec" style={{ background: "#0a0a0a" }}>
  <p className="tag">Beyond the Code</p>
  <h2 className="h2">College <span>Memories</span></h2>
  <div style={{ width: 50, height: 2, background: "#DAA520", marginBottom: 40 }} />

  <div style={{ 
    columns: "3 250px", // Creates a Pinterest-style memory layout
    columnGap: "16px" 
  }}>
    {MEMORIES.map((m, i) => (
      <div 
        key={i} 
        style={{ 
          breakInside: "avoid", 
          marginBottom: "16px", 
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
          group: "hover",
          cursor: "pointer",
          border: "1px solid #222"
        }}
      >
        <img 
          src={m.img} 
          alt={m.caption}
          style={{ 
            width: "100%", 
            display: "block", 
            transition: "transform 0.5s ease" 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.nextSibling.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.nextSibling.style.opacity = "0";
          }}
          onClick={() => setSelectedCert(m.img)} // Reusing your existing modal logic
        />
        
        {/* Overlay Caption */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
          color: "#fff",
          padding: "20px 15px 10px",
          fontSize: "12px",
          fontWeight: "500",
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
          textAlign: "center"
        }}>
          {m.caption}
        </div>
      </div>
    ))}
  </div>
</section>

        {/* ── CONTACT ── */}
        <section data-sec="Contact" ref={secRef("Contact")} className="sec" style={{ background:"#0d0d0d" }}>
          <p className="tag">Get in touch</p>
          <h2 className="h2">Contact <span>Me</span></h2>
          <div style={{ width:50, height:2, background:"#DAA520", marginBottom:40 }} />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"start" }}>
            <div>
              <p style={{ color:"#888", lineHeight:2, fontSize:14, marginBottom:32 }}>
                I'm open to internship opportunities, project collaborations, and full-time roles. Drop me a message and I'll get back to you as soon as possible!
              </p>
             {[
  ["📧 Email", "pghosh7504@gmail.com", `mailto:pghosh7504@gmail.com`],
  ["📞 Phone", "+91 86172 02951", "tel:+918617202951"],
  ["📍 Location", "Kolkata, West Bengal, India", null],
  ["💻 GitHub", "github.com/Priyankagh24", "https://github.com/Priyankagh24"],
  ["🔗 LinkedIn", "linkedin.com/in/priyankaghosh07", "https://linkedin.com/in/priyankaghosh07"],
   ["📸 Instagram", "instagram.com/priyankaa_764", "https://www.instagram.com/priyankaa_764?igsh=MXFpdjVhb29wOGNycA=="] //
].map(([label, value, url]) => (
  <div key={label} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: "1px solid #1a1a1a" }}>
    <span style={{ fontSize: 12, fontWeight: 600, color: "#DAA520", minWidth: 100 }}>{label}</span>
    
    {url ? (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ 
          fontSize: 13, 
          color: "#DAA520", 
          textDecoration: "none", // Standard React way
          transition: "all 0.3s ease",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          fontWeight: "500",
          // Adding these to kill any hidden underlines:
          borderBottom: "none", 
          outline: "none"
        }}
        // Using a tiny bit of JS to force no underline on the DOM element directly
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.textDecoration = "none";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#DAA520";
          e.currentTarget.style.textDecoration = "none";
        }}
      >
        {value}
        <span style={{ marginLeft: "6px", fontSize: "10px", opacity: 0.6 }}>↗</span>
      </a>
    ) : (
      <span style={{ fontSize: 13, color: "#ccc" }}>{value}</span>
    )}
  </div>
))}
            </div>
            <form onSubmit={e => e.preventDefault()}>
              <input className="ci" type="text" placeholder="Your Name" />
              <input className="ci" type="email" placeholder="Your Email" />
              <input className="ci" type="text" placeholder="Subject" />
              <textarea className="ci" rows={5} placeholder="Your Message..." style={{ resize:"vertical" }} />
              <button type="submit" className="btn">Send Message</button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <div style={{ textAlign:"center", padding:"24px", background:"#080808", borderTop:"1px solid #1a1a1a" }}>
          <p style={{ color:"#333", fontSize:11, letterSpacing:1 }}>© 2025 PRIYANKA GHOSH · BUILT WITH REACT · DESIGNED WITH LOVE</p>
        </div>

      </main>
    </div>
  );
}
