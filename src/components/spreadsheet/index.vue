<template>
  <TableStructure :rows="rows">
    <Column field="index" label="ID" />
    <Column field="name" label="Name" />
    <Column field="age" label="Age" />

    <Column field="email">
      <template #label>Email</template>

      <template #data="row">
        <a :href="`mailto:${row.email}`">{{ row.email }}</a>
      </template>
    </Column>

    <Column field="phone">
      <template #label>Phone</template>

      <template #data="row">
        <a :href="`tel:${row.phone.split(' ').join('')}`">{{ row.phone }}</a>
      </template>
    </Column>

    <Column field="company" label="Company" />
  </TableStructure>
</template>

<script>
  import TableStructure from '@/components/spreadsheet/TableStructure.vue';
  import Column from '@/components/spreadsheet/Column.vue';

  export default {
    name: 'Spreadsheet',
    components: {
      TableStructure,
      Column,
    },
    data:  () => ({
      rows: [
        {
          "_id": "619d0214422db4e856c0678b",
          "index": 1,
          "guid": "eff475a0-60a5-4021-a776-19242e1fcd62",
          "isActive": true,
          "balance": "$3,266.26",
          "age": 20,
          "name": "Dolly Mcgowan",
          "gender": "female",
          "company": "RECRITUBE",
          "email": "dollymcgowan@recritube.com",
          "phone": "+1 (874) 559-2156",
          "address": "691 Menahan Street, Wattsville, Wyoming, 350",
          "registered": "2021-02-22T12:46:48 -03:00"
        },
        {
          "_id": "619d0214252f8ce3165fa363",
          "index": 2,
          "guid": "a631036a-4e5a-400a-a96d-bdadd9df1138",
          "isActive": false,
          "balance": "$2,138.62",
          "age": 38,
          "name": "Bullock Oconnor",
          "gender": "male",
          "company": "YURTURE",
          "email": "bullockoconnor@yurture.com",
          "phone": "+1 (841) 527-3358",
          "address": "272 Lois Avenue, Noblestown, Tennessee, 7737",
          "registered": "2019-12-08T10:14:17 -03:00"
        },
        {
          "_id": "619d0214e09f14ab5302dded",
          "index": 3,
          "guid": "2669baa9-e80a-428c-b087-ae20f0cb978b",
          "isActive": true,
          "balance": "$1,690.71",
          "age": 24,
          "name": "Carter Bradshaw",
          "gender": "male",
          "company": "GADTRON",
          "email": "carterbradshaw@gadtron.com",
          "phone": "+1 (870) 469-2617",
          "address": "657 Dekalb Avenue, Eagleville, Federated States Of Micronesia, 138",
          "registered": "2014-05-09T06:43:38 -04:00"
        },
      ],
    }),
  };
</script>

<style scoped>
</style>
