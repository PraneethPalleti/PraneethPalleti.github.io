// ==================== Sliding Underline Navigation ====================
const navLinks = document.querySelectorAll("#navbar ul li a");
const underline = document.getElementById("underline");

function moveUnderline(link) {
  const linkRect = link.getBoundingClientRect();
  const navbarRect = document.getElementById("navbar").getBoundingClientRect();

  // Calculate the position and width of the underline
  console.log(linkRect.left, navbarRect.left)
  const left = linkRect.left - navbarRect.left;
  const width = linkRect.width;

  // Apply the position and width to the underline
  underline.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'; // Smooth transition
  underline.style.left = `${left}px`;
  underline.style.width = `${width}px`;
}

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    moveUnderline(link); // Move the underline
    document.querySelector(link.getAttribute("href")).scrollIntoView({
      behavior: "smooth", // Smooth scroll to the section
    });
  });
});

// Function to update the underline on scroll
function updateUnderline() {
  const sections = document.querySelectorAll("section");
  let currentSection = "hero";

  // Find the current section in view
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 100) {
      currentSection = section.getAttribute("id");
    }
  });

  // Find the corresponding link and move the underline
  navLinks.forEach((link) => {
    if (link.getAttribute("href").includes(currentSection)) {
      moveUnderline(link);
    }
  });
}

// Add event listener for scroll
window.addEventListener("scroll", updateUnderline);

// Call the function on page load
window.addEventListener("load", () => {
  const homeLink = document.querySelector('#navbar ul li a[href="#hero"]'); 
  if (homeLink) {
    moveUnderline(homeLink); // Set underline to Home link initially
  }
  updateUnderline(); // Ensure it updates based on scroll
});
const projects = [
  {
    title: "Apple Stock Prediction with LSTM Model",
    category: "ml",
    image: "apple_logo.jpeg",
    description: "Developed an LSTM model to predict Apple's stock prices using historical data. Achieved high accuracy with RMSE and MAPE metrics. Visualized predictions and actual prices using advanced plotting techniques.",
    skills: ["Keras", "LSTM", "Time Series Analysis", "Model Evaluation", "Data Visualization"],
    outcome: "15% Accuracy Improvement",
    github: "https://github.com/PraneethPalleti/Apple-Stock-Prediction-with-LSTM-Model"
  },
  {
    title: "Bitcoin Price Movement Based on News",
    category: "nlp",
    image: "Bit_logo.jpeg",
    description: "Predicted Bitcoin price movements by analyzing news sentiment using TextBlob. Engineered features like rolling sentiment averages. Applied Linear Regression and Random Forest for predictions.",
    skills: ["ccxt", "NLTK", "yfinance", "textblob", "Decision-Making", "requests"],
    outcome: "Improved prediction accuracy",
    github: "https://github.com/PraneethPalleti/Bitcoin-Price-Movement-Based-on-News"
  },
  {
    title: "All-Star Football Team Selection Using FIFA 18 Data - Tableau",
    category: "viz",
    image: "fifa_logo.jpeg",
    description: "Analyzed 300,000 FIFA 18 player records to optimize team selection. Built interactive Tableau dashboards for player comparisons. Identified top performers and undervalued players using statistical analysis.",
    skills: ["Data Visualization", "Excel", "Business Insights", "Sports", "Data Cleaning", "Data Storytelling", "Data Analysis", "Tableau"],
    outcome: "Optimized team selection process",
    github: "https://github.com/PraneethPalleti/FIFA_DATA"
  },
  {
    title: "Asteroid Classification Using Machine Learning",
    category: "ml",
    image: "astroid_logo.jpeg",
    description: "Classified asteroids using machine learning models. Decision Tree CV achieved 99.62% accuracy. Evaluated models using precision, recall, and F1 score for optimal performance.",
    skills: ["Statistical Analysis", "Model Optimization", "Algorithm Optimization", "Cross-validation", "Feature Engineering", "Automated Feature Engineering"],
    outcome: "99.62% Accuracy",
    github:"https://github.com/PraneethPalleti/Asteriod-Classification-and-Visualization"
  },
  {
    title: "Buffalo Crime Data Analysis: Website Creation and Crime Forecasting",
    category: "ml",
    image: "crime_logo.jpg",
    description: "Developed a crime analysis platform using Flask. Processed 305,000 records and achieved 80% prediction accuracy. Provided insights for public safety and resource allocation.",
    skills: ["Flask", "Machine Learning", "Leadership", "Storytelling", "Query Writing", "XGBoost", "Data Storytelling", "Machine Learning Tools"],
    outcome: "80% Prediction Accuracy",
    github: "https://github.com/PraneethPalleti/Buffalo-Crime-Insights"
  },
  {
    title: "Wood Price Data Visualization using Python and Plotly",
    category: "viz",
    image: "wood_logo.jpeg",
    description: "Visualized global timber prices using Plotly and GeoPandas. Analyzed local vs. imported wood prices. Created tree maps and scatter geo plots for demand patterns.",
    skills: ["Data Visualization", "Plotly", "GeoPandas", "shapely"],
    outcome: "Insights into global timber pricing",
    github:"https://github.com/PraneethPalleti/PraneethPalleti-Visual-Exploration-on-Wood-Pricing-Data"
  }
];
// ==================== Consolidated Filter Functionality ====================
function initializeFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  console.log(filterButtons)
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get filter value and apply
      const filter = button.dataset.filter;
      filterProjects(filter);
    });
  });
}

