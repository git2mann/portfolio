/**
 * Avatar component
 * Displays an author's profile picture and name
 */
type Props = {
  name: string;   // Author's name
  picture: string; // URL to author's profile picture
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      {/* Author's profile picture */}
      <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
      {/* Author's name */}
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
};

export default Avatar;