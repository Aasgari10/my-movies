import UserList from './UserList';

const FollowersTab = ({ followers }) => (
  <UserList users={followers} emptyMessage="هنوز کسی این کاربر را دنبال نکرده است." />
);

export default FollowersTab;