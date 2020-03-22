<template>
<div>
<grid
@rowChanged="rowChanged"
></grid>
<v-textarea
:value="fullQueryString"
></v-textarea>
</div>
</template>
<script>
  import grid from '@/components/Grid.vue'
  import sqlFormatter from 'sql-formatter'

  export default {
    name: 'apiAdmin',
    data() {
        return {
          query : [],
        }
    },
    computed : {
      fullQueryString(){
        return this.query.reduce((acc, curr) => {
          return acc + curr;
        }, "");
      }

    },
    components: {
      grid
    },
    methods : {


    }

}
</script>
