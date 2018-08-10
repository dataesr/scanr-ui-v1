/*Composants externes*/
import React, { Component } from 'react';
import axios from 'axios';

/*Composants internes*/
import Address from './Address/Address';

/*Config*/
  /*API*/
  import {API_END_POINT} from '../../../../config/config';

/*CSS*/
//import classes from '../Structure.css';

class Addresses extends Component{
  state = {
      addresses: this.props.addresses,
      structureId: this.props.structureId,
      showAll: false,
      addMode: false
  };

  render(){

    return (
      <div>
        {
          this.state.addresses.map((address, index) => {
            return (
              <Address key={index}
                index={index}
                showAll={this.state.showAll}
                address={address}
                add={this.state.addMode}
                n_addresses={this.state.addresses.length}
                deleteButton={this.deleteButtonHandler}
                saveButton={this.saveButtonHandler}
                addButton={this.addButtonHandler} />
            )
          })// /map
        }
      </div>
    );// /return()
  }// /render

  AxiosCall(data){
    axios(
      {
      method: 'POST',
      url: `${API_END_POINT}structures/addresses`,
      responseType: 'json',
      data: JSON.stringify(data)
      }
    ).then(
      (response) => {
        console.log(response);
        if(response.status === 200){
          console.log("charger modal check OK");

          let newState = {...this.state};
          newState.addMode = false;
          this.setState(newState);
        }
      }
    )

  }// /AxiosCall()


  saveButtonHandler = () => {
    const dataObject = {
      data: [{
        scanr_id: this.state.structureId,
        addresses: this.state.addresses
      }]
    };

    this.AxiosCall(dataObject);
  }

  addButtonHandler = () => {
    let newState = {...this.state};
    newState.addMode = true;

    // Ajout d'un objet "address" vide à la liste des Labels
    const address_empty = {
                          source: '',
                          status: 'new',
                          value: ''
                        };

    newState.addresses.push(address_empty);
    this.setState(newState);
  }


  deleteButtonHandler = (obj) => {
    let addresses = this.state.addresses
    addresses.splice(obj.index, 1);

    const dataObject = {
      data: [{
        scanr_id: this.state.structureId,
        label: addresses
      }]
    };

    this.AxiosCall(dataObject);
  }


}// AddressesClass

export default Addresses;
