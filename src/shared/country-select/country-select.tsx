import {Select, type SelectProps} from 'antd';

import {useCountryList} from '../../widgets/top-history/api/use-country-list';

import {CountrySelectLabel} from './country-select-label';

import './style.scss';

interface Props extends SelectProps {
  onChangeCountrySelect: (value: number[]) => void;
  className?: string;
}

const SELECT_DEFAULT_VALUE_US = [1];

export const CountrySelect = ({
  onChangeCountrySelect,
  className,
  ...props
}: Props) => {
  const {data, isLoading} = useCountryList();

  const countryOptions: SelectProps['options'] = data?.map((country) => ({
    value: country.id,
    label: country.name,
    icon: country.icon,
    country: country.country,
  }));

  const handleCountryChange = (value: number[]) => {
    onChangeCountrySelect(value);
  };

  const labelRender: SelectProps['labelRender'] = (props) => {
    const {label, value} = props;
    const country = data?.find((c) => c.id === value);
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
      onChange={handleCountryChange}
      loading={isLoading}
      optionRender={(option) => (
        <CountrySelectLabel
          imgSrc={option.data.icon}
          imgAlt={option.data.country}
          label={option.data.label}
        />
      )}
      {...props}
    />
  );
};
