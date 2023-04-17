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
    </div>
  );
}

export default App;