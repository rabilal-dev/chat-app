export interface ChatItemT {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unreadCount?: number;
}

export const MOCK_CHATS: ChatItemT[] = [
  {
    id: '1',
    name: 'Alice Smith',
    lastMessage: 'Are we still on for tomorrow?',
    time: '14:32',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'Team Alpha',
    lastMessage: 'Bob: I just pushed the new feature to prod!',
    time: '11:20',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    id: '3',
    name: 'Charlie Davis',
    lastMessage: 'hahaha that is hilarious 😂',
    time: 'Yesterday',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
  },
  {
    id: '4',
    name: 'Mom',
    lastMessage: 'Call me when you get off work',
    time: 'Yesterday',
    avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    unreadCount: 1,
  },
  {
    id: '5',
    name: 'Design Sync',
    lastMessage: 'Figma link updated in description.',
    time: 'Tuesday',
    avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
  },
  {
    id: '6',
    name: 'Gym Bros',
    lastMessage: 'Chest day tomorrow 6am 💪',
    time: 'Monday',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026711d',
  },
  {
    id: '7',
    name: 'Jane Doe',
    lastMessage: 'Sounds good to me.',
    time: 'Monday',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026703d',
  },
  {
    id: '8',
    name: 'Landlord',
    lastMessage: 'The plumber is scheduled for Thursday.',
    time: 'Sun',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026718d',
  },
  {
    id: '9',
    name: 'Pizza Place',
    lastMessage: 'Your order is out for delivery.',
    time: 'Sat',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026720d',
  },
  {
    id: '10',
    name: 'Sarah Jenkins',
    lastMessage: 'Did you see the latest episode?',
    time: '10/04/26',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026725d',
  },
];

export interface StatusItemT {
  id: string;
  name: string;
  time: string;
  avatar: string;
  hasUnseen: boolean;
}

export const MOCK_STATUSES: StatusItemT[] = [
  {
    id: '1',
    name: 'Alice Smith',
    time: 'Just now',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    hasUnseen: true,
  },
  {
    id: '2',
    name: 'Jane Doe',
    time: '15 minutes ago',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026703d',
    hasUnseen: true,
  },
  {
    id: '3',
    name: 'Mom',
    time: '42 minutes ago',
    avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    hasUnseen: false,
  },
  {
    id: '4',
    name: 'Sarah Jenkins',
    time: '2 hours ago',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026725d',
    hasUnseen: false,
  },
];
