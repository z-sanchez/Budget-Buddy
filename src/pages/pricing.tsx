import { type NextPageWithLayout } from "./_app";

const Pricing: NextPageWithLayout = ({ data }: { data: string }) => {
  return <h1>{data}</h1>;
};

export function getServerSideProps() {
  // Fetch data from external API
  const data = "Poo Poo";

  // Pass data to the page via props
  return { props: { data } };
}

Pricing.getLayout = (page) => {
  return (
    <div>
      <p>Top</p>
      {page}
      <p>Bottom</p>
    </div>
  );
};

export default Pricing;
