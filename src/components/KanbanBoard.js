import React from 'react';
import KanbanColumn from './KanbanColumn';
import { groupTickets, sortTickets } from '../utils/ticketUtils'; // Helper functions

const KanbanBoard = ({ tickets, users, groupBy, sortBy }) => {
  // Define priority order
  const priorityOrder = [0, 4, 3, 2, 1]; // Order: No Priority, Urgent, High, Medium, Low

  // Group and sort tickets
  const groupedTickets = groupTickets(tickets, groupBy);
  console.log(users);

  const displayGroupedTickets = groupBy === 'userId'
    ? Object.keys(groupedTickets).reduce((acc, userId) => {
        const user = users.find(u => u.id === userId);
        const userName = user ? user.name : 'Unknown User';
        acc[userName] = groupedTickets[userId];
        return acc;
      }, {})
    : groupedTickets;

  const sortedTickets = sortTickets(displayGroupedTickets, sortBy);

  // Sort entries based on priority order if groupBy is 'priority'
  const sortedEntries = Object.entries(sortedTickets);
  const displayEntries = groupBy === 'priority'
    ? sortedEntries.sort(([a], [b]) => priorityOrder.indexOf(Number(a)) - priorityOrder.indexOf(Number(b)))
    : sortedEntries;

  return (
    <div className="kanban-board">
      {displayEntries.map(([groupKey, groupData]) => (
        <KanbanColumn
          key={groupKey}
          title={groupKey}
          tickets={groupData.tickets} // Pass the tickets for each group
          count={groupData.count} // Pass the count of tickets for each group
          groupBy={groupBy}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
