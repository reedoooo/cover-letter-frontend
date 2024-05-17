// // import React, { useRef, useEffect } from 'react';
// // import * as THREE from 'three';
// // import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// // import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

// // function DocumentAnimation() {
// //   const mountRef = useRef(null);

// //   useEffect(() => {
// //     const currentRef = mountRef.current;
// //     const { clientWidth: width, clientHeight: height } = currentRef;

// //     // Scene, Camera, and Renderer
// //     const scene = new THREE.Scene();
// //     const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
// //     camera.position.set(0, 0, 100);
// //     const renderer = new THREE.WebGLRenderer();
// //     renderer.setSize(width, height);
// //     currentRef.appendChild(renderer.domElement);

// //     // Controls
// //     const controls = new OrbitControls(camera, renderer.domElement);

// //     // Lighting
// //     const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
// //     scene.add(ambientLight);
// //     const pointLight = new THREE.PointLight(0xffffff, 0.8);
// //     camera.add(pointLight);
// //     scene.add(camera);

// //     // Font Loader
// //     const loader = new FontLoader();
// //     loader.load(
// //       'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
// //       function (font) {
// //         console.log(font);
// //         const coverLetterText =
// //           // eslint-disable-next-line max-len
// //           'Dear Hiring Manager,\nI am excited to apply for the role at your company.\nI believe my skills and background make me a good fit.\nThank you for considering my application.\nSincerely,\n[Your Name]';
// //         const matLite = new THREE.MeshBasicMaterial({
// //           color: 0x000000, // Ensure color contrast
// //           transparent: true,
// //           opacity: 0.8,
// //           side: THREE.DoubleSide,
// //         });

// //         const shapes = font.generateShapes(coverLetterText, 0.5);
// //         const geometry = new THREE.ShapeGeometry(shapes);
// //         geometry.computeBoundingBox();
// //         const xMid =
// //           -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
// //         geometry.translate(xMid, 0, 0);
// //         const textMesh = new THREE.Mesh(geometry, matLite);
// //         textMesh.position.set(0, 0, 0); // Centered in the scene

// //         textMesh.position.y = 0;
// //         scene.add(textMesh);
// //         // Animate text appearance
// //         // let currentLength = 0;
// //         // const maxLength = coverLetterText.length;
// //         // Instead of animating opacity (which won't show text appearing letter by letter), use a visible length
// //         let visibleLength = 0;
// //         const interval = setInterval(() => {
// //           visibleLength++;
// //           textMesh.geometry = new THREE.ShapeGeometry(
// //             font.generateShapes(coverLetterText.slice(0, visibleLength), 0.5)
// //           );
// //           if (visibleLength >= coverLetterText.length) clearInterval(interval);
// //         }, 100);
// //       }
// //     );

// //     // Animation Loop
// //     const animate = function () {
// //       requestAnimationFrame(animate);
// //       controls.update();
// //       renderer.render(scene, camera);
// //     };

// //     animate();

// //     return () => {
// //       currentRef.removeChild(renderer.domElement);
// //     };
// //   }, []);

// //   return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
// // }

// // export default DocumentAnimation;
// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
// import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// function DocumentAnimation() {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     const currentRef = mountRef.current;
//     const { clientWidth: width, clientHeight: height } = currentRef;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//     camera.position.z = 50;
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(width, height);
//     currentRef.appendChild(renderer.domElement);

//     const controls = new OrbitControls(camera, renderer.domElement);

//     // Lighting
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
//     scene.add(ambientLight);
//     const pointLight = new THREE.PointLight(0xffffff, 0.8);
//     camera.add(pointLight);
//     scene.add(camera);

//     // A4 paper geometry
//     const paperGeometry = new THREE.PlaneGeometry(
//       (210 / 1000) * 100,
//       (297 / 1000) * 100
//     ); // Scale to match the scene
//     const paperMaterial = new THREE.MeshBasicMaterial({
//       color: 0xffffff,
//       side: THREE.DoubleSide,
//     });
//     const paper = new THREE.Mesh(paperGeometry, paperMaterial);
//     paper.rotation.x = -Math.PI / 2;
//     scene.add(paper);

//     // Font Loader
//     const loader = new FontLoader();
//     loader.load(
//       'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
//       function (font) {
//         const matLite = new THREE.MeshBasicMaterial({
//           color: 0x000000,
//           transparent: true,
//           opacity: 1,
//           side: THREE.DoubleSide,
//         }); // eslint-disable-next-line max-len
//         const coverLetterText =
//           // eslint-disable-next-line max-len
//           'Dear Hiring Manager,\n\nI am excited to apply for the role at your company.\nI believe my skills and background make me a good fit.\nThank you for considering my application.\n\nSincerely,\n[Your Name]';
//         let currentLength = 0;
//         const maxLength = coverLetterText.length;
//         const animateText = () => {
//           if (currentLength <= maxLength) {
//             const textGeometry = new TextGeometry(
//               coverLetterText.slice(0, currentLength),
//               {
//                 font: font,
//                 size: 4,
//                 height: 0,
//                 depth: 0.1,
//                 curveSegments: 12,
//               }
//             );
//             textGeometry.center();
//             const textMesh = new THREE.Mesh(textGeometry, matLite);
//             textMesh.position.set(0, 10, 10);
//             scene.add(textMesh);
//             currentLength++;
//             setTimeout(animateText, 100);
//           }
//         };
//         animateText();
//       }
//     );
//     // loader.load(
//     //   'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
//     //   function (font) {
//     //     const geometry = new TextGeometry('Hello three.js!', {
//     //       font: font,
//     //       size: 5,
//     //       height: 0.2,
//     //     });
//     //     const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
//     //     const mesh = new THREE.Mesh(geometry, material);
//     //     scene.add(mesh);
//     //     console.log('Text added to scene');
//     //   }
//     // );

//     function animate() {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     }
//     animate();

//     return () => {
//       currentRef.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
// }

// export default DocumentAnimation;
