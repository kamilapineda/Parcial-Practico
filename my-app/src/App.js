import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

function App() {

  const dataNombres = [
    { id: 1, nombre: "Alan", apellido: "Brito", telefono: 123, direccion: "calle 1" },
  ];

  const [data, setData] = useState(dataNombres);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [nombreSeleccionado, setNombreSeleccionado] = useState({
    id: '',
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: ''
  });

  const seleccionarNombre=(elemento, caso)=>{
setNombreSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setNombreSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(nombre=>{
      if(nombre.id===nombreSeleccionado.id){
        nombre.nombre=nombreSeleccionado.nombre;
        nombre.apellido=nombreSeleccionado.apellido;
        nombre.telefono=nombreSeleccionado.telefono;
        nombre.direccion=nombreSeleccionado.direccion;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(nombre=>nombre.id!==nombreSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setNombreSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=nombreSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div className="App">
      <h2>Agenda de contactos</h2>
      <br />
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Telefono</th>
            <th>Direccion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.apellido}</td>
              <td>{elemento.telefono}</td>
              <td>{elemento.direccion}</td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarNombre(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarNombre(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>
{/* ------------------------------------------------------------------------------------------------------------------------------------------ */}
      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Contacto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={nombreSeleccionado && nombreSeleccionado.id}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={nombreSeleccionado && nombreSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>Apellido</label>
            <input
              className="form-control"
              type="text"
              name="apellido"
              value={nombreSeleccionado && nombreSeleccionado.apellido}
              onChange={handleChange}
            />
            <br />
            <label>Telefono</label>
            <input
              className="form-control"
              type="text"
              name="telefono"
              value={nombreSeleccionado && nombreSeleccionado.telefono}
              onChange={handleChange}
            />
            <br />
            <label>Direccion</label>
            <input
              className="form-control"
              type="text"
              name="direccion"
              value={nombreSeleccionado && nombreSeleccionado.direccion}
              onChange={handleChange}
            />
            <br />

          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar este contacto? {nombreSeleccionado && nombreSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar contacto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="numero"
              value={data[data.length-1].id+1}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={nombreSeleccionado ? nombreSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>Apellido</label>
            <input
              className="form-control"
              type="text"
              name="apellido"
              value={nombreSeleccionado ? nombreSeleccionado.apellido: ''}
              onChange={handleChange}
            />
            <br />

            <label>Telefono</label>
            <input
              className="form-control"
              type="text"
              name="telefono"
              value={nombreSeleccionado ? nombreSeleccionado.telefono: ''}
              onChange={handleChange}
            />
            <br />

            <label>Direccion</label>
            <input
              className="form-control"
              type="text"
              name="direccion"
              value={nombreSeleccionado && nombreSeleccionado.direccion}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;