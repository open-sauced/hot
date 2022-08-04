import Avatar from "./Avatar";
export declare interface StackedAvatarProps {
  contributors: DbContribution[];
}
export default function StackedAvatar({ contributors }: StackedAvatarProps) {
  return (
    <div className="-space-x-2 flex hover:space-x-0 transition-all duration-300">
      {contributors.slice(0, 5).map(({ contributor, last_merged_at }) => (
        <div className="w-[24px] h-[24px] overflow-hidden rounded-full transition-all duration-300">
          <Avatar contributor={contributor} lastPr={last_merged_at} />
        </div>
      ))}
    </div>
  );
}

