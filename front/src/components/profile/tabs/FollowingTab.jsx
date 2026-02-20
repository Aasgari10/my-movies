import UserList from './UserList';

const FollowingTab = ({ following }) => (
  <UserList users={following} emptyMessage="این کاربر هنوز کسی را دنبال نکرده است." />
);

export default FollowingTab;