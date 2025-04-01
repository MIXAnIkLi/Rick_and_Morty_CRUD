import axios from "axios";

export const FETCH_PERSONS_START: string = "FETCH_PERSONS_START";
export const FETCH_PERSONS_SUCCESS = "FETCH_PERSONS_SUCCESS";
export const FETCH_PERSONS_FAILURE = "FETCH_PERSONS_FAILURE";
export const DELETE_PERSON = "DELETE_PERSON";
export const EDIT_PERSON = "EDIT_PERSON";
export const FILTER_PERSON = "FILTER_PERSON";
export const CREATE_PERSON = "CREATE_PERSON";


export const fetchPersonsStart = () => {
  return { type: FETCH_PERSONS_START };
};

export const fetchPersonsSuccess = (persons) => {
  return {
    type: FETCH_PERSONS_SUCCESS,
    payload: persons,
  };
};

export const fetchPersonsFailure = (error) => {
  return {
    type: FETCH_PERSONS_FAILURE,
    payload: error,
  };
};

// API не дает возможности на удаление, поэтому сделал их в стейте
export const deletePerson = (personId) => {
  return {
    type: DELETE_PERSON,
    payload: personId,
  };
};

// API не дает возможности на изменение, поэтому сделал их в стейте
export const editPerson = (personId, updatedPerson) => {
  return {
    type: EDIT_PERSON,
    payload: {
      personId,
      updatedPerson,
    },
  };
};

export const filterPersonsStart = (filterFirstName, filterSecondName) => {
  return {
    type: FILTER_PERSON,
    payload: { filterFirstName, filterSecondName },
  };
};

export const createPerson = (person) => {
  return{
    type: CREATE_PERSON, 
    payload: person
}
  
}


export const fetchPersons = () => {
  return (dispatch) => {
    dispatch(fetchPersonsStart);
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => {
        dispatch(fetchPersonsSuccess(response.data.results));
      })
      .catch((error) => {
        dispatch(fetchPersonsFailure(error.message));
      });
  };
};

export const filterPersons = (filterFirstName, filterSecondName) => {
  return (dispatch) => {
    dispatch(filterPersonsStart);
    axios
      .get(`https://rickandmortyapi.com/api/character?${filterFirstName}=${filterSecondName}`)
      .then((response) => {
        dispatch(fetchPersonsSuccess(response.data.results));
      })
      .catch((error) => {
        dispatch(fetchPersonsFailure(error.message));
      });
  };
};

