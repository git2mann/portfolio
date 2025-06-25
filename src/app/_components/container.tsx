/**
 * Container component
 * Provides consistent horizontal padding and maximum width
 * Used to wrap content sections throughout the site
 */
type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className="w-full px-5" style={{ marginTop: 0, paddingTop: 0 }}>
      {children}
    </div>
  );
};

export default Container;