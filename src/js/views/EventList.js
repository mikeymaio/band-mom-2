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

  }

  componentWillMount() {
    this.db.on('child_added', () => {
      this.props.onGetEventMany()
    })
    this.props.onClearEvent()
  }

  handleRowClick(row) {
    // this.props.onGetGig(this.id)
    // history.push(`/${this.props.match.params.userId}/bands/testBand/events/${row._id}/`);
    // this.props.onGetEvent(row.id)
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

  renderRow(doc, index) {

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

    let columns = [
      { value: moment(doc.date).format('MM/DD/YYYY') || '' , colorClass: statusColorClass},
      { value: doc.venue || '' },
      { value: doc.address || '' },
      { value: doc.phone || '' },
      { value: doc.loadIn || '' },
      { value: doc.showTime || '' },
      { value: doc.type || '' },
      // { value: doc.status.toUpperCase() || '', colorClass: statusColorClass },
    ];

    let menu = (
      doc.status === 'upcoming' ?
      <TableRowMenu>
        {/* <TableRowMenuItem
          label="Edit Details"
          onClick={ () => {
            this.props.updateEventEdit();
            history.push(`/testUser/bands/testBand/events/${doc.id}/details`);
          }}
        /> */}
        {/* <TableRowMenuItem
          label="Share"
          // onClick={ this.handleRowMenuItemClick.bind(this, doc, MENU_SHARE) }
        /> */}
        <TableRowMenuItem
          label="Delete"
          onClick={ () => this.deleteEvent(doc) }
        />
      </TableRowMenu>
      :
      <TableRowMenu>
      {/* <TableRowMenuItem
        label="Edit Details"
        // onClick={ this.handleRowMenuItemClick.bind(this, doc, MENU_EDIT_SHOW_DETAILS) }
      />
      <TableRowMenuItem
        label="Share"
        // onClick={ this.handleRowMenuItemClick.bind(this, doc, MENU_SHARE) }
      /> */}
      <TableRowMenuItem
        label="Delete"
        onClick={ () => this.deleteEvent(doc) }
      />
      <TableRowMenuItem
        label="Archive"
        // onClick={ this.handleRowMenuItemClick.bind(this, doc, MENU_ARCHIVE) }
      />
    </TableRowMenu>

    );

    return (
      <TableRow
        key={ index }
        columns={ columns }
        onClick={ this.handleRowClick.bind(this, doc) }
      >
      { menu }
      </TableRow>
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

  renderTable() {
    const { events } = this.props;
      if(events) {
        // let results = this.sortData(events);
        // console.log(results);

        let rows = Object.keys(events).map((key) => {
          // console.log('rendering row')
          events[key].id = key;

          const status = this.props.statusFilter === 'ALL';
          const type = this.props.typeFilter === 'ALL';

          if ((events[key].status === this.props.statusFilter.toLowerCase() || status) &&
            (events[key].type === this.props.typeFilter.toLowerCase() || type)) {
            return this.renderRow(events[key], key)
          } else {
            return null;
          }
        });

        return (
          <Table columnLabels={[
            "Date",
            "Venue",
            "Address",
            "Phone",
            "Load In",
            "Show Time",
            "Type",
            // "Status",
            ""
          ]}
          >
            { rows }
          </Table>
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
      { link: null, name: 'Shows' },
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
          buttonLabel="Add Show"
          buttonIcon="add"
          buttonOnClick={ this.toggleCreateEventModal }
        />
        <div className='page__content page__content--two-col'>
        <CreateEventModal
          show={ this.state.showCreateEventModal }
          onSubmit={ this.onCreateEventSubmit }
          onCancel={ this.onCreateEventCancel }
          onSuccess={ this.onCreateEventSuccess }
          onError={ this.onCreateEventError }
        />
        <div className="event__list__container">
        {this.props.notification.display ? this.renderNotification() : null}
        <div className="filter__section">
        <p>
        Filter by status:
          <FilterLink
              filter="ALL"
              currentFilter={this.props.statusFilter}
              action={this.props.filterEventsByStatus}
              >
              All
          </FilterLink>
          <FilterLink
              filter="UPCOMING"
              currentFilter={this.props.statusFilter}
              action={this.props.filterEventsByStatus}
              >
              Upcoming
          </FilterLink>
          <FilterLink
              filter="PAST"
              currentFilter={this.props.statusFilter}
              action={this.props.filterEventsByStatus}
              >
              Past
          </FilterLink>
        </p>
        <p>
          Filter by type:
          <FilterLink
              filter="ALL"
              currentFilter={this.props.typeFilter}
              action={this.props.filterEventsByType}
              >
              All
          </FilterLink>
          <FilterLink
              filter="SHOW"
              currentFilter={this.props.typeFilter}
              action={this.props.filterEventsByType}
              >
              Show
          </FilterLink>
          <FilterLink
              filter="REHEARSAL"
              currentFilter={this.props.typeFilter}
              action={this.props.filterEventsByType}
              >
              Rehearsal
          </FilterLink>
        </p>
        </div>
        { this.renderTable() }
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