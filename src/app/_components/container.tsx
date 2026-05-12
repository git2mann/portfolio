/**
 * Container component
 * Provides consistent horizontal padding and maximum width
 */
type Props = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
};

const Container = ({ children, className, id }: Props) => {
  return (
    <div id={id} className={`max-w-[1440px] mx-auto px-5 md:px-10 ${className || ""}`}>
      {children}
    </div>
  );
};

export default Container;