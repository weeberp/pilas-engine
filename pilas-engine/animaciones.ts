class Animaciones {
  pilas: Pilas;
  animaciones = {};

  constructor(pilas: Pilas) {
    this.pilas = pilas;
  }

  crear_animacion(
    actor: Actor,
    nombre_de_la_animacion: string,
    cuadros: any[],
    velocidad: number
  ) {
    let nombre = `${actor.id}-${nombre_de_la_animacion}`;

    if (!this.animaciones[nombre]) {
      let frames = cuadros.map(cuadro => {
        if (this.pilas.imagenes_precargadas.indexOf(cuadro) === -1) {
          throw Error(
            `No se puede crear la animcación "${nombre_de_la_animacion}"\nEl cuadro ${cuadro} no existe.`
          );
        }

        if (cuadro.indexOf(":") > -1) {
          return {
            key: cuadro.split(":")[0],
            frame: cuadro.split(":")[1]
          };
        } else {
          return { key: cuadro };
        }
      });

      let animacion = this.pilas.modo.anims.create({
        key: nombre,
        frames: frames,
        frameRate: velocidad,
        repeat: -1
      });

      this.animaciones[nombre] = animacion;
    }
  }

  existe_animacion(actor, nombre) {
    let animacion = `${actor.id}-${nombre}`;
    return this.animaciones[animacion] !== undefined;
  }
}
