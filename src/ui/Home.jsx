import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser.jsx'
import Button from './Button.jsx';
function Home() {
  const name = useSelector(state => state.user.userName)
  return (
    <div className='my-10 text-center sm:my-16 px-4'>
      <h1 className="text-xl  
       font-semibold mb-4 md:text-3xl ">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
 {name === ""? <CreateUser />: <Button to="/menu" type="primary" > Continue ordering, {name}</Button>}
    </div>
  );
}

export default Home;
