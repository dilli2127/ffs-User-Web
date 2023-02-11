import { City, Country, State } from "country-state-city";

export const getCountry = (values) => {
  let _country = Country.getAllCountries().filter((x) => {
    return x.isoCode === values;
  });
  return _country?.[0]?.name;
};

export const getState = (values, co) => {
  let _state = State.getStatesOfCountry(co).filter((x) => {
    return x.isoCode === values;
  });

  return _state?.[0]?.name;
};
