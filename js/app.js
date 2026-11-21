(function () {
  const STORAGE_KEY = "saima_biva_lang";
  let currentLang = localStorage.getItem(STORAGE_KEY) || "bn";
  let articlesData = [];
  let activeCategory = "all";
  let showAllArticles = false;
  let audioSamples = [];
  let activeAudioEl = null;
  let activeAudioId = null;

  const UI_STRINGS = {
    bn: {
      pageTitle: "সাইমা বিভা | সাংবাদিক, ফিচার লেখক ও ভয়েস আর্টিস্ট",
      nav: {
        home: "হোম",
        about: "পরিচিতি",
        writing: "লেখালেখি",
        travel: "ভ্রমণ",
        voice: "কণ্ঠস্বর",
        audio: "অডিও ও প্ল্যাটফর্ম",
        contact: "যোগাযোগ"
      },
      heroBadge: "সাংবাদিকতা • ভ্রমণ ও লাইফস্টাইল • ভয়েস আর্ট",
      heroName: "সাইমা বিভা",
      heroHeadline: "শব্দ, কণ্ঠ আর গল্পের বুননে সৃজনশীল পথচলা",
      heroSub: "সাংবাদিক ও ফিচার লেখক, ভ্রমণ ও লাইফস্টাইল লেখক এবং ভয়েস আর্টিস্ট। জাতীয় দৈনিক ও অনলাইন সংবাদমাধ্যমে প্রকাশিত লেখা, ভ্রমণ অভিজ্ঞতা এবং কণ্ঠকর্মের পোর্টফোলিও।",
      ctaPrimary: "কাজগুলো দেখুন",
      ctaSecondary: "যোগাযোগ করুন",
      aboutKicker: "পরিচিতি",
      aboutTitle: "কথা, লেখা ও শিল্পের সংযোগে",
      aboutP1: "আমি সাইমা বিভা। একজন সাংবাদিক, ফিচার লেখক এবং ভয়েস আর্টিস্ট। দৈনন্দিন জীবনের অনুষঙ্গ, ভ্রমণ অভিজ্ঞতা, সংস্কৃতি এবং কণ্ঠকর্মের মাধ্যমে গল্প বলতেই ভালোবাসি।",
      aboutP2: "জাগো নিউজসহ বিভিন্ন সংবাদমাধ্যমে নিয়মিত ফিচার, লাইফস্টাইল ও ভ্রমণবিষয়ক লেখা প্রকাশিত হয়েছে। পাশাপাশি আপডেট টিভিতে নিউজ কন্টেন্টে কণ্ঠ দেওয়া, আবৃত্তি, বিজ্ঞাপন/ওভিসি এবং আইভিআর নিয়ে কাজ করেছি।",
      aboutP3: "রাজশাহী বিশ্ববিদ্যালয়ের চারুকলা অনুষদের মৃৎশিল্প ও ভাস্কর্য বিভাগের শিক্ষার্থী হিসেবে রূপ ও কাঠামোর প্রতি মনোযোগ আমার লেখালেখি ও সৃজনশীল কাজকেও সমৃদ্ধ করে।",
      writingKicker: "সাংবাদিকতা ও প্রকাশিত লেখা",
      writingTitle: "নির্বাচিত ফিচার, লাইফস্টাইল ও ভ্রমণ লেখা",
      writingSub: "প্রকাশিত লেখার আর্কাইভ থেকে ক্যাটাগরি অনুযায়ী লেখা দেখতে পারেন।",
      filterAll: "সব লেখা",
      filterTravel: "ভ্রমণ",
      filterLifestyle: "লাইফস্টাইল",
      filterCulture: "সংস্কৃতি ও উৎসব",
      readArticle: "লেখাটি পড়ুন",
      viewAll: "সব লেখা দেখুন",
      viewLess: "সংক্ষিপ্ত তালিকা",
      travelKicker: "ভ্রমণ ও অনুসন্ধান",
      travelTitle: "গন্তব্য ও ভ্রমণ অভিজ্ঞতা",
      travelSub: "যাত্রাপথের অভিজ্ঞতা ও প্রকাশিত ভ্রমণ প্রতিবেদন।",
      omanDesc: "সাম্প্রতিক ওমান ভ্রমণের অভিজ্ঞতা, স্থাপত্য, বাজার ও স্থানীয় খাবারের গল্প।",
      countrySpotDesc: "নির্বাচিত গন্তব্য ও স্থানীয় ভ্রমণ নোট যুক্ত করার জন্য নির্ধারিত সেকশন।",
      readTravelStory: "ভ্রমণ লেখা পড়ুন",
      voiceKicker: "ভয়েস আর্টিস্ট পোর্টফোলিও",
      voiceTitle: "ভয়েস স্যাম্পল",
      voiceSub: "নিউজ ন্যারেশন, বিজ্ঞাপন/ওভিসি, আইভিআর এবং আবৃত্তির অডিও নমুনা।",
      voicesProfileBtn: "Voices.com প্রোফাইল",
      audioEmpty: "এই মুহূর্তে কোনো অডিও স্যাম্পল যুক্ত করা নেই। assets/audio/samples.json আপডেট করলে এখানে দেখা যাবে।",
      musicKicker: "মিউজিক ও অডিও প্ল্যাটফর্ম",
      musicTitle: "অডিও স্ট্রিমিং ও প্রোফাইল",
      musicSub: "ভেরিফাইড প্ল্যাটফর্ম ও সৃজনশীল প্রোফাইলের সংযোগ।",
      presenceKicker: "সৃজনশীল উপস্থিতি",
      presenceTitle: "ডিজিটাল প্রোফাইলসমূহ",
      expKicker: "অভিজ্ঞতা",
      expTitle: "পেশাগত ও প্রাতিষ্ঠানিক অভিজ্ঞতা",
      rakTitle: "ইন্টার্নশিপ — আরএকে সিরামিকস (RAK Ceramics), গাজীপুর",
      rakDesc: "গাজীপুরে আরএকে সিরামিকস-এ ইন্টার্নশিপ সম্পন্ন করেছেন। (পদ, বিভাগ, সময়কাল ও দায়িত্বের বিস্তারিত প্রয়োজন অনুযায়ী যুক্ত করা যাবে।)",
      mediaTitle: "সাংবাদিকতা, ফিচার লেখা ও ভয়েস-ওভার",
      mediaDesc: "জাগো নিউজসহ বিভিন্ন প্রকাশনায় ফিচার ও লাইফস্টাইল লেখা এবং সংবাদ, ওভিসি ও আইভিআর কণ্ঠকর্ম।",
      contactKicker: "যোগাযোগ",
      contactTitle: "কথা বলুন বা কাজের বিষয়ে যোগাযোগ করুন",
      contactSub: "সাংবাদিকতা ও লেখালেখি, ভয়েস-ওভার বা ন্যারেশন এবং ভ্রমণ বা সৃজনশীল সহযোগিতার জন্য যোগাযোগ করতে পারেন।",
      inquiryWriting: "সাংবাদিকতা ও লেখালেখি",
      inquiryVoice: "ভয়েস-ওভার ও ন্যারেশন",
      inquiryCollab: "ভ্রমণ ও সৃজনশীল সহযোগিতা",
      emailPlaceholder: "ইমেইল যুক্ত করুন (সম্পাদনাযোগ্য)",
      footerTag: "সাংবাদিক, ফিচার লেখক ও ভয়েস আর্টিস্ট",
      backToTop: "উপরে যান",
      langLabel: "বাংলা | English"
    },
    en: {
      pageTitle: "Saima Biva | Journalist, Feature Writer & Voice Artist",
      nav: {
        home: "Home",
        about: "About",
        writing: "Writing",
        travel: "Travel",
        voice: "Voice",
        audio: "Audio",
        contact: "Contact"
      },
      heroBadge: "Journalism • Travel & Lifestyle • Voice Art",
      heroName: "Saima Biva",
      heroHeadline: "Stories shaped through words, voice, and observation",
      heroSub: "Journalist, feature and travel writer, lifestyle contributor, and voice artist. Selected published stories, travel notes, and voice samples.",
      ctaPrimary: "Explore My Work",
      ctaSecondary: "Get in Touch",
      aboutKicker: "About",
      aboutTitle: "Where journalism, storytelling, and voice meet",
      aboutP1: "I am Saima Biva, a journalist, feature writer, and voice artist. My work focuses on everyday culture, travel observations, lifestyle stories, and spoken expression.",
      aboutP2: "My writing has appeared in outlets including Jago News, covering travel, lifestyle, and seasonal traditions, alongside voice work spanning news narration, commercials/OVCs, IVR prompts, and recitation.",
      aboutP3: "Studying Printmaking/Ceramics & Sculpture at the Faculty of Fine Arts, University of Rajshahi shapes my eye for form, texture, and visual detail.",
      writingKicker: "Journalism & Published Stories",
      writingTitle: "Selected Features, Lifestyle & Travel Stories",
      writingSub: "Browse published stories and filter by category.",
      filterAll: "All Stories",
      filterTravel: "Travel",
      filterLifestyle: "Lifestyle",
      filterCulture: "Culture & Festivities",
      readArticle: "Read Article",
      viewAll: "View All Stories",
      viewLess: "Show Selected",
      travelKicker: "Travel & Exploration",
      travelTitle: "Destinations & Travel Notes",
      travelSub: "Places visited and published travel writing.",
      omanDesc: "Recent travel story from Oman highlighting architecture, local markets, and regional food.",
      countrySpotDesc: "Dedicated destination slot ready for additional country highlights and travel links.",
      readTravelStory: "Read Travel Story",
      voiceKicker: "Voice Artist Portfolio",
      voiceTitle: "Voice Samples",
      voiceSub: "Custom lightweight audio samples across news narration, OVC/ads, IVR, and recitation.",
      voicesProfileBtn: "Voices.com Profile",
      audioEmpty: "No audio samples are currently listed. Add files and update assets/audio/samples.json to display them here.",
      musicKicker: "Music & Audio Platforms",
      musicTitle: "Audio Distribution & Profiles",
      musicSub: "Verified audio streaming and creator profile links.",
      presenceKicker: "Creative Presence",
      presenceTitle: "Digital Profiles",
      expKicker: "Experience",
      expTitle: "Experience & Background",
      rakTitle: "Internship — RAK Ceramics, Gazipur",
      rakDesc: "Completed an internship at RAK Ceramics in Gazipur. (Role, department, dates, and responsibilities can be added here.)",
      mediaTitle: "Journalism, Feature Writing & Voice Work",
      mediaDesc: "Published lifestyle, food, culture, and travel pieces alongside broadcast narration, OVC, and IVR voice work.",
      contactKicker: "Contact",
      contactTitle: "Inquiries & Collaborations",
      contactSub: "Reach out for journalism and writing assignments, voice-over and narration projects, or travel and creative collaborations.",
      inquiryWriting: "Journalism & Writing",
      inquiryVoice: "Voice-Over & Narration",
      inquiryCollab: "Travel & Collaborations",
      emailPlaceholder: "Add email address (editable)",
      footerTag: "Journalist, Feature Writer & Voice Artist",
      backToTop: "Back to Top",
      langLabel: "বাংলা | English"
    }
  };

  function formatTime(sec) {
    if (!Number.isFinite(sec) || sec < 0) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  function applyLanguage(lang) {
    currentLang = lang === "en" ? "en" : "bn";
    localStorage.setItem(STORAGE_KEY, currentLang);
    document.documentElement.lang = currentLang;
    document.body.classList.toggle("lang-en", currentLang === "en");

    const t = UI_STRINGS[currentLang];
    document.title = t.pageTitle;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const parts = key.split(".");
      let val = t;
      for (const p of parts) {
        val = val && val[p];
      }
      if (typeof val === "string") {
        el.textContent = val;
      }
    });

    document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
      btn.setAttribute("aria-pressed", currentLang === "en" ? "true" : "false");
    });

    renderArticles();
    renderAudioSamples();
  }

  function renderArticles() {
    const grid = document.getElementById("articles-grid");
    const toggleBtn = document.getElementById("toggle-all-articles");
    if (!grid) return;

    const filtered = activeCategory === "all"
      ? articlesData
      : articlesData.filter((a) => a.category === activeCategory);

    const visibleItems = showAllArticles ? filtered : filtered.slice(0, 6);

    if (toggleBtn) {
      if (filtered.length > 6) {
        toggleBtn.classList.remove("hidden");
        toggleBtn.textContent = showAllArticles
          ? UI_STRINGS[currentLang].viewLess
          : `${UI_STRINGS[currentLang].viewAll} (${filtered.length})`;
      } else {
        toggleBtn.classList.add("hidden");
      }
    }

    grid.innerHTML = visibleItems.map((item) => {
      const title = currentLang === "en" && item.title_en ? item.title_en : item.title_bn;
      const category = currentLang === "en" && item.category_en ? item.category_en : item.category_bn;
      const excerpt = currentLang === "en" && item.excerpt_en ? item.excerpt_en : item.excerpt_bn;
      const readLabel = UI_STRINGS[currentLang].readArticle;

      return `
        <article class="bg-white border border-[#e5ddd0] rounded-xl overflow-hidden flex flex-col justify-between transition hover:border-[#a64b2a]">
          <div>
            ${item.image ? `
              <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="block aspect-[16/10] bg-[#f2ece2] overflow-hidden">
                <img src="${item.image}" alt="${title}" loading="lazy" class="w-full h-full object-cover transition duration-300 hover:scale-[1.02]">
              </a>
            ` : ""}
            <div class="p-5">
              <div class="flex items-center justify-between gap-2 text-xs text-[#7a736b] mb-2">
                <span class="font-medium text-[#a64b2a]">${category || ""}</span>
                <span>${item.publication_date || ""}</span>
              </div>
              <h3 class="text-lg font-bold text-[#1f1d1b] leading-snug mb-2">
                <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="hover:text-[#a64b2a] transition">${title}</a>
              </h3>
              ${excerpt ? `<p class="text-sm text-[#57524c] leading-relaxed">${excerpt}</p>` : ""}
            </div>
          </div>
          <div class="px-5 pb-5 pt-2 flex items-center justify-between border-t border-[#f2ece2]">
            <span class="text-xs text-[#7a736b]">${item.publication || ""}</span>
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-[#a64b2a] hover:text-[#7d341a] inline-flex items-center gap-1">
              <span>${readLabel}</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            </a>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderAudioSamples() {
    const container = document.getElementById("audio-samples-list");
    if (!container) return;

    if (!Array.isArray(audioSamples) || audioSamples.length === 0) {
      container.innerHTML = `
        <div class="col-span-full bg-[#faf7f2] border border-[#e5ddd0] rounded-xl p-6 text-sm text-[#57524c]">
          ${UI_STRINGS[currentLang].audioEmpty}
        </div>
      `;
      return;
    }

    container.innerHTML = audioSamples.map((sample, idx) => {
      const id = sample.id || `sample-${idx}`;
      const title = currentLang === "en" && sample.title_en ? sample.title_en : sample.title_bn;
      const cat = currentLang === "en" && sample.category_en ? sample.category_en : sample.category_bn;
      const desc = currentLang === "en" && sample.description_en ? sample.description_en : sample.description_bn;
      const isPlaying = activeAudioId === id && activeAudioEl && !activeAudioEl.paused;

      return `
        <div class="bg-[#faf7f2] border border-[#e5ddd0] rounded-xl p-5 flex flex-col justify-between gap-4" data-sample-id="${id}">
          <div class="flex items-start gap-4">
            <button type="button" data-audio-play="${id}" aria-label="${title}" class="w-11 h-11 shrink-0 rounded-full bg-[#a64b2a] text-white flex items-center justify-center hover:bg-[#7d341a] transition focus:outline-none focus:ring-2 focus:ring-[#a64b2a]">
              <i class="fa-solid ${isPlaying ? "fa-pause" : "fa-play"} text-sm"></i>
            </button>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="font-bold text-base text-[#1f1d1b]">${title}</h3>
                ${cat ? `<span class="text-xs px-2.5 py-0.5 rounded-full bg-[#f7eae4] text-[#7d341a] font-medium">${cat}</span>` : ""}
              </div>
              ${desc ? `<p class="text-sm text-[#57524c] mt-1">${desc}</p>` : ""}
            </div>
          </div>

          <div class="space-y-1.5">
            <div class="audio-progress-track" data-audio-seek="${id}" role="slider" aria-label="${title} progress" tabindex="0">
              <div class="audio-progress-fill" data-audio-bar="${id}"></div>
            </div>
            <div class="flex items-center justify-between text-xs font-mono text-[#7a736b]">
              <span data-audio-curr="${id}">0:00</span>
              <span data-audio-dur="${id}">0:00</span>
            </div>
          </div>
        </div>
      `;
    }).join("");

    container.querySelectorAll("[data-audio-play]").forEach((btn) => {
      btn.addEventListener("click", () => toggleSample(btn.getAttribute("data-audio-play")));
    });

    container.querySelectorAll("[data-audio-seek]").forEach((track) => {
      track.addEventListener("click", (e) => seekSample(e, track.getAttribute("data-audio-seek")));
    });
  }

  function toggleSample(id) {
    const sample = audioSamples.find((s, i) => (s.id || `sample-${i}`) === id);
    if (!sample || !sample.file) return;

    if (activeAudioId === id && activeAudioEl) {
      if (activeAudioEl.paused) {
        activeAudioEl.play().catch(() => {});
        setPlayIcon(id, true);
      } else {
        activeAudioEl.pause();
        setPlayIcon(id, false);
      }
      return;
    }

    if (activeAudioEl) {
      activeAudioEl.pause();
      if (activeAudioId) setPlayIcon(activeAudioId, false);
    }

    const audio = new Audio(sample.file);
    audio.preload = "metadata";
    activeAudioEl = audio;
    activeAudioId = id;

    audio.addEventListener("loadedmetadata", () => {
      const durEl = document.querySelector(`[data-audio-dur="${id}"]`);
      if (durEl) durEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      const currEl = document.querySelector(`[data-audio-curr="${id}"]`);
      const barEl = document.querySelector(`[data-audio-bar="${id}"]`);
      if (currEl) currEl.textContent = formatTime(audio.currentTime);
      if (barEl && audio.duration > 0) {
        barEl.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
      }
    });

    audio.addEventListener("ended", () => {
      setPlayIcon(id, false);
      const barEl = document.querySelector(`[data-audio-bar="${id}"]`);
      const currEl = document.querySelector(`[data-audio-curr="${id}"]`);
      if (barEl) barEl.style.width = "0%";
      if (currEl) currEl.textContent = "0:00";
    });

    audio.addEventListener("error", () => {
      setPlayIcon(id, false);
    });

    audio.play().then(() => {
      setPlayIcon(id, true);
    }).catch(() => {
      setPlayIcon(id, false);
    });
  }

  function setPlayIcon(id, playing) {
    const btn = document.querySelector(`[data-audio-play="${id}"] i`);
    if (btn) {
      btn.className = `fa-solid ${playing ? "fa-pause" : "fa-play"} text-sm`;
    }
  }

  function seekSample(event, id) {
    if (activeAudioId !== id || !activeAudioEl || !activeAudioEl.duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    activeAudioEl.currentTime = ratio * activeAudioEl.duration;
  }

  function setupNavigationAndReveal() {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener("click", () => {
        const expanded = menuBtn.getAttribute("aria-expanded") === "true";
        menuBtn.setAttribute("aria-expanded", String(!expanded));
        mobileMenu.classList.toggle("hidden");
      });
      mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          menuBtn.setAttribute("aria-expanded", "false");
          mobileMenu.classList.add("hidden");
        });
      });
    }

    document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyLanguage(currentLang === "bn" ? "en" : "bn");
      });
    });

    document.querySelectorAll("[data-filter-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeCategory = btn.getAttribute("data-filter-cat");
        showAllArticles = false;
        document.querySelectorAll("[data-filter-cat]").forEach((b) => {
          b.classList.remove("bg-[#1f1d1b]", "text-white");
          b.classList.add("bg-white", "text-[#57524c]", "border", "border-[#e5ddd0]");
        });
        btn.classList.remove("bg-white", "text-[#57524c]", "border", "border-[#e5ddd0]");
        btn.classList.add("bg-[#1f1d1b]", "text-white");
        renderArticles();
      });
    });

    const toggleAllBtn = document.getElementById("toggle-all-articles");
    if (toggleAllBtn) {
      toggleAllBtn.addEventListener("click", () => {
        showAllArticles = !showAllArticles;
        renderArticles();
      });
    }

    const yearEl = document.getElementById("copyright-year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }

    const backTop = document.getElementById("back-to-top");
    if (backTop) {
      backTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    const sections = document.querySelectorAll("main section[id], header[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    if ("IntersectionObserver" in window && sections.length > 0) {
      const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
          }
        });
      }, { rootMargin: "-35% 0px -55% 0px" });

      sections.forEach((sec) => navObserver.observe(sec));
    }

    document.documentElement.classList.add("reveal-ready");
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const revObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      revealEls.forEach((el) => revObserver.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }
  }

  async function loadData() {
    try {
      const res = await fetch("data/articles.json");
      if (res.ok) articlesData = await res.json();
    } catch (_) {
      articlesData = [];
    }

    try {
      const res = await fetch("assets/audio/samples.json");
      if (res.ok) audioSamples = await res.json();
    } catch (_) {
      audioSamples = [];
    }

    renderArticles();
    renderAudioSamples();
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupNavigationAndReveal();
    applyLanguage(currentLang);
    loadData();
  });
})();
