import {
  FETCH_PERSONS_START,
  FETCH_PERSONS_SUCCESS,
  FETCH_PERSONS_FAILURE,
  DELETE_PERSON,
  EDIT_PERSON,
  FILTER_PERSON,
  CREATE_PERSON,
} from "../action/PersonsAction.ts";

type InState = {
  persons: Array<object>;
  loading: boolean;
  error: any;
};

const initialState: InState = {
  persons: [],
  loading: false,
  error: null,
};

export const personReduser = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PERSONS_START:
      return { ...state, loading: true, error: null };
    case FETCH_PERSONS_SUCCESS:
      return { ...state, loading: false, persons: action.payload };
    case FETCH_PERSONS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_PERSON:
      return {
        ...state,
        persons: state.persons.filter((person) => person.id !== action.payload),
      };
    case EDIT_PERSON:
      return {
        ...state,
        persons: state.persons.map((person) =>
          person.id === action.payload.personId
            ? { ...action.payload.updatedPerson }
            : { ...person }
        ),
      };
      case FILTER_PERSON:
        return {
            ...state, loading: true, error: null 
        }
      case CREATE_PERSON:
        return {
          ...state, persons: [...state.persons, action.payload]
        }
    default:
      return state;
  }
};
