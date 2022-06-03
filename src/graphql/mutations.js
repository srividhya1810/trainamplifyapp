/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMedicine = /* GraphQL */ `
  mutation CreateMedicine(
    $input: CreateMedicineInput!
    $condition: ModelMedicineConditionInput
  ) {
    createMedicine(input: $input, condition: $condition) {
      id
      MedicineName
      Cost
      Qty
      CompanyName
      ExpiryDate
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateMedicine = /* GraphQL */ `
  mutation UpdateMedicine(
    $input: UpdateMedicineInput!
    $condition: ModelMedicineConditionInput
  ) {
    updateMedicine(input: $input, condition: $condition) {
      id
      MedicineName
      Cost
      Qty
      CompanyName
      ExpiryDate
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteMedicine = /* GraphQL */ `
  mutation DeleteMedicine(
    $input: DeleteMedicineInput!
    $condition: ModelMedicineConditionInput
  ) {
    deleteMedicine(input: $input, condition: $condition) {
      id
      MedicineName
      Cost
      Qty
      CompanyName
      ExpiryDate
      description
      createdAt
      updatedAt
    }
  }
`;
