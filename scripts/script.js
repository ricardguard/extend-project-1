// Função para alternar o menu mobile
function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');

  // Alterar o ícone do botão
  const buttonIcon = document.querySelector('.mobile-menu i');
  if (menu.classList.contains('active')) {
    buttonIcon.className = 'fas fa-times';
  } else {
    buttonIcon.className = 'fas fa-bars';
  }
}

// Fechar o menu quando um link é clicado (melhor experiência móvel)
document.querySelectorAll('.dropdown .dropbtn').forEach(dropbtn => {
  dropbtn.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();

      // Fecha todos os outros dropdowns
      document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        if (dropdown !== this.nextElementSibling) {
          dropdown.classList.remove('show');
        }
      });

      // Alterna o dropdown clicado
      this.nextElementSibling.classList.toggle('show');
    }
  });
});

// Melhorar comportamento do dropdown em dispositivos móveis
document.querySelectorAll('.dropdown .dropbtn').forEach(dropbtn => {
  dropbtn.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      this.nextElementSibling.classList.toggle('show');
    }
  });
});

// Fechar dropdowns quando clicar fora
window.addEventListener('click', function (e) {
  if (!e.target.matches('.dropbtn')) {
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
    });
  }
});

// Toggle Formulário Flutuante
function toggleForm() {
  const form = document.querySelector(".form-container");
  form.classList.toggle("show");
}

// Hero Slider
let slideIndex = 1;
let slideTimer;

function changeSlide(n) {
  try {
    showSlides((slideIndex += n));
  } catch (error) {
    console.error('Erro ao mudar slide:', error);
  }
}

function currentSlide(n) {
  try {
    showSlides((slideIndex = n));
  } catch (error) {
    console.error('Erro ao definir slide atual:', error);
  }
}

function showSlides(n) {
  const slides = document.getElementsByClassName("slides");
  const dots = document.getElementsByClassName("dot");
  
  if (!slides.length || !dots.length) {
    console.warn('Elementos do slider não encontrados');
    return;
  }

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Limpa displays anteriores
  Array.from(slides).forEach(slide => slide.style.display = "none");
  Array.from(dots).forEach(dot => dot.className = dot.className.replace(" active", ""));

  // Define slide atual
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Inicializa o slider
function initSlider() {
  showSlides(slideIndex);
  // Limpa timer anterior se existir
  if (slideTimer) clearInterval(slideTimer);
  // Inicia novo timer
  slideTimer = setInterval(() => changeSlide(1), 5000);
}

// Limpa o timer quando a página é fechada ou alterada
function cleanupSlider() {
  if (slideTimer) {
    clearInterval(slideTimer);
    slideTimer = null;
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", initSlider);
window.addEventListener('beforeunload', cleanupSlider);
window.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cleanupSlider();
  } else {
    initSlider();
  }
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll(".faq-question");

if (faqQuestions.length > 0) {
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      // Toggle active class
      question.classList.toggle("active");

      // Get the answer panel
      const answer = question.nextElementSibling;

      // Toggle panel visibility
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

// Animação de Contagem para Estatísticas
function animateStats() {
  const stats = document.querySelectorAll(".stat-number");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stat = entry.target;
        const count = parseInt(stat.getAttribute('data-count'));
        const prefix = stat.getAttribute('data-prefix') || '';
        const suffix = stat.getAttribute('data-suffix') || '';
        let current = 0;
        const step = count / 50; // Ajuste a velocidade da animação aqui
        const timer = setInterval(() => {
          current += step;
          if (current >= count) {
            clearInterval(timer);
            current = count;
          }
          stat.textContent = `${prefix}${Math.floor(current)}${suffix}`;
        }, 30);
        observer.unobserve(stat);
      }
    });
  });

  stats.forEach(stat => observer.observe(stat));
}

// Roda ao carregar a página
document.addEventListener("DOMContentLoaded", animateStats);

// Validação de Formulário de Contato
const contactForm = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validação básica
    let valid = true;
    const requiredFields = contactForm.querySelectorAll("[required]");

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add("error");
        valid = false;
      } else {
        field.classList.remove("error");
      }
    });

    if (!valid) {
      feedback.style.display = "block";
    } else {
      feedback.style.display = "none";
      // Aqui você adicionaria o código para enviar o formulário
      alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      contactForm.reset();
    }
  });
}

// Verificação de Segurança
const checkSecurityBtn = document.getElementById("check-security");

if (checkSecurityBtn) {
  checkSecurityBtn.addEventListener("click", () => {
    let score = 0;
    const selected = document.querySelectorAll(".option-btn.selected");

    if (selected.length < 5) {
      alert("Por favor, responda todas as perguntas.");
      return;
    }

    selected.forEach((btn) => {
      const value = btn.getAttribute("data-value");
      if (value !== null) {
        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue)) {
          score += parsedValue;
        }
      }
    });

    // Esconder todos os resultados
    document.querySelectorAll(".security-result").forEach((result) => {
      result.style.display = "none";
    });

    // Mostrar resultado apropriado
    const resultGood = document.getElementById("result-good");
    const resultMedium = document.getElementById("result-medium");
    const resultBad = document.getElementById("result-bad");

    if (score >= 8 && resultGood) {
      resultGood.style.display = "block";
    } else if (score >= 5 && resultMedium) {
      resultMedium.style.display = "block";
    } else if (resultBad) {
      resultBad.style.display = "block";
    }
  });
}

