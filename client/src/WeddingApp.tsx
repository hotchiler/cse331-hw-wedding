import React, { Component } from 'react';
import GuestList from './components/GuestList';
import AddGuest from './components/AddGuest';
import GuestDetails from './components/GuestDetails';
import { Guest } from './Guest';
import { addGuest, updateGuest, removeGuest } from './Guest';
type View = 'list' | 'add' | 'details';

type WeddingAppState = {
  guests: Guest[];
  currentView: View;
  previousView: View;
  selectedGuest?: Guest;
}

/**
 * Represents the WeddingApp component.
 */
export class WeddingApp extends Component<{}, WeddingAppState> {

  constructor(props: {}) {
    super(props);
    this.state = { guests: [], currentView: 'list', previousView: 'list' };
  }

  /**
   * Lifecycle method that is called after the component is mounted.
   */
  componentDidMount = (): void => {
    this.doFetchGuestsClick();
  }

  /**
   * Fetches the guests from the API and updates the state.
   */
  doFetchGuestsClick = (): void => {
    fetch('/api/guests')
      .then(response => response.json())
      .then(data => this.setState({ guests: data }))
      .catch(error => console.error('Error fetching guests:', error));
  };

  /**
   * Handles the click event for adding a guest.
   * @param guest - The guest to be added.
   */
  doHandleAddGuestClick = (guest: Guest): void => {
    fetch('/api/guests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(guest),
    })
    .then(response => response.json())
    .then(newGuest => {
      const updatedGuests = addGuest(this.state.guests, newGuest); 
      this.setState({ guests: updatedGuests, currentView: 'list', previousView: this.state.currentView });
    })
    .catch(error => console.error('Error adding guest:', error));
  };

  /**
   * Handles the click event for updating a guest.
   * @param updatedGuest - The updated guest.
   */
  doHandleUpdateGuestClick = (updatedGuest: Guest): void => {
    fetch(`/api/guests/${updatedGuest.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedGuest),
    })
    .then(response => response.json())
    .then(updated => {
      const updatedGuests = updateGuest(this.state.guests, updated); 
      this.setState({ guests: updatedGuests, currentView: 'list', previousView: this.state.currentView });
    })
    .catch(error => console.error('Error updating guest:', error));
  };

  /**
   * Handles the click event for removing a guest.
   * @param guestId - The ID of the guest to be removed.
   */
  doHandleRemoveGuestClick = (guestId: string): void => {
    fetch(`/api/guests/${guestId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
      const updatedGuests = removeGuest(this.state.guests, guestId); 
      this.setState({ guests: updatedGuests, currentView: 'list', previousView: this.state.currentView });
    })
    .catch(error => console.error('Error removing guest:', error));
  };

  /**
   * Handles the click event for switching the view.
   * @param view - The view to switch to.
   * @param guest - The guest (optional) to pass to the new view.
   */
  doHandleSwitchViewClick = (view: View, guest?: Guest): void => {
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

  /**
   * Handles the click event for going back to the previous view.
   */
  doHandleGoBackClick = (): void => {
    this.setState(prevState => ({
      currentView: prevState.previousView,
      previousView: prevState.currentView,
    }));
  };

  /**
   * Renders the WeddingApp component.
   * @returns The JSX element representing the component.
   */
  render = (): JSX.Element => {
    const { guests, currentView, selectedGuest } = this.state;

    return (
      <div>
        <nav>
          <button onClick={() => this.doHandleSwitchViewClick('list')}>Guest List</button>
          <button onClick={() => this.doHandleSwitchViewClick('add')}>Add Guest</button>
        </nav>
        {currentView === 'list' ? <GuestList guests={guests} onSelectGuest={guest => this.doHandleSwitchViewClick('details', guest)} /> : null}
        {currentView === 'add' ? <AddGuest onAddGuest={this.doHandleAddGuestClick} onBack={this.doHandleGoBackClick} /> : null}
        {currentView === 'details' && selectedGuest ? <GuestDetails guest={selectedGuest} onUpdateGuest={this.doHandleUpdateGuestClick} onBack={this.doHandleGoBackClick} /> : null}
      </div>
    );
  }
}

export default WeddingApp;