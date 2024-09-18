import React from 'react';
import './ticketCard.css'


const priorityIcons = {
  0: '/icons/icons_FEtask/No-priority.svg',
  1: '/icons/icons_FEtask/Low_priority.svg',
  2: '/icons/icons_FEtask/Medium_priority.svg',
  3: '/icons/icons_FEtask/High_priority.svg',
  4: '/icons/icons_FEtask/Urgent_Priority_grey.svg',
};

const statusIcons = {
  Todo: '/icons/icons_FEtask/to-do.svg',
  Inprogress: '/icons/icons_FEtask/in-progress.svg',
  Backlog: '/icons/icons_FEtask/Backlog.svg',
  Done: '/icons/icons_FEtask/Done.svg',
  Cancelled: '/icons/icons_FEtask/Cancelled.svg',
};

const TicketCard = ({ ticket, groupBy }) => {
  const statusIcon = groupBy !== 'status' && statusIcons[ticket.status.replace(/\s+/g, '')];
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{ticket.id}</span>
        {groupBy !== 'userId' && (
          <img src="/avatar.jpg" alt="Avatar" className="card-avatar" style={{ height: '40px', weight: '40px' }} />
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {statusIcon && (
          <img
            src={statusIcon}
            alt={`Status ${ticket.status}`}
            style={{ width: '20px', height: '20px', marginLeft: '3px', marginBottom: '2px' }}
          />
        )}
        <h1 className="card-title">{ticket.title}</h1>
      </div>
      {groupBy !== 'priority' && (
        <span className='priority'>
          <img src={priorityIcons[ticket.priority] || '/icons/icons_FEtask/No-priority.svg'} />
        </span>
      )}
      {ticket.tag && (
        <div className="card-tag">
          <span className="card-tag-icon"></span>
          <span className="card-tag-text">{ticket.tag}</span>
        </div>
      )}

    </div>

  );
};

export default TicketCard;
