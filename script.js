// ========================================
    // Mobile Navigation Toggle
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a, .cert-link, .cv-download, .project-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
        // Keyboard support: Enter/Space on non-anchor elements if needed
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });

    // ========================================
    // Smooth Scroll for Navigation Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const navbar = document.querySelector('.navbar');

            if (target) {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const sectionHeading = target.querySelector('.section-title');
                const anchorElement = sectionHeading || target;
                const anchorTop = window.scrollY + anchorElement.getBoundingClientRect().top;
                const headingOffset = 24;
                const maxScrollTop = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

                window.scrollTo({
                    top: Math.min(Math.max(0, anchorTop - navbarHeight - headingOffset), maxScrollTop),
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Active Navigation Highlight on Scroll
    // ========================================
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // ========================================
    // Navbar Background on Scroll
    // ========================================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // ========================================
    // Intersection Observer for Animations
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.skill-category, .project-card, .certificate-card, .achievement-card, .training-card, .timeline-item').forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // Add visible class CSS via JS (fallback)
    // ========================================
    const style = document.createElement('style');
    style.textContent = `
        .skill-category, .project-card, .certificate-card, .achievement-card, .training-card, .timeline-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .skill-category.visible, .project-card.visible, .certificate-card.visible, 
        .achievement-card.visible, .training-card.visible, .timeline-item.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-item {
            transition-delay: 0.1s;
        }
        
        .timeline-item:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .timeline-item:nth-child(3) {
            transition-delay: 0.3s;
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // Parallax Effect for Hero Section
    // ========================================
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });

    // ========================================
    // Certificate Card Click Handler
    // ========================================
    document.querySelectorAll('.certificate-card').forEach(card => {
        card.addEventListener('click', () => {
            // Add a click animation
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });

    // ========================================
    // Skill Tag Animation on Hover
    // ========================================
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(3deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // ========================================
    // Contact Link Animation
    // ========================================
    document.querySelectorAll('.contact-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.querySelector('i').style.transform = 'scale(1.2)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.querySelector('i').style.transform = 'scale(1)';
        });
    });

    // ========================================
    // Theme Toggle Functionality
    // ========================================
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Check for saved theme preference or default to system
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.classList.toggle('active', savedTheme === 'light');
        themeToggle.querySelector('i').className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            themeToggle.classList.toggle('active');
            const icon = themeToggle.querySelector('i');
            icon.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
            
            // Animate transition
            document.body.classList.add('theme-transition');
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 500);
        });
    }

    // ========================================
    // Skill Progress Bars Animation on Scroll
    // ========================================
    const progressBars = document.querySelectorAll('.skill-progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('style').match(/--progress:\s*(\d+)%/)[1];
                entry.target.style.width = progress + '%';
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // ========================================
    // Particles Canvas Animation
    // ========================================
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        const particlesArray = [];
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height * 0.8;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5;
                this.color = `hsl(${Math.random() * 60 + 240}, 70%, 60%)`;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.2) this.size -= 0.01;
                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height) {
                    this.x = Math.random() * canvas.width;
                    this.y = 0;
                }
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function handleParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();

                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.strokeStyle = 'rgba(99, 102, 241, ' + (1 - distance / 100) + ')';
                        ctx.lineWidth = distance / 100;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                    }
                }

                if (particlesArray[i].size <= 0.2) {
                    particlesArray.splice(i, 1);
                    i--;
                }
            }
        }

        function animateParticles() {
            handleParticles();
            if (particlesArray.length < 80) {
                particlesArray.push(new Particle());
            }
            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }

    // ========================================
    // Initialize - Add loaded class for page load animation
    // ========================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            document.querySelector('.hero-content').style.opacity = '1';
        }, 100);
    });

    // Add body loaded styles
    const loadStyle = document.createElement('style');
    loadStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadStyle);

    // ========================================
    // CV Modal Viewer + Download Handler
    // ========================================

    function initCVModal() {
        const viewBtn = document.getElementById('view-cv-btn');
        const modal = document.getElementById('cv-modal');
        const overlay = document.querySelector('.cv-modal-overlay');
        const closeBtn = document.getElementById('cv-modal-close');
        const cvSelect = document.getElementById('cv-select');
        const zoomOutBtn = document.getElementById('cv-zoom-out');
        const zoomInBtn = document.getElementById('cv-zoom-in');
        const zoomLevelText = document.getElementById('cv-zoom-level');
        const pdfPages = document.getElementById('cv-pdf-pages');
        const fallbackViewer = document.getElementById('cv-viewer-fallback');
        const viewerContainer = document.querySelector('.cv-viewer-container');
        const downloadBtn = document.getElementById('cv-download-current');
        const loader = document.getElementById('cv-loader');

        if (!viewBtn || !modal || !pdfPages || !fallbackViewer || !viewerContainer || !zoomOutBtn || !zoomInBtn || !zoomLevelText) return;

        let currentCV = 'DhruvCV.pdf';
        let lastFocusedElement = null;
        let currentRenderToken = 0;
        let zoomPercent = 80;
        const ZOOM_MIN = 50;
        const ZOOM_MAX = 150;
        const ZOOM_STEP = 5;
        let pdfJsReady = Boolean(window.pdfjsLib);
        let pdfJsLoadingPromise = null;

        const setLoader = (isLoading) => {
            loader.style.display = isLoading ? 'flex' : 'none';
        };

        const setLoaderMessage = (message) => {
            loader.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${message}`;
        };

        const updateActionLinks = (file, label) => {
            downloadBtn.href = file;
            downloadBtn.setAttribute('download', label.replace(/\s+/g, '_'));
        };

        const getSelectedLabel = () => cvSelect.options[cvSelect.selectedIndex].text;

        const updateZoomUI = () => {
            zoomLevelText.textContent = `${zoomPercent}%`;
            zoomOutBtn.disabled = zoomPercent <= ZOOM_MIN;
            zoomInBtn.disabled = zoomPercent >= ZOOM_MAX;
        };

        const ensurePdfJsLoaded = async () => {
            if (window.pdfjsLib) {
                pdfJsReady = true;
                return true;
            }

            if (pdfJsLoadingPromise) {
                return pdfJsLoadingPromise;
            }

            const sources = [
                'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.min.js',
                'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.8.69/build/pdf.min.js'
            ];

            pdfJsLoadingPromise = (async () => {
                for (const src of sources) {
                    try {
                        await new Promise((resolve, reject) => {
                            const script = document.createElement('script');
                            script.src = src;
                            script.async = true;
                            script.onload = resolve;
                            script.onerror = reject;
                            document.head.appendChild(script);
                        });

                        if (window.pdfjsLib) {
                            pdfJsReady = true;
                            return true;
                        }
                    } catch (error) {
                        // Try the next CDN source.
                    }
                }

                pdfJsReady = false;
                return false;
            })();

            const result = await pdfJsLoadingPromise;
            pdfJsLoadingPromise = null;
            return result;
        };

        const applyZoom = () => {
            const pages = pdfPages.querySelectorAll('.cv-pdf-page');
            const zoomRatio = zoomPercent / 100;
            const isZoomedIn = zoomPercent > 100;

            pdfPages.style.alignItems = isZoomedIn ? 'flex-start' : 'center';

            pages.forEach((page) => {
                page.style.width = `${zoomPercent}%`;
                page.style.maxWidth = 'none';
                page.style.marginLeft = isZoomedIn ? '0' : 'auto';
                page.style.marginRight = isZoomedIn ? '0' : 'auto';
            });
        };

        const renderPdf = async (file) => {
            const renderToken = ++currentRenderToken;
            setLoader(true);
            setLoaderMessage('Loading CV...');
            pdfPages.innerHTML = '';
            pdfPages.style.display = 'flex';
            fallbackViewer.style.display = 'none';
            fallbackViewer.src = '';
            viewerContainer.scrollTop = 0;

            const hasPdfJs = await ensurePdfJsLoaded();

            if (!hasPdfJs) {
                pdfPages.style.display = 'none';
                fallbackViewer.style.display = 'block';
                fallbackViewer.src = `${file}#toolbar=0&navpanes=0&statusbar=0&messages=0&scrollbar=1&page=1&zoom=${zoomPercent}`;
                setLoader(false);
                return;
            }

            try {
                const loadingTask = window.pdfjsLib.getDocument({
                    url: file,
                    disableWorker: true
                });
                const pdf = await loadingTask.promise;

                if (renderToken !== currentRenderToken) {
                    return;
                }

                for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                    setLoaderMessage(`Rendering page ${pageNumber} of ${pdf.numPages}...`);
                    const page = await pdf.getPage(pageNumber);

                    if (renderToken !== currentRenderToken) {
                        return;
                    }

                    const textContent = await page.getTextContent();
                    const textItems = textContent.items.filter((item) => {
                        return typeof item.str === 'string' && item.str.trim().length > 0;
                    });
                    const hasVisibleText = textItems.length > 0;

                    if (!hasVisibleText) {
                        continue;
                    }

                    const unscaledViewport = page.getViewport({ scale: 1 });
                    const containerWidth = viewerContainer.clientWidth || pdfPages.clientWidth || 1;
                    const availableWidth = Math.max(containerWidth, 1);
                    const scale = availableWidth / unscaledViewport.width;
                    const viewport = page.getViewport({ scale });

                    const pageShell = document.createElement('div');
                    pageShell.className = 'cv-pdf-page';

                    let cropTop = 0;
                    if (pageNumber === 1) {
                        let minContentTop = viewport.height;

                        textItems.forEach((item) => {
                            const transformed = window.pdfjsLib.Util.transform(viewport.transform, item.transform);
                            const fontHeight = Math.max(12, Math.hypot(transformed[2], transformed[3]));
                            const itemTop = transformed[5] - fontHeight;
                            minContentTop = Math.min(minContentTop, itemTop);
                        });

                        if (Number.isFinite(minContentTop)) {
                            cropTop = Math.min(
                                Math.max(0, Math.floor(minContentTop - 24)),
                                Math.floor(viewport.height * 0.18)
                            );
                        }
                    }

                    const visibleHeight = Math.max(1, Math.floor(viewport.height - cropTop));
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d', { alpha: false });
                    const outputScale = window.devicePixelRatio || 1;

                    canvas.width = Math.floor(viewport.width * outputScale);
                    canvas.height = Math.floor(visibleHeight * outputScale);
                    canvas.style.width = `${viewport.width}px`;
                    canvas.style.height = `${visibleHeight}px`;

                    context.setTransform(outputScale, 0, 0, outputScale, 0, 0);
                    context.translate(0, -cropTop);

                    pageShell.appendChild(canvas);
                    pdfPages.appendChild(pageShell);

                    await page.render({
                        canvasContext: context,
                        viewport
                    }).promise;
                }

                applyZoom();
            } catch (error) {
                if (renderToken === currentRenderToken) {
                    pdfPages.innerHTML = '<div class="cv-pdf-page" style="padding: 2rem; color: var(--text-secondary); text-align: center;">Unable to load CV preview.</div>';
                    console.error('CV preview render failed:', error);
                }
            } finally {
                if (renderToken === currentRenderToken) {
                    setLoader(false);
                }
            }
        };

        const setActiveCV = async (file, shouldFocus = false) => {
            currentCV = file;
            cvSelect.value = file;
            updateActionLinks(currentCV, getSelectedLabel());
            updateZoomUI();
            await renderPdf(currentCV);

            if (shouldFocus) {
                cvSelect.focus();
            }
        };

        viewBtn.addEventListener('click', (e) => {
            e.preventDefault();
            lastFocusedElement = document.activeElement;
            zoomPercent = 80;
            updateZoomUI();
            modal.classList.add('active');
            document.body.classList.add('cv-modal-open');
            setActiveCV('DhruvCV.pdf', true);
            setTimeout(() => {
                closeBtn.focus();
            }, 150);
        });

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.classList.remove('cv-modal-open');
            currentRenderToken += 1;
            pdfPages.innerHTML = '';
            pdfPages.style.display = 'flex';
            fallbackViewer.src = '';
            fallbackViewer.style.display = 'none';
            setLoader(false);
            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('active') && e.key === 'Escape') {
                closeModal();
            }
        });

        cvSelect.addEventListener('change', async (e) => {
            await setActiveCV(e.target.value);
        });

        zoomOutBtn.addEventListener('click', async () => {
            zoomPercent = Math.max(ZOOM_MIN, zoomPercent - ZOOM_STEP);
            updateZoomUI();
            if (pdfJsReady && pdfPages.children.length > 0 && fallbackViewer.style.display !== 'block') {
                applyZoom();
            } else {
                await renderPdf(currentCV);
            }
        });

        zoomInBtn.addEventListener('click', async () => {
            zoomPercent = Math.min(ZOOM_MAX, zoomPercent + ZOOM_STEP);
            updateZoomUI();
            if (pdfJsReady && pdfPages.children.length > 0 && fallbackViewer.style.display !== 'block') {
                applyZoom();
            } else {
                await renderPdf(currentCV);
            }
        });

        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const link = document.createElement('a');
            link.href = currentCV;
            link.download = currentCV.replace('.pdf', '').replace(/ /g, '_');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Feedback
            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            downloadBtn.style.background = '#10b981';
            setTimeout(() => {
                downloadBtn.innerHTML = originalText;
                downloadBtn.style.background = '';
            }, 2000);
        });

        let resizeTimer = null;
        window.addEventListener('resize', () => {
            if (!modal.classList.contains('active') || !currentCV) return;
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                setActiveCV(currentCV);
            }, 180);
        });

        updateZoomUI();

        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusable = modal.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        });
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', initCVModal);

    // ========================================
    // EmailJS Contact Form Handler
    // ========================================
    function initContactForm() {
        // REPLACE THESE WITH YOUR EMAILJS CREDENTIALS
        const PUBLIC_KEY = 'pts2HPIZEIc8-XpsM';  // e.g. 'user_abc123def456'
        const SERVICE_ID = 'service_gaun3ad';   // e.g. 'service_xyz789'
        const TEMPLATE_ID = 'template_sjd5gno'; // e.g. 'template_uvw012'

        // Initialize EmailJS
        emailjs.init(PUBLIC_KEY);

        const form = document.getElementById('contact-form');
        const messageDiv = document.getElementById('form-message');

        if (!form) return;

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                user_name: document.getElementById('user_name').value,
                user_email: document.getElementById('user_email').value,
                user_subject: document.getElementById('user_subject').value || 'No Subject',
                message: document.getElementById('user_message').value
            };

            try {
                await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData);
                showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
            } catch (error) {
                console.error('EmailJS error:', error);
                showMessage('Failed to send message. Please try again or email directly.', 'error');
            }
        });

        function showMessage(text, type) {
            messageDiv.textContent = text;
            messageDiv.className = `form-message ${type}`;
            messageDiv.classList.remove('hidden');
            
            // Auto-hide success message
            if (type === 'success') {
                setTimeout(() => {
                    messageDiv.classList.add('hidden');
                }, 5000);
            }
        }

    }

    // Initialize contact form when DOM loads
    document.addEventListener('DOMContentLoaded', initContactForm);

