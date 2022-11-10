import './style.css'
import * as THREE from 'three'
//library GSAP -> more complex animation
import gsap from 'gsap';
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//Time
//let time = Date.now(); //let because it needs to be updated

//Clock
//const clock = new THREE.Clock();

gsap.to(mesh.position, {duration: 1, delay: 1, x: 2}) //what you are going to animate
//doesnt have to call gsap. 


//Animations
//want this function to be called every frame
const tick = () => {
    //Clock
    //const elapsedTime = clock.getElapsedTime();

    //Time
    //const currentTime = Date.now() //current timestamp

    //const deltaTime = currentTime - time;
    //time = currentTime;

    //update object
    //mesh.position.x -= 0.01;
    //mesh.position.y += 0.01;
    //mesh.rotation.y += 0.001 * deltaTime; //the object will be rotating with the same rate on any computer
    
    /*
    mesh.position.y = Math.sin(elapsedTime);
    mesh.position.x = Math.cos(elapsedTime); //object move in circle
    */
    
    /*
    camera.position.y = Math.sin(elapsedTime);
    camera.position.x = Math.cos(elapsedTime);
    camera.lookAt(mesh.position);
    */

    //render
    renderer.render(scene, camera) // still needs render for gsap
    window.requestAnimationFrame(tick) //you just call the function
}

tick() // always remember to call this function once