const PageHeader = ({ headerText }: { headerText: string }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-4xl font-light 2xl:text-5xl">{headerText}</p>
    </div>
  );
};

export { PageHeader };
