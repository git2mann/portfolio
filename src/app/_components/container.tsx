/**
 * Container component
 * Provides consistent horizontal padding and maximum width
 * Used to wrap content sections throughout the site
 */
type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="container mx-auto px-5">{children}</div>;
};

export default Container;