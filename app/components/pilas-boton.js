import Component from "@ember/component";
import { EKMixin } from "ember-keyboard";
import { getCode } from "ember-keyboard";
import { keyUp } from "ember-keyboard";
import { on } from "@ember/object/evented";
import { later } from "@ember/runloop";

/*

NOTA: la siguiente excepción espera a que se apruebe este pullrequest:

  - https://github.com/ember-cli/eslint-plugin-ember/pull/246
  - referencia: https://github.com/ember-cli/eslint-plugin-ember/issues/223

*/
/* eslint ember/no-on-calls-in-components: "off" */

export default Component.extend(EKMixin, {
  tagName: "",
  truncate: true,
  class: `
    boton
    pa2
    dib
    verdana f6 link pointer
    unselectable
  `,
  demora: 0,
  ejecutando: false,

  didInsertElement() {
    if (this.atajo) {
      this.set("keyboardActivated", true);
    }
  },

  cuando_suelta_tecla: on(keyUp(), function(event) {
    if (this.atajo) {
      if (this.atajo === getCode(event)) {
        this.accion();
      }
    }
  }),

  accion: () => {},

  actions: {
    ejecutar_accion() {
      if (this.demora) {
        this.set("ejecutando", true);

        later(() => {
          this.set("ejecutando", false);
          this.accion();
        }, this.demora * 1000);
      } else {
        this.accion();
      }
    }
  }
});
