export const groupTickets = (tickets, groupBy) => {
  const grouped = {};

  // Define all possible groups for 'priority' and 'status'
  const priorityGroups = [0, 1, 2, 3, 4]; // No Priority is represented as 0
  const statusGroups = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];

  // Initialize groups with empty arrays and a count of 0
  if (groupBy === 'priority') {
    priorityGroups.forEach((priority) => {
      grouped[priority] = { tickets: [], count: 0 };
    });
  } else if (groupBy === 'status') {
    statusGroups.forEach((status) => {
      grouped[status] = { tickets: [], count: 0 };
    });
  } else {
    tickets.forEach((ticket) => {
      const groupKey = ticket[groupBy] || 'No Group';
      grouped[groupKey] = { tickets: [], count: 0 };
    });
  }

  // Group tickets and update the count for each group
  tickets.forEach((ticket) => {
    let groupKey;

    if (groupBy === 'priority') {
      groupKey = ticket.priority === 0 ? 0 : ticket.priority;
    } else if (groupBy === 'status') {
      groupKey = ticket.status || 'No Group';
    } else {
      groupKey = ticket[groupBy] || 'No Group';
    }

    // Ensure the ticket is pushed to the correct group and update the count
    if (grouped[groupKey]) {
      grouped[groupKey].tickets.push(ticket);
      grouped[groupKey].count += 1;
    }
  });

  return grouped;
};



  
export const sortTickets = (groupedTickets, sortBy) => {
  const sortedGroups = {};

  Object.entries(groupedTickets).forEach(([groupKey, groupData]) => {
    let sortedTickets;

    if (sortBy === 'priority') {
      sortedTickets = groupData.tickets.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'title') {
      sortedTickets = groupData.tickets.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else {
      // Default: return unsorted if no sorting criteria is provided
      sortedTickets = groupData.tickets;
    }

    sortedGroups[groupKey] = {
      tickets: sortedTickets,
      count: groupData.count,
    };
  });

  return sortedGroups;
};

  