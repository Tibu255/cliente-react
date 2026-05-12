/**
 * Unidad 7 — 7.1 Closures: objeto MsgBox del PDF.
 * delayedShowMsg cierra sobre `self` para ver msg fuera del flujo inmediato de showMsg.
 */
export default function ClosuresEjemplo() {
  const ejecutar = () => {
    const MsgBox = {
      msg: null,
      setMsg(msg) {
        this.msg = msg;
      },
      showMsg() {
        const self = this;
        function delayedShowMsg() {
          window.alert(self.msg);
        }
        window.setTimeout(delayedShowMsg, 800);
      },
    };
    MsgBox.setMsg("Hola, mundo con closures");
    MsgBox.showMsg();
  };

  return (
    <button type="button" onClick={ejecutar}>
      Probar MsgBox + closure (alert tras ~0,8 s)
    </button>
  );
}
