/**
 * Unidad 5 — 5.5.3 Ejemplo: visor de imágenes (material DWEC / CIFP Avilés).
 *
 * El componente recibe un array de NOMBRES de fichero que deben existir en `public/images`.
 * En el navegador esas rutas se sirven desde la raíz del sitio: `/images/nombreFichero`.
 */

import { useEffect, useRef } from "react";
import "./Visor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faForward, faBackward } from "@fortawesome/free-solid-svg-icons";

/**
 * props.imagenes → array de strings, p. ej. ["imagen1.png", "imagen2.png", ...]
 */
const Visor = (props) => {
  /**
   * En el PDF aparece `let indiceActual = 0` dentro del componente.
   * Eso se REINICIA en cada render de React, así que el índice no sería fiable.
   * Aquí usamos useRef para guardar el índice entre renders (misma idea que el ref del <img>).
   */
  const indiceRef = useRef(0);

  /**
   * ref del elemento <img> del DOM real.
   * Así podemos cambiar `src` sin guardar la URL en el estado de React (enfoque del temario).
   */
  const visorRef = useRef(null);

  /** Copia local del array que viene del padre (props). */
  const imagenes = props.imagenes;

  /**
   * 4) Muestra en el visor la imagen correspondiente al índice actual.
   *    Solo actúa si ya existe el nodo img en el DOM (`visorRef.current`).
   */
  const mostrarImagen = () => {
    if (!visorRef.current || !imagenes?.length) return;

    const nombreFichero = imagenes[indiceRef.current];
    const path = "/images/" + nombreFichero;
    visorRef.current.src = path;
  };

  /** Siguiente: avanza índice; al pasar del último, vuelve al 0 (circular). */
  const siguiente = () => {
    indiceRef.current += 1;
    if (indiceRef.current === imagenes.length) indiceRef.current = 0;
    mostrarImagen();
  };

  /** Anterior: retrocede; si estás en 0, salta al último (circular). */
  const anterior = () => {
    indiceRef.current -= 1;
    if (indiceRef.current === -1) indiceRef.current = imagenes.length - 1;
    mostrarImagen();
  };

  /** Primera imagen del array (índice 0). */
  const primera = () => {
    indiceRef.current = 0;
    mostrarImagen();
  };

  /** Última imagen del array. */
  const ultima = () => {
    indiceRef.current = imagenes.length - 1;
    mostrarImagen();
  };

  /**
   * 6) En el PDF se usa `setTimeout(..., 0)` en el cuerpo del componente para la primera pintura.
   *    Eso se ejecutaría en CADA render; aquí usamos useEffect: una sola vez al montar
   *    (y otra vez si cambia la lista `imagenes`).
   */
  useEffect(() => {
    indiceRef.current = Math.min(indiceRef.current, Math.max(0, imagenes.length - 1));
    mostrarImagen();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- misma lógica que el temario: solo re-sincronizar al cambiar la lista
  }, [imagenes]);

  /**
   * 7) Estructura: marco del visor + img (sin src en JSX: la asigna mostrarImagen)
   *    + botonera con los mismos iconos que en el PDF (Font Awesome).
   */
  return (
    <div className="visor">
      <img ref={visorRef} className="imagen" alt="Imagen seleccionada en el visor" />
      <br />
      <div className="botones">
        <button type="button" onClick={siguiente} title="Siguiente">
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button type="button" onClick={ultima} title="Última">
          <FontAwesomeIcon icon={faForward} />
        </button>
        <button type="button" onClick={anterior} title="Anterior">
          <FontAwesomeIcon icon={faPlay} className="flip-horizontal" />
        </button>
        <button type="button" onClick={primera} title="Primera">
          <FontAwesomeIcon icon={faBackward} />
        </button>
      </div>
    </div>
  );
};

export default Visor;
