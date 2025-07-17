import {Select, type SelectProps} from 'antd';

import {useCountryList} from '../api/use-country-list';

import {CountrySelectLabel} from './country-select-label';

import './style.scss';

interface Props {
  className?: string;
}

const SELECT_DEFAULT_VALUE_US = ['1'];

export const CountrySelect = ({className}: Props) => {
  const {data, isLoading} = useCountryList();

  const countryOptions: SelectProps['options'] = data?.data.map((country) => ({
    value: country.id.toString(),
    label: country.name,
    icon: country.icon,
    country: country.country,
  }));

  const labelRender: SelectProps['labelRender'] = (props) => {
    const {label, value} = props;
    const country = data?.data.find((c) => c.id.toString() === value);
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
      defaultValue={SELECT_DEFAULT_VALUE_US}
      labelRender={labelRender}
      loading={isLoading}
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
