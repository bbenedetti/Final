$ ( document ).ready( function(){
 console.log('DOM listo');



 let mouse = new THREE.Vector2(-1000,-1000);

 var scene = new THREE.Scene();
 var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
 var renderer = new THREE.WebGLRenderer({ alpha: true } );
 renderer.setSize( window.innerWidth, window.innerHeight );
 $("body").append( renderer.domElement );

 let light = new THREE.PointLight( 0xffffff, 1, 300 );
 light.position.set( 0, 0, 20 );
 scene.add( light );

 let geometry = new THREE.TorusGeometry( 2.5, 1, 24,34);
 geometry.computeFlatVertexNormals();
 let material = new THREE.MeshLambertMaterial( { color:0x3621df,  wireframe:true} );
 let bola = new THREE.Mesh( geometry, material );
 scene.add( bola );

 let geometry2 = new THREE.TorusGeometry( 3, 0.6, 10,24);
 geometry2.computeFlatVertexNormals();
 let material2 = new THREE.MeshLambertMaterial( { color:0xd237d1,  wireframe:true} );
 let bola2 = new THREE.Mesh( geometry2, material2 );
 scene.add( bola2 );

scene.add(camera);
 camera.position.z = 9;
 camera.position.y = 1;

 let contenedor = new THREE.Object3D();
 scene.add( contenedor );

let contenedorDibujo = new THREE.Object3D();
scene.add( contenedorDibujo);


       function animate(){
       requestAnimationFrame( animate );
       renderer.render( scene, camera );


       bola.rotation.z += 0.005;
       bola2.rotation.z += 0.009;
       bola2.rotation.y = 90;
       bola2.position.y = 2;
       //light.position.y -= 0.01;

       for( let i = 0; i < bola.geometry.vertices.length; i++ ){
        // bola.geometry.vertices[ i ].x += ( -0.02 + (Math.random() * 0.04 ) );
         bola.geometry.vertices[ i ].y += ( -0.02 + (Math.random() * 0.04 ) );
        // bola.geometry.vertices[ i ].z += ( -0.02 + (Math.random() * 0.04 ) );
       }
       bola.geometry.verticesNeedUpdate = true;

       for( let i = 0; i < contenedor.children.length; i++ ){
         contenedor.children[ i ].position.x = bola.geometry.vertices[ i ].x;
         contenedor.children[ i ].position.y = bola.geometry.vertices[ i ].y;
         contenedor.children[ i ].position.z = bola.geometry.vertices[ i ].z;
       }

       for( let i = 0; i < bola2.geometry.vertices.length; i++ ){
         bola2.geometry.vertices[ i ].x += ( -0.01 + (Math.random() * 0.02 ) );
        // bola2.geometry.vertices[ i ].y += ( -0.02 + (Math.random() * 0.04 ) );
        // bola.geometry.vertices[ i ].z += ( -0.02 + (Math.random() * 0.04 ) );
       }
       bola2.geometry.verticesNeedUpdate = true;

       for( let i = 0; i < contenedor.children.length; i++ ){
         contenedor.children[ i ].position.x = bola2.geometry.vertices[ i ].x;
         contenedor.children[ i ].position.y = bola2.geometry.vertices[ i ].y;
         contenedor.children[ i ].position.z = bola2.geometry.vertices[ i ].z;
       }

       renderer.render( scene, camera );


     }
     animate();

let isPressed = false;


 $( window ).on( 'mousemove', function( e ){
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    camera.position.x = mouse.x*6;
    camera.position.y = mouse.y*6;
    camera.lookAt(0, 0, 0, );


if ( isPressed ){

  let geometry2 = new THREE.BoxGeometry(Math.abs(mouse.x),2);
  let color2 = new THREE.Color("rgb("+Math.round( Math.abs(mouse.x) * 255) + "," + Math.round(Math.abs(mouse.y) * 25) + ", 255)");
  let material2 = new THREE.MeshLambertMaterial({ color: color2, transparent: true, opacity: 0.2} );
  let box = new THREE.Mesh( geometry2, material2 );


  var vector = new THREE.Vector3(mouse.x, mouse.y, 2);
  vector.unproject( camera );
  var dir = vector.sub( camera.position ).normalize();
  var distance = - camera.position.z / dir.z;
  var pos = camera.position.clone().add(dir.multiplyScalar( distance ));
  box.position.copy(pos);
  box.rotation.y = 90;
  contenedorDibujo.add(box);
}

  });

 $(window).on('mousedown', function(e){

   isPressed = true;
 });

 $(window).on('mouseup', function(e){

   isPressed = false;
 });




  });
