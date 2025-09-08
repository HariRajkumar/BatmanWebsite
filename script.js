// var batsignal = document.querySelector(".batsignal");

// gsap.to(batsignal, {
//     y: -200,   // Move upwards (adjust to reach the "sky")
//     x: 500,
//     scaleY: 0.2, // Shrink the logo
//     scaleX: 0.3,
//     duration: 2,
//     ease: "power2.inOut",
//     rotateY: 70,
//     rotateX: 15
// });

// const spotlight = document.querySelector(".spotlight");
// const batlogo = document.querySelector(".batsignal");

// // Add glow effect
// batlogo.classList.add("glow");

// // Source point (adjust manually)
// let sourceX = 1100;  
// let sourceY = window.innerHeight - 390;

// function updateSpotlight() {
//     const rect = batlogo.getBoundingClientRect();

//     // Vertex positions
//     const v1x = sourceX;
//     const v1y = sourceY;

//     const v2x = rect.left + rect.width / 2;
//     const v2y = rect.top;

//     const v3x = rect.left + rect.width / 2;
//     const v3y = rect.bottom;

//     // Convert positions to percentages relative to viewport for clip-path
//     const vw = window.innerWidth;
//     const vh = window.innerHeight;

//     const p1 = `${(v1x/vw)*100}% ${(v1y/vh)*100}%`;
//     const p2 = `${(v2x/vw)*100}% ${(v2y/vh)*100}%`;
//     const p3 = `${(v3x/vw)*100}% ${(v3y/vh)*100}%`;

//     spotlight.style.clipPath = `polygon(${p1}, ${p2}, ${p3})`;

//     requestAnimationFrame(updateSpotlight);
// }

// updateSpotlight(); 

// var batsignal = document.querySelector(".batsignal");

// gsap.to(batsignal, {
//     y: -200,
//     x: 500,
//     scaleY: 0.2,
//     scaleX: 0.3,
//     duration: 2,
//     ease: "power2.inOut",
//     rotateY: 70,
//     rotateX: 15,
//     onComplete: lockBeamPosition   // ✅ Run function after animation ends
// });

var batsignal = document.querySelector(".batsignal");

gsap.to(batsignal, {
    y: -200,
    x: 500,
    scaleY: 0.2,
    scaleX: 0.3,
    duration: 2,
    ease: "power2.inOut",
    rotateY: 70,
    rotateX: 15,
    onStart: () => {
        document.body.style.overflow = "hidden"; // 🔒 Lock scrolling
    },
    onComplete: () => {
        lockBeamPosition();
        document.body.style.overflow = "auto";   // 🔓 Unlock scrolling

        // ✨ Show the welcome text
        const msg = document.getElementById("gothamMessage");
        msg.classList.add("show"); 
    }
});


const spotlight = document.querySelector(".spotlight");
const batlogo = document.querySelector(".batsignal");

// Add glow effect
batlogo.classList.add("glow");

// Source point (fixed spotlight origin)
let sourceX = 1100;  
let sourceY = window.innerHeight - 390;

// Store locked spotlight vertices
let lockedClipPath = null;

function getLogoPosition() {
    const rect = batlogo.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    return {
        centerX: rect.left + scrollLeft + rect.width / 2,
        topY: rect.top + scrollTop,
        bottomY: rect.bottom + scrollTop
    };
}

function updateSpotlight() {
    if (lockedClipPath) {
        spotlight.style.clipPath = lockedClipPath;
        return;
    }

    const { centerX, topY, bottomY } = getLogoPosition();

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const p1 = `${(sourceX/vw)*100}% ${(sourceY/vh)*100}%`;
    const p2 = `${(centerX/vw)*100}% ${(topY/vh)*100}%`;
    const p3 = `${(centerX/vw)*100}% ${(bottomY/vh)*100}%`;

    spotlight.style.clipPath = `polygon(${p1}, ${p2}, ${p3})`;

    requestAnimationFrame(updateSpotlight);
}

function lockBeamPosition() {
    const { centerX, topY, bottomY } = getLogoPosition();

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const p1 = `${(sourceX/vw)*100}% ${(sourceY/vh)*100}%`;
    const p2 = `${(centerX/vw)*100}% ${(topY/vh)*100}%`;
    const p3 = `${(centerX/vw)*100}% ${(bottomY/vh)*100}%`;

    lockedClipPath = `polygon(${p1}, ${p2}, ${p3})`;
}

updateSpotlight(); 

function batJumpscare() {
  const container = document.querySelector("#batContainer");
  if (!container) return;

  const numBats = 15;
  const containerRect = container.getBoundingClientRect();
  const vw = containerRect.width;
  const vh = containerRect.height;

  for (let i = 0; i < numBats; i++) {
    const bat = document.createElement("div");
    bat.classList.add("bat");

    // Start near the bottom of sec1
    bat.style.left = Math.random() * vw + "px";
    bat.style.top = vh + 50 + "px";

    container.appendChild(bat);

    gsap.timeline()
      .to(bat, {
        duration: 0.2,
        opacity: 1
      })
      .to(bat, {
        duration: 1.7 + Math.random() * 0.6,
        x: (Math.random() - 0.5) * 400,
        y: -vh - 100,
        rotation: Math.random() * 360,
        ease: "power2.out"
      })
      .to(bat, {
        duration: 0.8,
        opacity: 0,
        ease: "power1.in",
        onComplete: () => bat.remove()
      });
  }
}

const sec1 = document.querySelector(".sec1"); // if it's a class

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             // 🦇 Trigger bats ONCE
//             batJumpscare();
//             observer.unobserve(sec1);
//         }
//     });
// }, {
//     root: null,
//     threshold: 0.5 // halfway through sec1
// });

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: "#sec1",        // the section that triggers
  start: "top 50%",        // when sec1 is halfway visible
  once: true,              // only trigger once
  onEnter: () => batJumpscare()
});

observer.observe(sec1);