// ==================== Improved Filter Function with Better Transitions ====================
function filterProjects(filter) {
  const cards = document.querySelectorAll('.project-card');
  
  cards.forEach(card => {
    const category = card.dataset.category;
    const shouldShow = filter === 'all' || filter === category;
    
    // Immediate visual feedback
    card.style.opacity = shouldShow ? '1' : '0';
    card.style.transform = shouldShow ? 'translateY(0)' : 'translateY(20px)';
    card.style.display = shouldShow ? 'block' : 'none';

  });
}

// ==================== Initialize filters when DOM is ready ====================
document.addEventListener('DOMContentLoaded', () => {
  initializeFilters();
  generateProjectCards();
});

// ==================== Generate Project Cards ====================
function generateProjectCards(){
const projectGrid = document.querySelector('.project-grid');
  if (projectGrid) {
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        // Add category data attribute for filtering
        card.dataset.category = project.category;

        card.innerHTML = `
        <div class="card-header">
            <div class="project-image">
                <img src="images/${project.image}" alt="${project.title}" 
                    onerror="this.src='images/placeholder.png'">
            </div>
        </div>
        <div class="card-body">
            <h3>${project.title}</h3>
            <div class="project-skills">
                ${project.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-outcome">
                <i class="fas fa-trophy"></i>
                <span>${project.outcome}</span>
            </div>
        </div>
        <div class="card-footer">
            <a href="${project.github}" target="_blank" class="github-link">
                <i class="fab fa-github"></i> View Code
            </a>
        </div>
        `;
        
        projectGrid.appendChild(card);
    });
  }
}

// ==================== Profile Hover Effect ====================
const profilePic = document.querySelector('.profile-pic');
if (profilePic) {
  profilePic.addEventListener('mouseleave', function() {
      document.querySelectorAll('body > *:not(.profile-pic)').forEach(el => {
          el.style.filter = 'none';
      });
  });
}




// ==================== Education Timeline Duration Sizing ====================
if (document.querySelector('.timeline-item')) {
  document.querySelectorAll('.timeline-item').forEach(item => {
    const dateElement = item.querySelector('.timeline-date');
    const dates = dateElement.textContent.split(' - ').map(Number);
    const duration = dates[1] - dates[0];
    
    const content = item.querySelector('.timeline-content');
    if (content) {
      // Set CSS custom properties for dynamic sizing
      content.style.setProperty('--duration', duration);
      content.style.minHeight = `calc(100px + ${duration} * 40px)`;
      content.style.width = `calc(250px + ${duration} * 30px)`;
      // Add duration annotation
      content.setAttribute('data-duration', `${duration} year${duration > 1 ? 's' : ''}`);
    }
  });
}
// ==================== Enhanced Particles.js Configuration ====================
particlesJS('particles-js', {
  particles: {
    number: {
      value: 50, // Reduced number of particles
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#2ec4b6', // Teal color
    },
    shape: {
      type: 'circle', // You can also use 'triangle', 'star', or 'polygon'
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0.5,
      random: true, // Random opacity
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#2ec4b6',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 3, // Increase speed
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'bounce', // Particles bounce back when they hit the edges
      bounce: true,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'bubble', // Particles will bubble on hover
      },
      onclick: {
        enable: true,
        mode: 'push', // Particles will be pushed on click
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 200,
        size: 6,
        duration: 2,
        opacity: 0.8,
        speed: 3,
      },
      push: {
        particles_nb: 4,
      },
    },
  },
  retina_detect: true,
});

