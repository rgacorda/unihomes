"use server";

import { createClient } from "@/utils/supabase/server";

export const getTransactionHistory = async (userId: string) => {
  const supabase = createClient();

  try {
    const { data: companyData, error: companyError } = await supabase
      .from("company")
      .select("id")
      .eq("owner_id", userId);

    if (companyError || !companyData?.length) {
      console.error(
        `Error fetching companies for user ID ${userId}:`,
        companyError?.message
      );
      return [];
    }

    const companyIds = companyData.map((company) => company.id);

    const { data: properties, error: propertiesError } = await supabase
      .from("property")
      .select("id")
      .in("company_id", companyIds);

    if (propertiesError || !properties?.length) {
      console.error(
        `Error fetching properties for companies:`,
        propertiesError?.message
      );
      return [];
    }

    const propertyIds = properties.map((property) => property.id);

    const { data: units, error: unitsError } = await supabase
      .from("unit")
      .select("id, title, unit_code, property_id")
      .in("property_id", propertyIds);

    if (unitsError || !units?.length) {
      console.error(
        `Error fetching units for properties:`,
        unitsError?.message
      );
      return [];
    }

    const unitIds = units.map((unit) => unit.id);

    const { data: transactions, error: transactionsError } = await supabase
      .from("transaction")
      .select(
        `
        id, 
        user_id, 
        service_option,     
        appointment_date, 
        transaction_status, 
        isPaid, 
        unit:unit_id (
          id, title, unit_code
        ),
        account:user_id (
          firstname, 
          lastname
        )
      `
      )
      .in("unit_id", unitIds);

    if (transactionsError || !transactions?.length) {
      console.error(
        `Error fetching transactions for owned units:`,
        transactionsError?.message
      );
      return [];
    }

    return transactions.map((transaction) => ({
      ...transaction,
      unit_title: transaction.unit.title,
      client_name: `${transaction.account.firstname} ${transaction.account.lastname}`,
    }));
  } catch (error: any) {
    console.error(
      "Unexpected error in fetching transaction history:",
      error.message
    );
    return [];
  }
};
