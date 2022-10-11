import User from '../features/account/user';
import './registration.css';
export default function Registration(props: any) {
  return (
    <>
      <div className="background-registration-layout"></div>
      <User setUser={props.setUser} />
    </>
  );
}
