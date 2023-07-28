import { Breadcrumb } from "../../components/Breadcrumb";
import { PageHeader } from "../../components/PageHeader";
import NavigationLayout from "../../components/layouts/NavigationLayout";
import { type NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import { type Transaction } from "@prisma/client";
import { useTransactions } from "../../hooks/useTransactions";

type PartialTransaction = Partial<Transaction>;

const EditTransaction: NextPageWithLayout = () => {
  const router = useRouter();
  const { getTransactionById } = useTransactions();

  const transactionId = router.query.id as string;

  const transactionData = getTransactionById(transactionId).data as Transaction;

  const handleUpdateTransaction = async (
    updatedValues: PartialTransaction
  ): Promise<void> => {
    // await updateMonthsBudget({ ...budgetData, ...updatedValues });
  };

  const handleDeleteBudget = async (): Promise<void> => {
    //
  };

  console.log({ transactionData });

  return !transactionData?.name ? null : (
    <div className="col-span-1 grid h-screen min-h-[800px] grid-cols-[100%] grid-rows-[13%_auto] gap-y-2 px-5 py-3">
      <div className="col-span-1">
        <div className="flex h-full min-h-[120px] w-full flex-col justify-between overflow-hidden py-5">
          <PageHeader headerText={"Edit Transaction"} />
          <Breadcrumb></Breadcrumb>
        </div>
      </div>
      <div className="col-span-1 pb-8">
        <div className="flex items-center">
          <p className="text-2xl font-light 2xl:text-3xl">
            {transactionData?.name}
          </p>
        </div>

        <button
          className="text-red-400 transition-all hover:text-red-600"
          onClick={() => {
            null;
          }}
        >
          Delete Transaction
        </button>
      </div>
    </div>
  );
};

EditTransaction.getLayout = (page) => {
  return <NavigationLayout>{page}</NavigationLayout>;
};

export default EditTransaction;
