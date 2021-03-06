var camera;
var scene;
var renderer;
var cubeMesh;
var sphereCenter

var clock;
var deltaTime;
 
var particleSystem;
 
init();
animate();
 
function init() {
 
    clock = new THREE.Clock(true);
     
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 50;
     
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, -1, 1 ).normalize();
    scene.add(light);
 
    //var geometry = new THREE.CubeGeometry( 10, 10, 10);  
    //var material = new THREE.MeshPhongMaterial( { color: 0x0033ff, specular: 0x555555, shininess: 30 } );
	
	//var geometry = new THREE.SphereGeometry( 5, 32, 32 );
	var geometry = new THREE.SphereGeometry(9, 9, 8, 0, 6.3, 0, 3.3);
	var material = new THREE.MeshPhongMaterial( { color: 0xFFFFCC, specular: 0x555555, shininess: 100 } );
	sphereCenter = new THREE.Mesh( geometry, material );
	sphereCenter.position.z = -30;
	scene.add(sphereCenter);


    // cubeMesh = new THREE.Mesh(geometry, material );
    // cubeMesh.position.z = -30;
    // scene.add( cubeMesh );

	particleSystem = createParticleSystem();
  	scene.add(particleSystem);
      
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
 
    window.addEventListener( 'resize', onWindowResize, false );
         
    render();
}

function createParticleSystem() {
     
    // The number of particles in a particle system is not easily changed.
    var particleCount = 2000;
     
    // Particles are just individual vertices in a geometry
    // Create the geometry that will hold all of the vertices
    var particles = new THREE.Geometry();
 
    // Create the vertices and add them to the particles geometry
    for (var p = 0; p < particleCount; p++) {
     
        // This will create all the vertices in a range of -200 to 200 in all directions
        var x = Math.random() * 400 - 200;
        var y = Math.random() * 400 - 200;
        var z = Math.random() * 400 - 200;
               
        // Create the vertex
        var particle = new THREE.Vector3(x, y, z);
         
        // Add the vertex to the geometry
        particles.vertices.push(particle);
    }
 
    // Create the material that will be used to render each vertex of the geometry
    var particleMaterial = new THREE.PointsMaterial(
            {color: 0xffffff, 
             size: 4,
             map: THREE.ImageUtils.loadTexture("js/images/particle.png"),
             blending: THREE.AdditiveBlending,
             transparent: true,
            });
      
    // Create the particle system
    particleSystem = new THREE.Points(particles, particleMaterial);
 
    return particleSystem;  
}

 
function animateParticles() {
    var verts = particleSystem.geometry.vertices;
    for(var i = 0; i < verts.length; i++) {
        var vert = verts[i];
        if (vert.y < -200) {
            vert.y = Math.random() * 400 - 200;
        }
        vert.y = vert.y - (30 * deltaTime);
    }
    particleSystem.geometry.verticesNeedUpdate = true;
    particleSystem.rotation.y -= 1 * deltaTime;
     
}


function animate() {
    deltaTime = clock.getDelta();
     
    //cubeMesh.rotation.x += 1 * deltaTime;
    //cubeMesh.rotation.y += 2 * deltaTime;
   	sphereCenter.rotation.x += 1 * deltaTime;
   	sphereCenter.rotation.y += 2 * deltaTime;


    animateParticles();
    render();
    requestAnimationFrame( animate );
}



function render() {
    renderer.render( scene, camera );
}
 
 
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}