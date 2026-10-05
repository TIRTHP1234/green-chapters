/* ==========================================================================
   Green Chapters Landscaping - Interactive Client Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Header Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const mobileToggleIcon = mobileToggle ? mobileToggle.querySelector('i') : null;

  const closeMobileMenu = () => {
    navMenu.classList.remove('mobile-open');
    if (mobileToggleIcon) {
      mobileToggleIcon.classList.remove('fa-xmark');
      mobileToggleIcon.classList.add('fa-bars');
    }
  };

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('mobile-open');
      if (mobileToggleIcon) {
        mobileToggleIcon.classList.toggle('fa-bars', !isOpen);
        mobileToggleIcon.classList.toggle('fa-xmark', isOpen);
      }
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('mobile-open') &&
          !navMenu.contains(e.target) &&
          !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMobileMenu();
    });
  }

  // 3. Active Section Nav Highlight
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 4. Stat Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const targetStr = stat.getAttribute('data-target');
      const target = parseInt(targetStr);
      let count = 0;
      const speed = Math.max(1, Math.floor(target / 40));

      const updateCount = () => {
        count += speed;
        if (count < target) {
          stat.textContent = count + '+';
          setTimeout(updateCount, 30);
        } else {
          stat.textContent = target + '+';
        }
      };

      updateCount();
    });
  };

  window.addEventListener('scroll', () => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    const sectionPos = aboutSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos && !animated) {
      animated = true;
      animateStats();
    }
  });

  // 5. Contact Modal Triggers
  const contactButtons = document.querySelectorAll('.open-contact-modal');
  const contactModal = document.getElementById('contactModal');

  contactButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      contactModal.classList.add('active');
    });
  });

});

/* Service Modal Detail Data (Sourced from Green Chapters Presentation PDF) */
const serviceData = {
  design: {
    tag: "Strategy & Site Intelligence",
    title: "Landscape Design & Masterplanning",
    description: "Good landscapes begin with evidence, constraints and an honest operating brief. Site intelligence prevents expensive mistakes down the line.",
    highlights: [
      "Surveying topography, levels, site access & existing natural assets",
      "Sun, shade, wind and microclimate exposure analysis",
      "Soil, water, subsoil drainage & contamination risk assessment",
      "Zoning, circulation, activity planning and 3D concept visualization",
      "IGBC and GRIHA green rating readiness from concept stage"
    ]
  },
  garden: {
    tag: "Living Systems & Horticulture",
    title: "Garden Development & Planting Systems",
    description: "Plants, soil and trees form one interconnected living system. Planting success depends on ecology below ground and stewardship above it.",
    highlights: [
      "Native, adapted and climate-fit planting palettes",
      "Canopy, understory, shrub and groundcover layer coordination",
      "Soil testing, organic amendment, depth and root-zone optimization",
      "Nursery quality control, procurement & acclimatisation protocols",
      "Hydroponics & Aeroponics options for compact high-density growing"
    ]
  },
  outdoor: {
    tag: "Hardscape & Living Environments",
    title: "Outdoor Living Spaces & Amenities",
    description: "The non-living elements make landscapes usable, safe and memorable. We construct built features that endure and age gracefully.",
    highlights: [
      "Paths, plazas, timber decks, seating edges & outdoor rooms",
      "Retaining walls, steps, ramps and shaded pergolas",
      "Pools, fountains, ponds & recirculating water features",
      "Layered outdoor lighting, smart controls & safety access",
      "Material durability, slip resistance & mock-up approvals"
    ]
  },
  sustainable: {
    tag: "Water & Ecological Resilience",
    title: "Sustainable & Ecological Landscapes",
    description: "Resilience begins with water and climate. We reduce demand, manage rain where it falls, and design for drought, heat and intense storms.",
    highlights: [
      "Rainwater harvesting, treated water integration & storage strategies",
      "Swales, rain gardens and natural stormwater infiltration zones",
      "On-site mulching, composting and nutrient circularity",
      "Habitat layers, pollinator resources & native biodiversity restoration",
      "Roof & podium greening with integrated root-barriers"
    ]
  },
  maintenance: {
    tag: "Long-Term Stewardship",
    title: "Turnkey Maintenance & Annual Care",
    description: "Maintenance should manage a living asset, not repeat a fixed list of chores. Our care protocols protect and elevate long-term landscape value.",
    highlights: [
      "Plant establishment monitoring & replacement control",
      "Seasonal horticulture, soil nourishment & pruning schedules",
      "Precision drip & sprinkler irrigation maintenance",
      "Tree structural safety, health & pest management inspections",
      "Sensors, work order logging & photographic growth tracking"
    ]
  }
};

