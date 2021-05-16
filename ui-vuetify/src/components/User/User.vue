<template>
  <div>
    <v-row>
      <v-col sm="12" md="4">
        <v-card 
        flat
        >
         <v-toolbar color="blue ligten-1" flat dark>
            

            <v-toolbar-title>Upload Json file</v-toolbar-title>

            <v-spacer></v-spacer>

   
          
         
          </v-toolbar>
          <v-file-input
                show-size
                counter
                v-model="file"
                accept="application/json"
                placeholder="Upload JSON file"
                @change="fileHandler"
                
            ></v-file-input>
        </v-card>
      </v-col>
      <v-col sm="12" md="8">
        <v-card
        flat
        :loading="fileLoading"
        
        :disabled="file==null || fileLoading"
     
       
        >
           
          <v-toolbar color="blue ligten-1" flat dark>
            

            <v-toolbar-title>Choose to send</v-toolbar-title>

            <v-spacer></v-spacer>

            <div >Select all</div>
           <v-checkbox class="ml-2" @change="onSelectAll" v-model="selectAll" hide-details>
              
           </v-checkbox>
         
          </v-toolbar>

          <v-list two-line   :max-height="'29em'" :style="{'overflow-y':'auto'}">
    
              <v-list-item-group
        v-model="selected"
        active-class="indigo--text"
        multiple
      >
        <template v-for="(item, index) in dataItems">
          <v-list-item @click="optionChange(index)" :key="item.title">
            <template v-slot:default="{ active }" >
              <v-list-item-content >
                <v-list-item-title v-text="item['stargen_name_'+(index+1)]"></v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                  
                >
                {{item['stargen_option_'+(index+1)]=='true'?'Stargen Option Enabled':'Stargen Option Disabled'}}
                </v-list-item-subtitle>

                
              </v-list-item-content>

              <v-list-item-action>
               

                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                >
                  mdi-star-outline
                </v-icon>

                <v-icon
                  v-else
                  color="yellow darken-3"
                >
                  mdi-star
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < dataItems.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
         
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>


<script>


export default {
  name: "User",
  components:{
    
  },

  data(){
      return {
          file:null,
          fileLoading:false,
         
          selectAll:false,
          selected: [],
    
      fileData:undefined,

      
      }
  },
  computed:{
dataItems(){
  let keyNames=['stargen_config_','stargen_ta_endpoint_','stargen_name_','stargen_option_']
  
  let result=[]
  if(this.fileData!=undefined){
    let cc=this.fileData['stargen_script_count']
    for(let i=0;i<cc;i++){
      let temp={}
      for(let j=0;j<4;j++){
        temp[keyNames[j]+(i+1)]=this.fileData[keyNames[j]+(i+1)]
      }
    result.push(temp)
  }
  }
  return result
  
}
  },
  methods:{
      onSelectAll(e){
        console.log(e)

          if(e==true){
           this.selected=this.dataItems.map((i,j)=>{
                this.fileData['stargen_option_'+(j+1)]='true'
                return j
              })
              }else{
                this.selected=[]
                this.dataItems.map((i,j)=>{
                this.fileData['stargen_option_'+(j+1)]='false'
                return j
              })
              }
      },
      optionChange(ind){

        console.log("came in option --->",ind+1,typeof this.fileData['stargen_option_'+(ind+1)],this.fileData['stargen_option_'+(ind+1)])

          this.fileData['stargen_option_'+(ind+1)]= this.fileData['stargen_option_'+(ind+1)]=='false'?'true':'false'
        this.selectAll=this.fileData['stargen_option_'+(ind+1)]=='false'?this.selectAll==true?false:false:this.selectAll==true?true:false
      },
      fileHandler(){
        // setTimeout(()=>{this.fileLoading=false},5000)
        if(this.file!=null){
        this.fileLoading=true

              
                var reader = new FileReader();
              reader.readAsText(this.file, "UTF-8");
              reader.onload = (evt)=> {
                 console.log("data",evt.target.result)
                let js=JSON.parse(evt.target.result)
                  this.fileLoading=false
                  console.log("onload",evt.target.result)
                  this.fileData=js
              }
              reader.onerror =  (evt)=> {
                 this.fileLoading=false
                  console.log("error",evt.target.result)
              }
        }
        }
    
  },
  watch:{
      
        file(n){
         if(n==null){
           this.fileData=undefined
         }
      }
  }


};
</script>


<style lang="scss" scoped>
</style>