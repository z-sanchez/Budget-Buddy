import { Breadcrumb } from "../../components/Breadcrumb";
import { PageHeader } from "../../components/PageHeader";
import NavigationLayout from "../../components/layouts/NavigationLayout";
import { type NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import { type Transaction } from "@prisma/client";
import { useTransactions } from "../../hooks/useTransactions";
import { TextInput } from "../../components/EditPageInputs/TextInput";
import { DropdownInput } from "../../components/EditPageInputs/DropdownInput";
import { api } from "../../utils/api";
import { type DropdownOption } from "../../utils/types";
import { DateInput } from "../../components/EditPageInputs/DateInput";
import dayjs from "dayjs";
import { DollarInput } from "../../components/EditPageInputs/DollarInput";
import { type Decimal } from "@prisma/client/runtime";

type PartialTransaction = Partial<Transaction>;

const EditTransaction: NextPageWithLayout = () => {
  const router = useRouter();
  const { getTransactionById, editTransactionProperties, deleteTransaction } =
    useTransactions();

  const transactionId = router.query.id as string;

  const budgetOptions: DropdownOption[] =
    api.budgets.getAllBudgets.useQuery().data?.map((budget) => {
      return {
        id: budget.id,
        label: budget.name,
      };
    }) || [];

  const accountOptions: DropdownOption[] =
    api.bankAccounts.getAllBankAccounts.useQuery().data?.map((account) => {
      return {
        id: account.id,
        label: account.name,
      };
    }) || [];

  const transactionData = getTransactionById(transactionId)
    .data as Transaction & {
    accountName: string;
    budgetName: string;
  };

  const handleUpdateTransaction = async (
    updatedValues: PartialTransaction
  ): Promise<void> => {
    const newTransaction = { ...transactionData, ...updatedValues };

    await editTransactionProperties(newTransaction);
  };

  const handleDeleteTransaction = async (): Promise<void> => {
    await deleteTransaction(transactionId)
      .then(async () => {
        await router.push("/budgets");
      })
      .catch(() => console.log("error"));
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

        <TextInput
          value={transactionData.name}
          label="Transaction Name"
          placeholder="Transaction Name"
          handleUpdate={(newName: string) => {
            handleUpdateTransaction({
              name: newName,
            }).catch((err: string) => console.log({ err }));
          }}
        ></TextInput>

        <DropdownInput
          placeholder="Budget Name"
          label="Budget Name"
          options={budgetOptions}
          selectedOption={
            budgetOptions.find(({ id }) => id === transactionData.budgetId) || {
              id: "",
              label: "",
            }
          }
          handleUpdate={(selectedOption: DropdownOption) => {
            handleUpdateTransaction({
              budgetId: selectedOption.id,
            }).catch((err: string) => console.log({ err }));
          }}
          noPlaceholderOption={true}
        ></DropdownInput>

        <DateInput
          value={dayjs(transactionData.date).toISOString()}
          handleUpdate={(newDate: Date) => {
            handleUpdateTransaction({
              date: newDate,
            }).catch((err: string) => console.log({ err }));
          }}
          label="Date"
        />

        <DropdownInput
          placeholder="Account"
          label="Account"
          options={accountOptions}
          selectedOption={
            accountOptions.find(
              ({ id }) => id === transactionData.accountId
            ) || {
              id: "",
              label: "",
            }
          }
          handleUpdate={(selectedOption: DropdownOption) => {
            handleUpdateTransaction({
              accountId: selectedOption.id,
            }).catch((err: string) => console.log({ err }));
          }}
          noPlaceholderOption={true}
        ></DropdownInput>

        <DollarInput
          value={transactionData.amount}
          label="Amount"
          placeholder="amount"
          handleUpdate={(newAmount: Decimal) => {
            handleUpdateTransaction({
              amount: newAmount,
            }).catch((err: string) => console.log({ err }));
          }}
        />

        <button
          className="text-red-400 transition-all hover:text-red-600"
          onClick={() => {
            handleDeleteTransaction().catch((err: string) =>
              console.log({ err })
            );
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
