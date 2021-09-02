import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState, Component} from 'react';
import { Container } from "semantic-ui-react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { render } from '@testing-library/react';


const baseUrl = "http://localhost:5000/phones"

class App extends Component{

  state={
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      id: '',
      phoneName: '',
      manufacturer: '',
      description: '',
      color: '',
      price: '',
      imageFileName: '',
      screen: '',
      processor: '',
      ram: '',
      tipoModal: ''
    }
  };

  peticionGet=()=>{
    axios.get(baseUrl).then(response=>{
      //this.setState({data: response.data});
      console.log(response.data)

    }).catch(error=>{
      console.log(error.message);
    })
  }

  peticionPost=async()=>{
    delete this.state.form.id;
   await axios.post(baseUrl,this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }

  peticionPut=()=>{
    axios.put(baseUrl+this.state.form.id, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })
  }

  peticionDelete=()=>{
    axios.delete(baseUrl+this.state.form.id).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }

  selecctPhone=(phone)=>{
    this.setState({
      tipoModal: 'update',
      form: {
        id: phone.id,
        phoneName: phone.phoneName,
        manufacturer: phone.manufacturer,
        description: phone.description,
        color: phone.color,
        price: phone.price,
        imageFileName: phone.imageFileName,
        screen: phone.screen,
        processor: phone.processor,
        ram: phone.ram
      }
    })
  }


  modalInsertar=()=>{
    this.setState({modalInsertar : !this.state.modalInsertar});
  }

  handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  }


  componentDidMount(){
    this.peticionGet();
  }

  render(){
    const {form}=this.state;
    return(
    <div className="App">
      <br /><br /><br />
      <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Add Phone</button>
      <br /><br />
        <table className="table ">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Description</th>
              <th>Color</th>
              <th>Price</th>
              <th>Image file name</th>
              <th>Screen</th>
              <th>Processor</th>
              <th>Ram</th>
              <th>Acctions</th>
            </tr>
          </thead>

          
          <tbody>              
            {this.state.data.map(phone=>{
              return(
                <tr>
                  <td>{phone.id}</td>
                  <td>{phone.phoneName} </td>
                  <td>{phone.manufacturer} </td>
                  <td>{phone.description} </td>
                  <td>{phone.color} </td>
                  <td>{phone.price} </td>
                  <td>{phone.imageFileName} </td>
                  <td>{phone.screen} </td>
                  <td>{phone.processor} </td>
                  <td>{phone.ram} </td>
                  <td>
                    <button className="btn btn-primary" onClick={()=>this.selecctPhone(phone)} ><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{this.selecctPhone(phone); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{display: 'block'}}>
            <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="id">id</label>
              <input className="form-control" type="number" name="id" id="id" onChange={this.handleChange} value={form?form.id: ''}/>
              <br />
              <label htmlFor="phoneName">Name</label>
              <input className="form-control" type="text" name="phoneName" id="phoneName" onChange={this.handleChange} value={form?form.phoneName: ''}/>
              <br />
              <label htmlFor="manufacturer">Manufacturer</label>
              <input className="form-control" type="text" name="manufacturer" id="manufacturer" onChange={this.handleChange} value={form?form.manufacturer: ''}/>
              <br />
              <label htmlFor="description">Description</label>
              <input className="form-control" type="text" name="description" id="description" onChange={this.handleChange} value={form?form.description: ''}/>
              <br/>
              <label htmlFor="color">Color</label>
              <input className="form-control" type="text" name="color" id="color" onChange={this.handleChange} value={form?form.color: ''}/>
              <br />
              <label htmlFor="price">Price</label>
              <input className="form-control" type="number" name="price" id="price" onChange={this.handleChange} value={form?form.price: ''}/>
              <br />
              <label htmlFor="imageFileName">Image</label>
              <input className="form-control" type="text" name="imageFileName" id="imageFileName" onChange={this.handleChange} value={form?form.imageFileName: ''}/>
              <br />
              <label htmlFor="screen">Screen</label>
              <input className="form-control" type="text" name="screen" id="screen" onChange={this.handleChange} value={form?form.screen: ''}/>
              <br />
              <label htmlFor="processor">Processor</label>
              <input className="form-control" type="text" name="processor" id="processor" onChange={this.handleChange} value={form?form.processor: ''}/>
              <br />
              <label htmlFor="ram">Ram</label>
              <input className="form-control" type="number" name="ram" id="ram" onChange={this.handleChange} value={form?form.ram: ''}/>
              <br />
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal=='insertar'?
              <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                Insertar
              </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                Actualizar
              </button>
            }
              <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            Are you sure you want to delete this phone {form && form.phoneName}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Yes</button>
            <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
          </ModalFooter>
        </Modal>


    </div>
    );
  }
}

export default App;
