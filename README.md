# WebGL_Chess

Chessboard -

	a diffuse plane, planar square, or box (pick one) with an 8x8 checkerboard pattern. Materials of adjacent squares must be recognisably different, but not necessarily white and black (use procedural texturing, i.e. make material properties depend on the position of the surface point).



Pawns -

	Composed of clipped quadrics, including a cone and a sphere.



Bishops - 

	Built from clipped quadrics. They have a see-through hole in them, with the hole's inner wall also modelled and visible.



Kings - 

	Built from clipped quadrics, including a paraboloid for the crown.



Queens - 

	Built from clipped quadrics, including a hyperboloid for the gown.

	A comparison of a scalar-function-of-position (similar to the noise function used in procedural solid texturing) against a threshold is used to discard ray hits on the queens' gown, producing a lace-like, openwork appearance. Use a regular pattern rather than random noise.



Rooks - 

	Built using quadrics clipped by multiple (at least two per quadric) clippers.



Sun -

	Implement a directional light source that contributes to the illumination of all objects with non-ideal (Lambertian or Phong-Blinn) BRDFs. Objects should cast shadows on one another (except for ideally smooth objects that do not ).



Gloria -

	Some pieces (perhaps the bishops) should have (omnidirectional, isotropic) point lights over them. Feel free to make them colorful. These should contribute to the illumination of all objects with non-ideal (Lambertian of Phong-Blinn) BRDFs. Objects should cast shadows on one another.



Silver -

	Some pieces (perhaps the Rooks) reflect light as ideally smooth surfaces, with a constant reflectance of one, on all wavelengths. Recursive ray tracing is required.



Gold -

	Some pieces (perhaps the Kings) reflect light as ideally smooth surfaces. The reflectance is computed using the Szirmay approximation to the Fresnel equations. Recursive ray tracing is required.



Ebony and Ivory (requires Sun or Gloria) -

	Some pieces (perhaps the pawns) are made of plastic (use diffuse + Phong-Blinn BRDF).



Wood (requires Chessboard) -

	Use procedural solid texturing, perturbing a striped pattern with a noise offset, to give your chessboard the appearance of wood (or marble).



Normal mapping (requires 'Ebony and Ivory' or 'Silver' or 'Gold') -

	Some pieces (with Phong-Blinn and/or ideally reflective shading) use the gradient of a procedural noise function to perturb the normals, giving the surface a dented, wavy, or bumpy appearance.



Environment -

	Rays that do not hit any object take their radiance from an environment map texture (for group B), or a procedural function of the direction (group A).



Animation -

	if your implementation is real-time (group B), animate at least two different objects. If your implementation in not real-time (group A), render a short sequence of images and compose them into a GIF file manually --- a single animated object is enough.

