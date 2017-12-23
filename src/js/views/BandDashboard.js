import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/event.actions';
import { dismissNotification } from '../actions/notification.actions';
import Table from '../components/Global/Table';
import TableRow from '../components/Global/TableRow';
import TableRowMenu from '../components/Global/TableRowMenu';
import TableRowMenuItem from '../components/Global/TableRowMenuItem';
import Drawer from '../components/Global/Drawer';
import Subheader from '../components/Global/Subheader';
import Notification from '../components/Global/Notification';

import Carousel from '../components/Carousel';


import CreateEventModal from '../modals/CreateEventModal';
import FilterLink from '../components/Global/FilterLink';
import Input from '../components/Global/Input';
import moment from 'moment';
import history from '../history';

import database from '../config/fire'


export const initialState = {
  showCreateEventModal: false,
  showShareModal: false,
  selected: '',
};
class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.db = database.ref().child('events');

    this.toggleCreateEventModal = this.toggleCreateEventModal.bind(this);
    this.onCreateEventSubmit = this.onCreateEventSubmit.bind(this);
    this.onCreateEventCancel = this.onCreateEventCancel.bind(this);
    this.onDeleteEventSuccess = this.onDeleteEventSuccess.bind(this);
    this.onDeleteEventError = this.onDeleteEventError.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.restoreEvent = this.restoreEvent.bind(this);
    this.setFilterWidth = this.setFilterWidth.bind(this);
    this.handleFilterWidth = this.handleFilterWidth.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);

  }

  componentWillMount() {
    this.db.on('child_added', () => {
      this.props.onGetEventMany()
    })
    this.props.onClearEvent()
  }

  componentDidMount() {
    this.handleFilterWidth()
    window.addEventListener('resize', this.handleFilterWidth);
  }

  setFilterWidth(id) {
    const filterDiv = document.querySelector(`#${id}`);
    const template = document.querySelector('#template');
    template.options[0].innerHTML = filterDiv.options[filterDiv.selectedIndex].textContent;

    filterDiv.style.width = `${template.getBoundingClientRect().width}px`;
  }

  handleFilterWidth() {
    const selectList = document.querySelectorAll('.event__filter');

    selectList.forEach((sel) => {
        this.setFilterWidth(sel.getAttribute('id'));
    });
  }

  handleFilterChange(filter, action) {
    this.handleFilterWidth();
    action(filter);
  }

  handleRowClick(row) {
    history.push(`/testUser/bands/testBand/events/${row.id}/details`);
  }

  handleRowMenuItemClick(doc, action, event) {
    event.stopPropagation();
  }

  toggleCreateEventModal() {
    this.setState(prevState => ({
      showCreateEventModal: !prevState.showCreateEventModal
    }));
  }

  onCreateEventSubmit() {
    console.log('Event submitted');
    this.toggleCreateEventModal();
  }

  onCreateEventCancel() {
    this.toggleCreateEventModal();
  }

  onCreateEventSuccess() {
    console.log('Show successfully created');
  }

  onCreateEventError(err) {
    console.log('An error occured:' + err);
  }

  deleteEvent(event) {
    this.props.onDeleteEvent(event)
    // this.db.child(gigId).remove()
    .then(() => this.onDeleteEventSuccess())
    .catch(err => this.onDeleteEventError())
  }

  onDeleteEventSuccess() {
    this.props.onGetEventMany();
    // alert('Show successfully deleted');
  }

  onDeleteEventError() {
    this.props.onGetEventMany();
    alert('An error occured :(');
  }

  restoreEvent() {
    if (this.props.recentlyDeleted.length > 0) {
      this.props.onRestoreEvent(this.props.recentlyDeleted[this.props.recentlyDeleted.length - 1])
    } else {
      console.log('no Events to restore');
      this.props.dismissNotification();
    }
  }

  renderNotification() {
    const { notification } = this.props;
    return (
      <Notification
        action={this.restoreEvent}
        actionLabel={notification.actionLabel}
        dismiss={this.props.dismissNotification}
        display={notification.display}
        message={notification.message}
      />
    );
  }

  renderEventCard(doc, index) {

    let statusColorClass = '';
    switch(doc.status) {
      case 'upcoming':
        // statusColorClass = 'clr-purple';
        break;
      case 'past':
        statusColorClass = 'clr-red';
        break;
      default:
        // statusColorClass = 'clr-purple';
    }


    let card = (
      <div>
        <p><span className="card__type">{doc.type.toUpperCase()}</span> @ { doc.venue }</p>
        <p>{ moment(doc.date).format('MM/DD/YYYY')} </p>
        <p>Set Time: { doc.showTime }</p>
      </div>

    );

    return (
      <div className="card"
        key={ doc.date }
        onClick={ this.handleRowClick.bind(this, doc) }
      >
      { card }
      </div>
    );
  }

  // sortData(docs) {
  //   let events;
  //   // Sort data
  //   events = Object.keys(docs)

  //   return {
  //     events,
  //   };
  // }

  renderEventPreview() {
    const { events } = this.props;
      if(events) {
        // let results = this.sortData(events);
        // console.log(results);

        let rows = Object.keys(events).map((key) => {
          // console.log('rendering row')
          events[key].id = key;

          if (events[key].status === 'upcoming') {
            return this.renderEventCard(events[key], key)
          }
        })
        .sort((a, b) => {
          const valueA = new Date(a.key);
          const valueB = new Date(b.key);
          return (valueB < valueA) ? 1 : (valueB > valueA) ? -1 : 0;
        })

        return (
          <Carousel>
            { rows }
          </Carousel>
        );
      }
      else {
        return (
          // <NoContent text="No Shows" />
          <div className="no-content__wrapper">
            <div>No Shows</div>
          </div>
        );
      }
  }

  render() {

    // Subheader
    // let breadcrumbs = [
    //   { link: (authenticated) ? `/${match.params.userId}/projects` : null, name: 'Projects' },
    //   { link: null, name: project.name },
    // ];

    let breadcrumbs = [
      // { link: `/${match.params.userId}/gigs` : null, name: 'Gigs' },
      { link: null, name: 'Test Band' },
      // { link: null, name: gig.venue },
    ];

    return (
      <div className='page__container'>
        <Drawer
          // userName={ userName }
          show={ true }
          className="drawer__sidebar"
          // toggle={ this.toggleDrawer }
        />
        <Subheader breadcrumbs={ breadcrumbs }
          // buttonHide={ buttonHide }
          buttonHide={ true }
          // buttonLabel="Add Show"
          // buttonIcon="add"
          // buttonOnClick={ this.toggleCreateEventModal }
        />
        <div className='page__content page__content--two-col'>
          <div className="event__list__container">
          {/* <div className="event__preview__container"> */}
          <h3>Upcoming Events</h3>
            { this.renderEventPreview() }
          <a href="/testUser/bands/testBand/events">View All</a>
          </div>
        </div>
      </div>
    );
  }
}

// export default EventList;

function mapStateToProps(state) {
  return {
    events: state.events.events,
    statusFilter: state.events.statusFilter,
    typeFilter: state.events.typeFilter,
    recentlyDeleted: state.events.recentlyDeleted,
    notification: state.notification,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onClearEvent: actions.clearEvent,
    onGetEvent: actions.getEvent,
    onGetEventMany: actions.getEventMany,
    onDeleteEvent: actions.deleteEvent,
    onRestoreEvent: actions.restoreEvent,
    dismissNotification: dismissNotification,
    filterEventsByStatus: actions.filterEventsByStatus,
    filterEventsByType: actions.filterEventsByType,
    updateEventEdit: actions.updateEventEdit,
    },
  dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);