const projectData = {
  urban: {
    tag: "Residential Landscape",
    title: "Urban Sanctuary",
    description: "A serene private garden retreat in Bangalore featuring layered tropical plantings, custom stone water cascade, ambient evening spotlighting, and child-safe lawn zones.",
    highlights: ["Bespoke courtyard layout", "Automated drip irrigation", "Biophilic indoor-outdoor transition"]
  },
  courtyard: {
    tag: "Private Residence",
    title: "Courtyard Calm",
    description: "An intimate internal courtyard centered around a mature focal shade tree, floating granite pavers, low-maintenance fern understory, and hidden ambient LED mood lighting.",
    highlights: ["Microclimate shade optimization", "Zero-runoff subsoil drainage", "Natural slate feature wall"]
  },
  retreat: {
    tag: "Villa Landscape",
    title: "The Green Retreat",
    description: "A destination-scale estate garden featuring an infinity pool edge, native drought-fit palm groves, organic herb borders, and timber lounge decks.",
    highlights: ["Edible kitchen garden beds", "IGBC Green Villa certified", "Recirculating water feature"]
  }
};

/* Open Service Modal Function */
function openServiceModal(serviceKey) {
  const modal = document.getElementById('serviceModal');
  const data = serviceData[serviceKey];
  if (!data) return;

  document.getElementById('modalTag').textContent = data.tag;
  document.getElementById('modalTitle').textContent = data.title;

  let highlightsHTML = data.highlights.map(item => `
    <div class="modal-highlight-item">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${item}</span>
    </div>
  `).join('');

  document.getElementById('modalContent').innerHTML = `
    <p>${data.description}</p>
    <div style="margin-top: 24px;">
      <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px; color: var(--accent-terracotta); margin-bottom: 14px;">Key Capabilities & Scope:</h4>
      <div class="modal-highlights-list">
        ${highlightsHTML}
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function closeServiceModal() {
  document.getElementById('serviceModal').classList.remove('active');
}

/* Open Project Modal Function */
function openProjectModal(projectKey) {
  const modal = document.getElementById('serviceModal');
  const data = projectData[projectKey];
  if (!data) return;

  document.getElementById('modalTag').textContent = data.tag;
  document.getElementById('modalTitle').textContent = data.title;

  let highlightsHTML = data.highlights.map(item => `
    <div class="modal-highlight-item">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${item}</span>
    </div>
  `).join('');

  document.getElementById('modalContent').innerHTML = `
    <p>${data.description}</p>
    <div style="margin-top: 24px;">
      <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px; color: var(--accent-terracotta); margin-bottom: 14px;">Project Features:</h4>
      <div class="modal-highlights-list">
        ${highlightsHTML}
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function closeContactModal() {
  document.getElementById('contactModal').classList.remove('active');
}

/* Form Submission Handler */
function handleFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const phone = document.getElementById('userPhone').value.trim();
  const projectSelect = document.getElementById('projectType');
  const projectType = projectSelect.options[projectSelect.selectedIndex].text;
  const message = document.getElementById('userMessage').value.trim();

  const recipient = 'info@greenchapters.in';
  const subject = `New Landscape Enquiry from ${name}`;
  const body =
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone}\n` +
    `Project Type: ${projectType}\n\n` +
    `Message:\n${message || '(none provided)'}`;

  const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;

  alert(`Thank you, ${name}! Your email app should now open with your enquiry ready to send to Green Chapters. If it didn't open, please email us directly at ${recipient}.`);
  closeContactModal();
  document.getElementById('leadContactForm').reset();
}
