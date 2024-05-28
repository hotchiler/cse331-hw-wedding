import React, { Component } from 'react';
import GuestList from './components/GuestList';
import AddGuest from './components/AddGuest';
import GuestDetails from './components/GuestDetails';
import { Guest } from './types';

type View = 'list' | 'add' | 'details';

type WeddingAppState = {
  guests: Guest[];
  currentView: View;
  previousView: View;
  selectedGuest?: Guest;
}

export class WeddingApp extends Component<{}, WeddingAppState> {

  constructor(props: {}) {
    super(props);
    this.state = { guests: [], currentView: 'list', previousView: 'list' };
  }

  componentDidMount = () => {
    this.doFetchGuests();
  }

  doFetchGuests = () => {
    fetch('/api/guests')
      .then(response => response.json())
      .then(data => this.setState({ guests: data }))
      .catch(error => console.error('Error fetching guests:', error));
  };

  handleAddGuest = (guest: Guest) => {
    fetch('/api/guests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(guest),
    })
    .then(response => response.json())
    .then(newGuest => this.setState(prevState => ({ guests: [...prevState.guests, newGuest], currentView: 'list', previousView: prevState.currentView })))
    .catch(error => console.error('Error adding guest:', error));
  };

  handleUpdateGuest = (updatedGuest: Guest) => {
    fetch(`/api/guests/${updatedGuest.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedGuest),
    })
    .then(response => response.json())
    .then(updated => {
      this.setState(prevState => ({
        guests: prevState.guests.map(guest => guest.id === updated.id ? updated : guest),
        currentView: 'list',
        previousView: prevState.currentView,
      }));
    })
    .catch(error => console.error('Error updating guest:', error));
  };

  switchView = (view: View, guest?: Guest) => {
    if (this.state.currentView === view) {
      if (view === 'list') {
        alert("You're already here!");
      }
      return;
    }
    this.setState(prevState => ({
      currentView: view,
      previousView: prevState.currentView,
      selectedGuest: guest
    }));
  };

  goBack = () => {
    this.setState(prevState => ({
      currentView: prevState.previousView,
      previousView: prevState.currentView,
    }));
  };

  render() {
    const { guests, currentView, selectedGuest } = this.state;

    return (
      <div>
        <nav>
          <button onClick={() => this.switchView('list')}>Guest List</button>
          <button onClick={() => this.switchView('add')}>Add Guest</button>
        </nav>
        {currentView === 'list' && <GuestList guests={guests} onSelectGuest={guest => this.switchView('details', guest)} />}
        {currentView === 'add' && <AddGuest onAddGuest={this.handleAddGuest} onBack={this.goBack} />}
        {currentView === 'details' && selectedGuest && <GuestDetails guest={selectedGuest} onUpdateGuest={this.handleUpdateGuest} onBack={this.goBack} />}
      </div>
    );
  }
}

export default WeddingApp;
