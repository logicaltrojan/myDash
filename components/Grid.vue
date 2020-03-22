
<template>
<div style=" height: 500px;">
   <ag-grid-vue style=" height: 100%;"
        class="ag-theme-balham"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :enableRangeSelection="true"
        :gridOptions="gridOptions"
                :getRowNodeId="get"
         v-model="rowData">
    </ag-grid-vue>
    <v-btn
      @click="checkValidation"
    >Check</v-btn>
  </div>
</template>
<script>
  import "ag-grid-community/dist/styles/ag-grid.css";
  import "ag-grid-community/dist/styles/ag-theme-balham.css";
  import {AgGridVue} from 'ag-grid-vue';
  import 'ag-grid-enterprise'

  export default {
    name: 'grid',
    data() {
        return {
            columnDefs: null,
            rowData : [
              {
               id : 1
              },
              {
                id : 2
              },
              {
                id : 3
              },
              {
               id : 4
              },
              {
                id : 5
              },{},{},{},
              {},{},{},{},
            ],
            gridOptions: null,
            gridApi: null,
            columnApi: null,
            defaultColDef : null,
            query : []
        }
    },
    components: {
        AgGridVue
    },
    beforeMount() {
      this.gridOptions = {};
        this.defaultColDef = {
          editable : true
        }
         this.columnDefs = [
           {headerName: 'ID', field: 'id'},
           {headerName: 'IP', field: 'ip'},
            {headerName: 'APP NAME', field: 'appName'},
            {headerName: 'Validation', field: 'validation'}
         ];

        this.getRowNodeId = data => {
          return data.id;
        }

    },
    mounted() {
      this.gridApi = this.gridOptions.api;
    },
    methods : {
      checkValidation(){
        this.rowData.forEach(element => {
          if(Object.keys(element).length >= 3){
            this.query.push(this.queryBuilder(element));
          }
        });
        this.query.forEach((element,index) => {
          this.$axios.post('http://localhost:3000/api/db/test', {
            query : element
          }).then((res) => {
            if(res.data){
              if(res.data.rows.length > 0){
                var rowNode =this.gridApi.getRowNode(index);
                rowNode.setDataValue('validation', 'false')
              }else{
                var rowNode =this.gridApi.getRowNode(index);
                rowNode.setDataValue('validation', 'true')
              }
            }
          })

        })
        this.query = [];
      },
      queryBuilder(element){
        function formatParams(param){
          return "'" + param + "'";
        }

        return "SELECT * FROM testTable where IP = "
          + formatParams(element.ip) +
          " AND APPNAME = " + formatParams(element.appName);


      }
    }

}
</script>
