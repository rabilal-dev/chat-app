export interface ChatItemT {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unreadCount?: number;
}

export const MOCK_CHATS: ChatItemT[] = [];

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
