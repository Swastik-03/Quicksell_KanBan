import React from 'react';
import TicketCard from './TicketCard'; // Component to display individual tickets

const priorityIcons = {
  0: '/icons/icons_FEtask/No-priority.svg',
  1: '/icons/icons_FEtask/Low_Priority.svg',
  2: '/icons/icons_FEtask/Medium_Priority.svg',
  3: '/icons/icons_FEtask/High_Priority.svg',
  4: '/icons/icons_FEtask/Urgent_Priority_colour.svg',
};

const statusIcons = {
  Todo: '/icons/icons_FEtask/To-do.svg',
  Inprogress: '/icons/icons_FEtask/in-progress.svg',
  Backlog: '/icons/icons_FEtask/Backlog.svg',
  Done: '/icons/icons_FEtask/Done.svg',
  Cancelled: '/icons/icons_FEtask/Cancelled.svg',
};

const priorityLabels = {
  0: 'No priority',
  1: 'Low',
  2: 'Medium',
  3: 'High',
  4: 'Urgent'
};

const KanbanColumn = ({ title, tickets, count, groupBy }) => {
  const priorityIcon = groupBy === 'priority' && priorityIcons[title];
  const statusIcon = groupBy === 'status' && statusIcons[title];
  const userProfile = groupBy === 'userId';
  const displayTitle = groupBy === 'priority' ? priorityLabels[title] : title;
  console.log(title);

  return (
    <div className="kanban-column">
      <div className="titleHead">
        <h3 style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='titlecol'>
          {priorityIcon && (
            <span
              src={priorityIcon}
              alt={`Priority ${displayTitle}`}
              style={{ width: '20px', height: '20px', marginRight: '8px' }}
            >
              </span>
          )}
          {statusIcon && (
            <img
              src={statusIcon}
              alt={`Status ${displayTitle}`}
              style={{ width: '20px', height: '20px', marginRight: '8px' }}
            />
          )}
          {userProfile && (
              <img
              src='/avatar.jpg'
              alt={`Status ${displayTitle}`}
              style={{ width: '30px', height: '30px', marginRight: '8px', borderRadius:'50%' }}
            />
          )}
          {displayTitle} <p className='count'> {count} </p>
        </h3>
        <div>
          <img src="/icons/icons_FEtask/add.svg" alt="Add" />
          <img src="/icons/icons_FEtask/3_dot_menu.svg" alt="More options" />
        </div>
      </div>
      <div className="ticket-list">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} groupBy={groupBy} />
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
