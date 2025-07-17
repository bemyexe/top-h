import {useEffect, useState} from 'react';
import {Select, type SelectProps} from 'antd';

import {type Country, TOP_HISTORY_API} from '../api';

import {CountrySelectLabel} from './country-select-label';

import './style.scss';

interface Props {
  className?: string;
}

export const CountrySelect = ({className}: Props) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCountry = async () => {
      try {
        setLoading(true);
        const response = await TOP_HISTORY_API.getCountryList();
        const data = response.data;
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };
    getCountry();
  }, []);

  const countryOptions: SelectProps['options'] = countries.map((country) => ({
    value: country.id.toString(),
    label: country.name,
    icon: country.icon,
    country: country.country,
  }));

  const labelRender: SelectProps['labelRender'] = (props) => {
    const {label, value} = props;
    const country = countries.find((c) => c.id.toString() === value);
    return (
      <CountrySelectLabel
        imgSrc={country?.icon}
        imgAlt={country?.country}
        label={label}
      />
    );
  };

  return (
    <Select
      className={className}
      options={countryOptions}
      defaultValue={['1']}
      labelRender={labelRender}
      loading={loading}
      optionRender={(option) => (
        <CountrySelectLabel
          imgSrc={option.data.icon}
          imgAlt={option.data.country}
          label={option.data.label}
        />
      )}
    />
  );
};
