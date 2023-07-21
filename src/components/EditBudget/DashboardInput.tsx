type Props = {
  checked: number;
  handleUpdate: (newValue: any) => Promise<void>;
};

const DashboardInput = ({ checked, handleUpdate }: Props) => {
  return (
    <div className="my-8 flex items-center">
      <p className="w-1/12 font-medium">Dashboard</p>
      <input
        type="checkbox"
        checked={Boolean(checked)}
        onChange={() => {
          handleUpdate(!checked).catch(() => null);
        }}
        className="h-4 w-4"
      ></input>
    </div>
  );
};

export { DashboardInput };
