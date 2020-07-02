<template>
<div>
    hello: {{selectedStateName}}
    <div v-for="(districtData,districtName) in selectedStateData" :key="districtName">
       <div v-for="(data,index) in districtData" :key="index">
          {{index}} {{data.confirmed}} 
       </div>
       <hr>
     
    </div>
 
</div>
 
</template>

<script>
import {stateDistrictWiseData} from '@/service/index.js'
export default {
    name:'SelectedStateData',
    data(){
        return{
            selectedStateName:this.$route.params.id,
            districtWiseData:{},
            selectedStateData:{},
        }
    },
    created(){
        this.getStateDistrictWiseData();
    },
    methods:{
        async getStateDistrictWiseData(){
            const promise = await stateDistrictWiseData();
            this.districtWiseData= promise.data;
            this.selectedStateData=this.getSelectedStateData;
        }
    },
    computed:{
        getSelectedStateData(){
            return this.districtWiseData[this.selectedStateName];
        }
    }
    
}
</script>