import clsx from 'clsx';

interface Props {
  className?: string;
  imgSrc?: string;
  imgAlt?: string;
  label?: React.ReactNode;
}

export const CountrySelectLabel = ({
  className,
  imgSrc,
  imgAlt,
  label,
}: Props) => {
  return (
    <span className={clsx('country-select-label', className)}>
      <img src={imgSrc} alt={imgAlt} />
      {label}
    </span>
  );
};
