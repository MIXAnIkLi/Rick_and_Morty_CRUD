import React, { useState } from "react";
import { Select, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { filterPersons } from "../redux/action/PersonsAction";
import './FilterPerson.css'

const filterData = {
  status: ["alive", "dead", "unknown"],
  species: ["Human", "Alien"],
};

type FilterName = keyof typeof filterData;

const mainFilterData: FilterName[] = ["status", "species"];

const FilterPerson: React.FC = () => {
  const [selectedFilrters, setSelectedFilters] = useState(mainFilterData[0]);
  const [filters, setFilters] = useState(filterData[mainFilterData[0] as FilterName]);
  const [secondFilter, setSecondFilter] = useState("" as FilterName);
  const dispatch = useDispatch();

  const handleFilterChange = (value: FilterName) => {
    setSelectedFilters(value)
    setFilters(filterData[value]);
  };

  const onSecondFilterChange = (value: FilterName) => {
    // console.log(value)
    setSecondFilter(value);
    dispatch(filterPersons( selectedFilrters, value ));
  };

  return (
    <Space wrap className="select">
      <Select
        defaultValue={mainFilterData[0]}
        className="select__filter"
        onChange={handleFilterChange}
        options={mainFilterData.map((element) => ({
          label: element,
          value: element,
        }))}
      />
      <Select
        className="select__filter"
        value={secondFilter}
        onChange={onSecondFilterChange}
        options={filters.map((element) => ({ label: element, value: element }))}
      />
    </Space>
  );
};

export default FilterPerson;
