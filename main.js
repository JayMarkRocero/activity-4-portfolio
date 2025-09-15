document.addEventListener("DOMContentLoaded", () => {
  // ===================== Navbar active link & smooth scroll =====================
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  function changeActiveLink() {
    let index = sections.length;
    while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
    navLinks.forEach((link) => link.classList.remove("active"));
    if(navLinks[index]) navLinks[index].classList.add("active");
  }

  changeActiveLink();
  window.addEventListener("scroll", changeActiveLink);

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if(target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ===================== Typing effect =====================
  const typedTextSpan = document.querySelector(".typing-text span");
  const textArray = ["BSIT Student", "Gamer", "Otaku", "Coder", "Human"];
  let textArrayIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    if(!typedTextSpan) return;
    const currentText = textArray[textArrayIndex];

    if (!isDeleting && charIndex < currentText.length) {
      typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(type, 120);
    } else if (isDeleting && charIndex > 0) {
      typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, 80);
    } else {
      if (!isDeleting) {
        isDeleting = true;
        setTimeout(type, 1200);
      } else {
        isDeleting = false;
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(type, 300);
      }
    }
  }
  type();

  // ===================== Video play buttons =====================
  document.querySelectorAll(".video-container").forEach(container => {
    const video = container.querySelector(".custom-video");
    const playBtn = container.querySelector(".play-btn");

    if(!video || !playBtn) return;

    playBtn.addEventListener("click", () => {
      video.paused ? video.play() : video.pause();
      playBtn.style.display = video.paused ? "block" : "none";
    });

    video.addEventListener("click", () => {
      video.paused ? video.play() : video.pause();
      playBtn.style.display = video.paused ? "block" : "none";
    });

    video.addEventListener("ended", () => {
      playBtn.style.display = "block";
    });
  });

  // ===================== Contact Form =====================
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  if(contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if(successMessage) successMessage.style.display = "block";
      contactForm.reset();
      setTimeout(() => { if(successMessage) successMessage.style.display = "none"; }, 3000);
    });
  }
// ===================== Chibi Music Player =====================
const chibi = document.getElementById('chibi-helper');
const musicList = document.getElementById('music-list');
const audioPlayer = document.getElementById('audio-player');
const pauseBtn = document.getElementById('pause-btn');
const resumeBtn = document.getElementById('resume-btn');
const musicItems = document.querySelectorAll('#music-list li');

let isDragging = false, offsetX, offsetY;

// ===== Toggle music list =====
if(chibi && musicList){
  chibi.addEventListener('click', (e) => {
    e.stopPropagation();
    musicList.style.display = musicList.style.display === 'block' ? 'none' : 'block';
  });
}

// ===== Dragging (desktop) =====
if(chibi){
  chibi.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - chibi.getBoundingClientRect().left;
    offsetY = e.clientY - chibi.getBoundingClientRect().top;
    chibi.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', e => {
    if(!isDragging) return;
    chibi.style.left = e.clientX - offsetX + 'px';
    chibi.style.top = e.clientY - offsetY + 'px';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    chibi.style.cursor = 'grab';
  });

  // Mobile drag
  chibi.addEventListener('touchstart', e => {
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.clientX - chibi.getBoundingClientRect().left;
    offsetY = touch.clientY - chibi.getBoundingClientRect().top;
  });

  document.addEventListener('touchmove', e => {
    if(!isDragging) return;
    const touch = e.touches[0];
    chibi.style.left = touch.clientX - offsetX + 'px';
    chibi.style.top = touch.clientY - offsetY + 'px';
  }, { passive:false });

  document.addEventListener('touchend', () => { isDragging = false; });

  // Double-click stop
  chibi.addEventListener('dblclick', () => {
    if(audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }
  });
}

// ===================== Easter Egg: Secret Lock =====================
let chibiClickCount = 0;
const easterAudio = document.getElementById("easter-egg-audio");

if (chibi) {
  chibi.addEventListener("click", () => {
    chibiClickCount++;

    if (chibiClickCount === 10) {
      if (easterAudio) {
        easterAudio.currentTime = 0;
        easterAudio.play();
      }

      // Neon lock message
      const lockScreen = document.createElement("div");
      lockScreen.innerHTML = `
        <h1 style="font-size:3rem; text-align:center; color:#ff4ff8; text-shadow:0 0 15px #ff00ff,0 0 30px #00f7ff;">
          🔒 You triggered the Easter Egg 😏
        </h1>
        <p style="text-align:center; font-size:1.5rem; color:white;">No escape... enjoy the sound 🎶</p>
      `;
      lockScreen.style.position = "fixed";
      lockScreen.style.top = "0";
      lockScreen.style.left = "0";
      lockScreen.style.width = "100%";
      lockScreen.style.height = "100%";
      lockScreen.style.background = "rgba(0,0,0,0.95)";
      lockScreen.style.zIndex = "999999";
      lockScreen.style.display = "flex";
      lockScreen.style.flexDirection = "column";
      lockScreen.style.justifyContent = "center";
      lockScreen.style.alignItems = "center";
      document.body.appendChild(lockScreen);

      // Function to prevent key presses
      function preventKeys(e) {
        e.preventDefault();
        e.stopPropagation();
      }

      // Disable back button
      history.pushState(null, "", location.href);
      window.onpopstate = () => {
        history.pushState(null, "", location.href);
      };

      // Disable keys (ESC, F12, CTRL+W etc.)
      document.addEventListener("keydown", preventKeys, true);

      // Disable right-click
      const preventRightClick = (e) => e.preventDefault();
      document.addEventListener("contextmenu", preventRightClick);

      // Auto-remove lock screen after 10 seconds
      setTimeout(() => {
        lockScreen.remove();
        window.onpopstate = null;
        document.removeEventListener("keydown", preventKeys, true);
        document.removeEventListener("contextmenu", preventRightClick);
      }, 60000); // 60000ms = 60 seconds
    }
  });
}

// ===== Click on song to play =====
musicItems.forEach(item => {
  item.addEventListener('click', () => {
    const song = item.getAttribute('data-src');
    if(!song) return;

    // Set audio source and play
    audioPlayer.src = song;
    audioPlayer.play();

    // Highlight current song (using class)
    musicItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// ===== Pause / Resume buttons =====
if(pauseBtn) pauseBtn.addEventListener('click', () => { if(audioPlayer) audioPlayer.pause(); });
if(resumeBtn) resumeBtn.addEventListener('click', () => { if(audioPlayer) audioPlayer.play(); });

// ===== Click outside to hide music list =====
document.addEventListener('click', (e) => {
  if(musicList && chibi && !musicList.contains(e.target) && !chibi.contains(e.target)){
    musicList.style.display = 'none';
  }
});

// ===== Mobile auto-hide =====
document.addEventListener('touchstart', e => {
  if(musicList && chibi && !musicList.contains(e.target) && !chibi.contains(e.target)){
    musicList.style.display = 'none';
  }
});

// ===== Optional: highlight first song on load =====
if(musicItems.length > 0 && audioPlayer){
  const firstSong = musicItems[0];
  firstSong.classList.add('active');
  audioPlayer.src = firstSong.getAttribute('data-src');
}
});