// Selecionar opções de resposta
const optionBtns = document.querySelectorAll(".option-btn");

optionBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remover seleção dos botões na mesma pergunta
    const siblings = btn.parentElement.querySelectorAll(".option-btn");
    siblings.forEach((sibling) => {
      sibling.classList.remove("selected");
    });

    // Selecionar o botão clicado
    btn.classList.add("selected");
  });
});

// Newsletter Signup
const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    // Validação de formato de email utilizando regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      alert("Por favor, insira um email.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Por favor, insira um email válido.");
      return;
    }

    alert("Obrigado por se inscrever! Você receberá nossas atualizações em breve.");
    newsletterForm.reset();
  });
}

// Smooth Scrolling para Links Internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Função para alternar entre tema claro e escuro
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  // Opcional: salvar preferência do usuário no localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    document.getElementById("theme-toggle").innerHTML = "☀️"; // Muda para ícone de sol no modo escuro
  } else {
    localStorage.setItem("theme", "light");
    document.getElementById("theme-toggle").innerHTML = "🌙"; // Muda para ícone de lua no modo claro
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const userTheme = localStorage.getItem("theme");
  const themeToggle = document.getElementById("theme-toggle");

  if (userTheme === "dark" || (!userTheme && prefersDarkScheme.matches)) {
    document.body.classList.add("dark-mode");
    if (themeToggle) themeToggle.innerHTML = "☀️";
  } else {
    document.body.classList.remove("dark-mode");
    if (themeToggle) themeToggle.innerHTML = "🌙";
  }
});

const comentarios = [];
const palavrasOfensivas = ["idiota", "burro", "estúpido", "inútil", "lixo"];

document.getElementById("comment-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("comentario-nome").value.trim();
  let texto = document.getElementById("comentario-texto").value.trim();

  // Filtro de palavras ofensivas
  palavrasOfensivas.forEach((palavra) => {
    const regex = new RegExp(`\\b${palavra}\\b`, "gi");
    texto = texto.replace(regex, "***");
  });

  if (nome && texto) {
    const novoComentario = {
      nome,
      texto,
    };
    comentarios.push(novoComentario);
    renderizarComentarios();
    document.getElementById("comment-form").reset();
  }
});

function renderizarComentarios() {
  const lista = document.getElementById("comentarios-lista");
  lista.innerHTML = "";
  comentarios.forEach((c) => {
    const div = document.createElement("div");
    div.classList.add("comentario-item");

    const nomeElement = document.createElement("strong");
    nomeElement.textContent = c.nome;

    const textoElement = document.createElement("p");
    textoElement.textContent = c.texto;

    div.appendChild(nomeElement);
    div.appendChild(textoElement);
    lista.appendChild(div);
  });

  // Inserção de emoji no textarea
  document.querySelectorAll(".emoji-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const textarea = document.getElementById("comentario-texto");
      textarea.value += btn.textContent;
      textarea.focus();
    });
  });
}

// Registro do Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/scripts/sw.js')
            .then(registration => {
                console.log('Service Worker registrado com sucesso:', registration.scope);
            })
            .catch(error => {
                console.log('Falha ao registrar o Service Worker:', error);
            });
    });
}

// Feedback visual para interações
function addVisualFeedback() {
    const buttons = document.querySelectorAll('button, .hero-btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
}

// Animação suave para scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Feedback de carregamento para imagens
function addImageLoadingFeedback() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    addVisualFeedback();
    animateStats();
    addImageLoadingFeedback();
    // ... resto do código existente ...
});

// Validação em tempo real dos formulários
function setupFormValidation(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const inputs = form.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = '';

  // Remove mensagens de erro anteriores
  const existingError = field.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  // Validações específicas por tipo
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'Este campo é obrigatório';
  } else if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Por favor, insira um email válido';
    }
  } else if (field.type === 'tel' && value) {
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!phoneRegex.test(value)) {
      isValid = false;
      errorMessage = 'Formato: (99) 99999-9999';
    }
  }

  // Atualiza classes e mensagens
  if (!isValid) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = errorMessage;
    field.parentElement.appendChild(errorDiv);
  } else {
    field.classList.remove('error');
  }

  return isValid;
}

// Máscara para telefone
function setupPhoneMask() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        e.target.value = value;
      }
    });
  });
}

// Feedback visual para interações
function addLoadingState(button) {
  const originalText = button.textContent;
  button.disabled = true;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
  return originalText;
}

function removeLoadingState(button, originalText) {
  button.disabled = false;
  button.textContent = originalText;
}

// Melhorar feedback de carregamento de imagens
function setupImageLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  images.forEach(img => {
    const wrapper = document.createElement('div');
    wrapper.className = 'image-wrapper';
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    
    const loader = document.createElement('div');
    loader.className = 'image-loader';
    wrapper.appendChild(loader);
    
    img.addEventListener('load', () => {
      loader.style.display = 'none';
      img.style.opacity = '1';
    });
    
    img.addEventListener('error', () => {
      loader.style.display = 'none';
      img.src = 'path/to/fallback-image.jpg';
      img.alt = 'Imagem não disponível';
    });
  });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  setupFormValidation('contact-form');
  setupFormValidation('comment-form');
  setupPhoneMask();
  setupImageLoading();
  addVisualFeedback();
  animateStats();
  
  // Registrar Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/scripts/sw.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration.scope);
      })
      .catch(error => {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  }
});