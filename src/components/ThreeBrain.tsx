import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeBrain() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Create Scene
    const scene = new THREE.Scene();

    // Create Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 15;

    // Create Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all brain elements
    const brainGroup = new THREE.Group();
    scene.add(brainGroup);

    // Generate Brain Node Coordinates (Approximate bilateral lobular structures in 3D)
    const particleCount = 280;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const nodePoints: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Determine left or right lobe (-1 or 1)
      const lobe = Math.random() > 0.5 ? 1 : -1;
      
      // Cybernetic Brain Parametric math shape: approximate lobular sphere with indents
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI;
      
      // Radius of general lobes with cerebral wrinkling effect
      const wrinkling = 0.15 * Math.sin(8 * u) * Math.cos(8 * v);
      const r = 3.5 * (1 + wrinkling);

      // Distribute points into left and right hemispheres (lobes) with separation
      const x = (r * Math.sin(v) * Math.cos(u)) * 1.1 + (lobe * 0.4);
      const y = (r * Math.sin(v) * Math.sin(u)) * 0.9;
      const z = (r * Math.cos(v)) * 0.75;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      nodePoints.push(new THREE.Vector3(x, y, z));

      // Color coding (Primary: Neon Cyan, Secondary: Electric Purple)
      const isNeonCyan = Math.random() > 0.4;
      const color = new THREE.Color(isNeonCyan ? "#00E5FF" : "#7B2FF7");
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Neural Nodes Material
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, pointsMaterial);
    brainGroup.add(points);

    // Create Neural Fibers (Lines connecting close nodes)
    const lineIndices: number[] = [];
    const maxConnectionDistance = 1.6;

    for (let i = 0; i < particleCount; i++) {
      const p1 = nodePoints[i];
      let connections = 0;
      // Connect each point to its nearest neighbors within max distance (cap connections to avoid spiderweb overload)
      for (let j = i + 1; j < particleCount; j++) {
        if (connections >= 3) break;
        const p2 = nodePoints[j];
        const dist = p1.distanceTo(p2);
        if (dist < maxConnectionDistance) {
          lineIndices.push(i, j);
          connections++;
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    lineGeometry.setIndex(lineIndices);

    // Cyberpunk Electric purple lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color("#7B2FF7"),
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    brainGroup.add(lines);

    // Glowing Core Orbs
    const coreCount = 3;
    const coreGroup = new THREE.Group();
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x00E5FF,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    });

    for (let m = 0; m < coreCount; m++) {
      const size = 0.8 + m * 0.7;
      const coreGeo = new THREE.SphereGeometry(size, 16, 16);
      const coreMesh = new THREE.Mesh(coreGeo, coreMaterial);
      coreMesh.position.set((m - 1) * 0.8, Math.sin(m) * 0.5, 0);
      coreGroup.add(coreMesh);
    }
    brainGroup.add(coreGroup);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00E5FF, 1.2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Mouse movement interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      targetRotationY = mouseX * 0.4;
      targetRotationX = mouseY * 0.4;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop uses GSAP ease/lerping concepts natively
    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth rotate towards target mouse rotation (lerp)
      brainGroup.rotation.y += (targetRotationY - brainGroup.rotation.y) * 0.05;
      brainGroup.rotation.x += (targetRotationX - brainGroup.rotation.x) * 0.05;

      // Base auto constant idle spin
      brainGroup.rotation.y += 0.003;
      brainGroup.rotation.z = Math.sin(elapsedTime * 0.4) * 0.08;

      // Pulse glows and points size over time
      pointsMaterial.size = 0.14 + Math.sin(elapsedTime * 2.5) * 0.03;
      lineMaterial.opacity = 0.22 + Math.abs(Math.sin(elapsedTime * 1.5)) * 0.15;

      // Pulsing cores
      coreGroup.scale.setScalar(1 + Math.sin(elapsedTime * 2) * 0.12);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      pointsMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full relative cursor-pointer flex items-center justify-center min-h-[300px] md:min-h-[420px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Pulsing halo backdrops */}
        <div className={`w-48 h-48 rounded-full bg-neon-cyan/8 filter blur-3xl transition-transform duration-1000 ${hovered ? "scale-125" : "scale-100"}`} />
        <div className="w-64 h-64 rounded-full bg-electric-purple/4 absolute filter blur-3xl animate-pulse" />
      </div>

      {hovered && (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-tech text-xs tracking-widest text-neon-cyan/80 bg-space-dark/80 px-2 py-1 border border-neon-cyan/20 rounded-md animate-pulse">
          INTERACTIVE NEURAL LAB
        </span>
      )}
    </div>
  );
}
