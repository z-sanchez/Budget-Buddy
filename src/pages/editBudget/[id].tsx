import { type NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";

const Pricing: NextPageWithLayout = () => {
  const router = useRouter();
  return <h1>{router.query.id}</h1>;
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
      <p>Default</p>
    </div>
  );
};

export default Pricing;
