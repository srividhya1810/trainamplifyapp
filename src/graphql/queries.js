/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMedicine = /* GraphQL */ `
  query GetMedicine($id: ID!) {
    getMedicine(id: $id) {
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
export const listMedicines = /* GraphQL */ `
  query ListMedicines(
    $filter: ModelMedicineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedicines(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
