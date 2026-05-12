/**
 * Unidad 6 — 6.3.2: ficha reutilizable para una foto de la galería.
 * props.foto es una instancia de la clase Foto.
 */
const Ficha = (props) => {
  const foto = props.foto;
  return (
    <div className="ficha" id={foto.id}>
      <h4>{foto.titulo}</h4>
      <p>{foto.descripcion}</p>
      <figure className="elemento-foto">
        <img src={`/images/${foto.url}`} alt={foto.alt} width={280} height={180} />
      </figure>
    </div>
  );
};

export default Ficha;
