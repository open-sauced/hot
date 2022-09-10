import Avatar from "./Avatar";

export declare interface StackedAvatarProps {
  contributors: DbContribution[];
}
const StackedAvatar = ({ contributors }: StackedAvatarProps) => (
  <div className="-space-x-2 flex hover:space-x-0 transition-all duration-300">
    {contributors && contributors.slice(0, 5).map(({ contributor, last_merged_at }) => (
      <div
        key={`contributor-avatar-${contributor}`}
        className="w-6 h-6 overflow-hidden rounded-full transition-all duration-300"
      >
        <Avatar
          contributor={contributor}
          lastPr={last_merged_at}
        />
      </div>
    ))}
  </div>
);

export default StackedAvatar;
