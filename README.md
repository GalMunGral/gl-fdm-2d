# GL FDM 2D

**Live demo:** https://hwenchi.github.io/gl-fdm-2d/

## Rhetorical Design

### Purpose

[gl-raytracer](https://github.com/hwenchi/gl-raytracer) demonstrated that a fragment shader can serve as a general-purpose parallel compute kernel. This project makes that point with a different application: real-time numerical simulation of the 2D wave equation using the finite difference method (FDM). Each grid cell is updated simultaneously by a separate fragment invocation — a degree of parallelism that worker threads cannot replicate. The goal is to show that WebGL is not limited to graphics.

### Strategy

The simulation runs continuously in the browser, with each rendered frame advancing the state by one time step. The audience observes the wave evolving live rather than watching a pre-computed result — making the real-time nature of the GPU computation self-evident.

## Technical Challenges

### Ping-Pong Framebuffer

The simulation state is stored in a pair of textures that alternate roles each frame. This is required on two grounds: a fragment shader cannot read and write the same texture simultaneously, and more fundamentally, the finite difference update must compute all new values from the previous state — using a partially updated grid would corrupt the numerical scheme by mixing old and new derivatives in the stencil.

### Stencil as Texture Lookups

The finite difference stencil requires the values of neighboring grid cells. In a fragment shader, neighbors are accessed by sampling the state texture at offset coordinates — each neighbor lookup becomes a texture fetch at a displaced UV position. This maps the spatial stencil naturally onto the texture sampling model, with periodic boundary conditions implemented via modular arithmetic on the fragment coordinates.