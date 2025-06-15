tsParticles.load("tsparticles", {
  fullScreen: { zIndex: -1 },
  particles: {
    number: { value: 20 },
    shape: {
      type: "image",
      image: {
        src: "assets/images/atomic-bond.png",
        width: 32,
        height: 32
      }
    },
    size: { value: 12 },
    opacity: { value: 0.3 },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "out"
      }
    }
  }
});