import React, {
  createContext,
  useContext,
  useState,
} from "react";
const Context = createContext();

const StateContext = ({ children }) => {

  const [user, _setUser] = useState(
		JSON.parse(localStorage.getItem('user')) || null
	);
  const [Evenements, setEvenements] = useState([]);

  const [FilteredEvenements, setFilteredEvenements] = useState([]);


	// set user to local storage
	const setUser = (user) => {

		if (user) {

			localStorage.setItem('user', JSON.stringify(user));
			localStorage.setItem('token', user.token);
      
      const now = new Date;
      const expirationTime = now.getTime() + (1 * 24 * 60 * 60 * 1000)
			localStorage.setItem('expirationTime', expirationTime);

		} else {

			localStorage.removeItem('user');
			localStorage.removeItem('token');
			localStorage.removeItem('expirationTime');
      localStorage.removeItem('baseUrl')

		}

		_setUser(user);

	};

  return (
    <Context.Provider
      value={{
        user,
        Evenements,
        FilteredEvenements,
        setUser,
        setEvenements,
        setFilteredEvenements
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default StateContext;

export const useStateContext = () => useContext(Context);
