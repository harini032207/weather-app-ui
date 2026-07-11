/**
 * WeatherSphere Landing Page Logic
 * Senior UI/UX Implementation
 */

let scene, camera, renderer, globe, clouds, starField;
let isEntering = false;

function init() {
    // 1. Scene Setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('globe-container').appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // 3. Create Earth Globe
    const loader = new THREE.TextureLoader();
    
    // High-resolution textures
    const earthGeometry = new THREE.SphereGeometry(5, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
        map: loader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'),
        bumpMap: loader.load('https://unpkg.com/three-globe/example/img/earth-topology.png'),
        bumpScale: 0.05,
        specularMap: loader.load('https://unpkg.com/three-globe/example/img/earth-water.png'),
        specular: new THREE.Color('grey')
    });
    
    globe = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(globe);

    // 4. Cloud Layer
    const cloudGeometry = new THREE.SphereGeometry(5.1, 64, 64);
    const cloudMaterial = new THREE.MeshPhongMaterial({
        map: loader.load('https://unpkg.com/three-globe/example/img/earth-clouds.png'),
        transparent: true,
        opacity: 0.5
    });
    clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);

    // 5. Starfield Particles
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = [];
    for(let i = 0; i < 6000; i++) {
        starPositions.push((Math.random() - 0.5) * 1000);
        starPositions.push((Math.random() - 0.5) * 1000);
        starPositions.push((Math.random() - 0.5) * 1000);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
    starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Resize Event
    window.addEventListener('resize', onWindowResize, false);

    // Raycaster for Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener('mousedown', (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects([globe]);

        if (intersects.length > 0 && !isEntering) {
            handleGlobeClick();
        }
    });

    animate();
}

function handleGlobeClick() {
    isEntering = true;
    
    // Fade out UI
    document.querySelectorAll('.w-icon, .footer-text, header').forEach(el => {
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        el.style.transition = 'opacity 0.8s ease';
    });

    // Show Loading Screen
    setTimeout(() => {
        document.getElementById('loading-overlay').classList.remove('hidden');
    }, 500);

    // Cinematic Camera Zoom
    const zoomIn = () => {
        if(camera.position.z > 6.5) {
            camera.position.z -= 0.1;
            globe.rotation.y += 0.05; // Spin faster
            clouds.rotation.y += 0.06;
            requestAnimationFrame(zoomIn);
        }
    };
    zoomIn();
    // Redirect to Country Selection after animation
    setTimeout(() => {
        window.location.href = "../Country-Selection/index.html";
    }, 3500);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    if (!isEntering) {
        globe.rotation.y += 0.002;
        clouds.rotation.y += 0.0025;
        
        // Gentle floating
        const time = Date.now() * 0.001;
        globe.position.y = Math.sin(time) * 0.1;
        clouds.position.y = globe.position.y;
    }

    renderer.render(scene, camera);
}

// Start Application
init();