// ==================== Typing Animation ====================
document.addEventListener("DOMContentLoaded", function() {
  const text = "Hello, I'm Praneeth Palleti...";
  let index = 0;
  function typeEffect() {
      if (index < text.length) {
          document.getElementById("typing-text").textContent += text.charAt(index);
          index++;
          setTimeout(typeEffect, 100);
      }
  }
  typeEffect();
});
// ==================== Lightbox Functionality ====================
document.querySelectorAll('.logo-img, .project-image img').forEach(img => {
  img.onclick = function() {
    const lightbox = document.getElementById('lightbox');
    const zoomedImg = document.getElementById('zoomed-img');
    if (lightbox && zoomedImg) {
      zoomedImg.src = this.src;
      lightbox.style.display = 'flex';
    }
  }
});

document.querySelector('.close-btn')?.addEventListener('click', () => {
  document.getElementById('lightbox').style.display = 'none';
});

// ==================== Radar Chart for Skills ====================
document.addEventListener('DOMContentLoaded', function () {
  const ctx = document.getElementById('skillsRadarChart').getContext('2d');
  const skillsRadarChart = new Chart(ctx, {
      type: 'radar',
      data: {
          labels: ['Python', 'Statistics', 'R', 'SQL', 'Machine Learning'],
          datasets: [{
              label: 'Skill Level',
              data: [95, 90, 85, 95, 95], // Corresponding skill levels
              backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue fill
              borderColor: 'rgba(54, 162, 235, 1)', // Blue border
              borderWidth: 2,
              pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Blue points
              pointBorderColor: '#fff', // White point borders
              pointHoverBackgroundColor: '#fff', // White on hover
              pointHoverBorderColor: 'rgba(54, 162, 235, 1)' // Blue border on hover
          }]
      },
      options: {
          scales: {
              r: {
                  angleLines: {
                      color: 'rgba(200, 200, 200, 0.3)' // Light gray angle lines
                  },
                  grid: {
                      color: 'rgba(200, 200, 200, 0.3)' // Light gray grid lines
                  },
                  pointLabels: {
                      color: 'cyan', // Purple color for skill names (labels)
                      font: {
                          size: 14,
                          weight: 'bold'
                      }
                  },
                  ticks: {
                      display: false, // Hide the numbers (scale ticks)
                      backdropColor: 'transparent' // Transparent background for ticks
                  },
                  suggestedMin: 0,
                  suggestedMax: 100
              }
          },
          plugins: {
              legend: {
                  display: false // Hide the legend
              }
          },
          responsive: true,
          maintainAspectRatio: false
      }
  });

  // Particles.js initialization
  particlesJS.load('particles-js', 'particles.json', function() {
      console.log('Particles.js loaded');
  });
});



// ==================== Canvas-based Interactive Background ====================
const canvas = document.createElement('canvas');
canvas.id = 'interactiveCanvas';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.directionY = -this.directionY;
    }

    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
  }
}

function init() {
  particlesArray.length = 0;
  for (let i = 0; i < 100; i++) {
    const size = Math.random() * 5 + 1;
    const x = Math.random() * (canvas.width - size * 2) + size;
    const y = Math.random() * (canvas.height - size * 2) + size;
    const directionX = (Math.random() * 0.4) - 0.2;
    const directionY = (Math.random() * 0.4) - 0.2;
    const color = '#2ec4b6';

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
}

init();
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
// ==================== Enhanced Particles.js Configuration ====================
particlesJS('particles-js', {
  particles: {
    number: {
      value: 100, // Increase the number of particles
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#2ec4b6' // Teal color
    },
    shape: {
      type: 'circle', // You can also use 'triangle', 'star', or 'polygon'
      stroke: {
        width: 0,
        color: '#000000'
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 0.5,
      random: true, // Random opacity
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#2ec4b6',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 3, // Increase speed
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'bounce', // Particles bounce back when they hit the edges
      bounce: true,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'bubble' // Particles will bubble on hover
      },
      onclick: {
        enable: true,
        mode: 'push' // Particles will be pushed on click
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 200,
        size: 6,
        duration: 2,
        opacity: 0.8,
        speed: 3
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
});
