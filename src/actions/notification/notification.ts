"use server"
import { createClient } from "@/utils/supabase/server";
import { dataFocusVisibleClasses } from "@nextui-org/theme";
import { useEffect } from "react";

const supabase = createClient();

export const fetchNotifications = async (userId : string) => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("receiver_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

// LESSOR
export const expireContractNotification = async (
    userId : string,
) => {
  const { data, error } = await supabase
    .from("company")
    .select(`
        property (
          unit (id, title)
        )`)
    .eq("owner_id", userId);

  const unitIDs = data
    .flatMap(company => company.property)
    .flatMap(property => property.unit)
    .map(unit => unit.id);

  const today = new Date();
  const thirtyDaysFromNow = new Date(today.setDate(today.getDate() + 35));
  const { data: transactions, error: transactionError } = await supabase
    .from("transaction")
    .select("id, unit_id")
    .in("unit_id", unitIDs)
    .lt("contract", thirtyDaysFromNow.toISOString());

  const notifications = transactions.map(transaction => ({
    text: `Contract for unit - ${data
      .flatMap(company => company.property)
      .flatMap(property => property.unit)
      .find(unit => unit.id === transaction.unit_id)?.title} is expiring`,
    receiver_id: userId,
  }));

  const { data: notificationData, error: notificationError } = await supabase
    .from("notifications")
    .insert(notifications);
  if (error) throw error;

}

export const reservationNotification = async (
    userId : string, 
    propertyTitle : string, 
    unitTitle : string
  ) => {
  const { data, error } = await supabase
    .from("notifications")
    .insert({ receiver_id: userId, text: `Transaction: Room Reservation for ${propertyTitle} - ${unitTitle}` });
  if (error) throw error;
}

export const onsiteNotification = async (
    userId : string, 
    propertyTitle : string, 
    unitTitle : string
  ) => {
  const { data, error } = await supabase
    .from("notifications")
    .insert({ receiver_id: userId, text: `Transaction: Onsite Visit for ${propertyTitle} - ${unitTitle}` });
  if (error) throw error;
}

export const cancel_onsiteNotification = async (
    unitID : number,
    senderID: string,
    reason?: string
  ) => {
    const {data: property_id, error: propertyIdError} = await supabase
      .from("unit")
      .select("property_id, title")
      .eq("id", unitID)

    const {data: property_title, error: propertyTitleError} = await supabase
      .from("property")
      .select("company_id,title")
      .eq("id", property_id[0].property_id)

    const {data: receiver_id, error: receiverIdError} = await supabase
      .from("company")
      .select("owner_id")
      .eq("id", property_title[0].company_id)
    
    let text = `Transaction: Onsite Visit Cancelled for ${property_title[0].title} - ${property_id[0].title}`;
    if (reason) {
      text += ` because "${reason}"`;
    }
    const { data, error } = await supabase
      .from("notifications")
      .insert({ receiver_id: receiver_id[0].owner_id, text });
    if (error) throw error;
}

export const confirm_onsiteNotification = async (
    unitID : number,
    receiver_id: string
  ) => {
    const {data: property_id, error: propertyIdError} = await supabase
      .from("unit")
      .select("property_id, title")
      .eq("id", unitID)

    const {data: property_title, error: propertyTitleError} = await supabase
      .from("property")
      .select("title")
      .eq("id", property_id[0].property_id)
    
    const { data, error } = await supabase
      .from("notifications")
      .insert({ receiver_id: receiver_id, text: `Your Onsite Visit is confirmed for ${property_title[0].title} - ${property_id[0].title}` });
    if (error) throw error;
}

export const confirm_reserveNotification = async (
  unitID : number,
  receiver_id: string
) => {
  const {data: property_id, error: propertyIdError} = await supabase
    .from("unit")
    .select("property_id, title")
    .eq("id", unitID)

  const {data: property_title, error: propertyTitleError} = await supabase
    .from("property")
    .select("title")
    .eq("id", property_id[0].property_id)
  
  const { data, error } = await supabase
    .from("notifications")
    .insert({ receiver_id: receiver_id, text: `Your Reservation is confirmed for ${property_title[0].title} - ${property_id[0].title}` });
  if (error) throw error;
}
export const cancelled_onsiteNotification = async (
    unitID : number,
    receiver_id: string[]
  ) => {
    const {data: unitData, error: propertyIdError} = await supabase
      .from("unit")
      .select("property_id, title")
      .eq("id", unitID)
      .single()
    
    const {data: propertyData, error: propertyTitleError} = await supabase
      .from("property")
      .select("title")
      .eq("id", unitData.property_id)
      .single()
    
      const notifications = receiver_id.map(userId => ({
        receiver_id: userId,
        text: `Cancelled: Someone has reserved and paid for ${propertyData.title} - ${unitData.title} before you.`,
      }));
    
      const { data, error } = await supabase
        .from("notifications")
        .insert(notifications);
}

export const cancel_lessorNotification = async (
  receiver_id: string,
  unit_id: number,
  reason?: string
) => {
  const { data: UnitData, error: UnitDataError } = await supabase
    .from('unit')
    .select('title, property_id')
    .eq("id", unit_id)
    .single()
  
  const {data: PropertyData, error: PropertyDataError} = await supabase
    .from("property")
    .select("title")
    .eq("id", UnitData.property_id)
    .single()

  if(reason){
    const { data, error } = await supabase
      .from("notifications")
      .insert({ receiver_id: receiver_id, text: `Proprietor has cancelled your Onsite Visit for ${PropertyData.title} - ${UnitData.title} because "${reason}"` });
    if (error) throw error;
  }else{
    const { data, error } = await supabase
      .from("notifications")
      .insert({ receiver_id: receiver_id, text: `Proprietor has cancelled your Onsite Visit for ${PropertyData.title} - ${UnitData.title}` });
    if (error) throw error;
  }


}

//ADMIN
export const confirmedProprietorNotification = async (
  receiver_id: string
) => {
  const { data, error } = await supabase
    .from("notifications")
    .insert({ receiver_id: receiver_id, text: `You're verified as a Proprietor, you can now list your properties.` });
  if (error) throw error;
}

export const rejectedProprietorNotification = async (
  receiver_id: string,
  reason: string
) => {
  const { data, error } = await supabase
    .from("notifications")
    .insert({ receiver_id: receiver_id, text: `Your verification as a Proprietor has been rejected because "${reason}"` });
  if (error) throw error;
}

export const expire_PropertyNotification = async (
  receiver_id: string,
  propertyID: number,
) => {
  const { data: propertyData, error: propertyDataError } = await supabase
    .from('property')
    .select('title')
    .eq("id", propertyID)

  const { error } = await supabase
    .from("notifications")
    .insert({ receiver_id: receiver_id, text: `Your property "${propertyData[0].title}" has been expired` });
  if (error) throw error;
}

export const approve_PropertyNotification = async (
  receiver_id: string,
  propertyID: number,
) => {
  const { data: propertyData, error: propertyDataError } = await supabase
    .from('property')
    .select('title')
    .eq("id", propertyID)

  const { error } = await supabase
    .from("notifications")
    .insert({ receiver_id: receiver_id, text: `Your property "${propertyData[0].title}" has been approved and ready to be viewed publicly.` });
  if (error) throw error;
}

export const reject_PropertyNotification = async (
  receiver_id: string,
  propertyID: number,
  reason: string
) => {
  const { data: propertyData, error: propertyDataError } = await supabase
    .from('property')
    .select('title')
    .eq("id", propertyID)

  const { error } = await supabase
    .from("notifications")
    .insert({ receiver_id: receiver_id, text: `Your property "${propertyData[0].title}" has been rejected because "${reason}"` });
  if (error) throw error;
}

export const newMessageNotification = async (receiver_id: string,message: string)=>{
  const { error } = await supabase
    .from("notifications")
    .insert({ receiver_id: receiver_id, text: message });
  if (error) throw error;
}

