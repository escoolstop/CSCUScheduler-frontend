<script>
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../firebase'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'HistoryPage',
  data(){
    return{
      loadstate:true,
      subject: {},// this is temp subject for input
      displaymode:1,
      subjAll_ID:[],
      /* subjAll:[{su_id:'2301111', su_name: 'CALCULUS I', su_credit:3, su_level:'4',su_genre:'CS1'},{su_id:2301151, su_name: 'CALCULUS I', su_credit:"3", su_level:'4',su_genre:'CS1'}
      ,{su_id:'2301222', su_name: 'CALCULUS I', su_credit:3, su_genre:'CS-CORE'}, {su_id:'2312100', su_name: 'MICROB', su_credit:3, su_genre:'GEN-SC'}
      ,{su_id:'3404117', su_name: 'INTRO TO LAW', su_credit:3, su_genre:'GEN-SO'}
      ,{su_id:'2301361', su_name: 'SYSTEMS ANALYSIS AND DESIGN', su_credit:3, su_genre:'CS1'},{su_id:'2301361', su_name: 'SYSTEMS ANALYSIS AND DESIGN', su_credit:3, su_genre:'CS1'}
      ,{su_id:'2312100', su_name: 'MICROB', su_credit:3, su_genre:'GEN-SC'}],
      subj1_1:[{su_id:'2301115', su_name: 'CALCULUS I', su_credit:3, su_genre:'CS1'}],
      subj1_2:[{su_id:'2301111', su_name: 'CALCULUS I', su_credit:3, su_genre:'CS2'}],
      subj2_1:[{su_id:'2301111', su_name: 'CALCULUS I', su_credit:3, su_genre:'CS-CORE'}],
      subj2_2:[{su_id:'2301361', su_name: 'SYSTEMS ANALYSIS AND DESIGN', su_credit:3, su_genre:'CS1'}],
      subj3:[{su_id:'2304184', su_name: 'GENERAL PHYSICS LABORATORY II', su_credit:3, su_genre:'SC-CORE'}],
      subj4_1:[{su_id:'3404117', su_name: 'INTRO TO LAW', su_credit:3, su_genre:'GEN-SO'}],
      subj4_2:[{su_id:'2296352', su_name: '21ST CENTURY BUDDHISTS', su_credit:3, su_genre:'GEN-HU'}],
      subj4_3:[{su_id:'3309102', su_name: 'OUR BODY', su_credit:3, su_genre:'GEN-SC'}], 
      subj4_4:[{su_id:'0201122', su_name: 'MANAGEMENT OF PUBLIC DISASTER', su_credit:3, su_genre:'GEN-IN'}],
      subj4_5:[{su_id:'5500112', su_name: 'EXPERIENTIAL ENGLISH II', su_credit:3, su_genre:'GEN-LANG'}],
      subj4_6:[{su_id:'2312101', su_name: 'MICROB II', su_credit:3, su_genre:'GEN-SC'}],
      subj5:[], */
      subjAll_temp:[],
      subjAll:[],
      subj1_1:[],
      subj1_2:[],
      subj2_1:[],
      subj2_2:[],
      subj3:[],
      subj4_1:[],
      subj4_2:[],
      subj4_3:[], 
      subj4_4:[],
      subj4_5:[],
      subj4_6:[],
      subj5:[],
      info:"test",
      subjectNumberInput:'',
      cr_id:'',
      student_ID:'',
    }
  },
  setup() {
    const { user } = useAuthState()
    const auth = getAuth()
    const router = useRouter()
    const signOutUser = async () => {
      try {
        await signOut(auth)
        router.push('/login')
      } catch (e) {
        alert(e.message)
      }
    }
    return { user, signOutUser }
    
  },
  methods: {
    totalRequest(subarr) {      
      return subarr.reduce((acc, item) => acc + item.su_credit, 0);
    },
    sortSubjByGenre(inputArray, targetArray, genre, maxWeight){
      let currWeight = this.totalRequest(targetArray);
      for (var i = 0, length = inputArray.length; i < length; i++) {
        if (currWeight >= maxWeight){ return; }
        if (inputArray[i].su_genre == genre){
            currWeight += inputArray[i].su_credit;
            targetArray.push(...inputArray.splice(i, 1));            
            if (currWeight >= maxWeight){ return; }
            i--;
            length--;
        }
    } return;
    },
    sortSubjById(inputArray, targetArray, subjIdList, maxWeight) {
      let currWeight = this.totalRequest(targetArray); //maybe turn it to set and use .has instead of .includes to compare? faster or not idk https://dev.to/arnaud/using-array-prototype-includes-vs-set-prototype-has-to-filter-arrays-41fg
      for (var i = 0, length = inputArray.length; i < length; i++) {
        if (subjIdList.includes(inputArray[i].su_id)) {
          currWeight += inputArray[i].su_credit;
          targetArray.push(...inputArray.splice(i, 1));
          if (currWeight >= maxWeight){ return; }
          i--;
          length--;
        }
      }
      return;
    },
    sortSubjByGenre_Regexpy(inputArray, targetArray, genre, maxWeight, stringForRegexpy){
      let currWeight = this.totalRequest(targetArray);
      for (var i = 0, length = inputArray.length; i < length; i++) {
        let regexpy = new RegExp(stringForRegexpy);
        if (currWeight >= maxWeight){ return; }
        if (inputArray[i].su_genre == genre && regexpy.test(inputArray[i].su_id)){
            currWeight += inputArray[i].su_credit;
            targetArray.push(...inputArray.splice(i, 1));            
            if (currWeight >= maxWeight){ return; }
            i--;
            length--;
        }
    } return;
    },
    sortSubjByGenre_ReverseRegexpy(inputArray, targetArray, genre, maxWeight, stringForRegexpy){
      let currWeight = this.totalRequest(targetArray);
      for (var i = 0, length = inputArray.length; i < length; i++) {
        let regexpy = new RegExp(stringForRegexpy);
        if (currWeight >= maxWeight){ return; }
        if (inputArray[i].su_genre == genre && !regexpy.test(inputArray[i].su_id)){
            currWeight += inputArray[i].su_credit;
            targetArray.push(...inputArray.splice(i, 1));            
            if (currWeight >= maxWeight){ return; }
            i--;
            length--;
        }
      } return;
    },
    async addSubject(){
      if ( !(this.subjectNumberInput.length == 7) || !(/^\d+$/.test(this.subjectNumberInput))) { this.$vaToast.init({message: 'Please insert 7 digits input', position: 'bottom-left', color: 'warning'}); return; }
      await axios.get('https://us-central1-cscuscheduler.cloudfunctions.net/api/subject/querySubject',{
      params: { id: this.subjectNumberInput }, headers:{"Access-Control-Allow-Origin":"*"}
      }).then(response =>{ ( this.subject=(response.data[0])) 
          if (this.subject != "No matching documents."){
            /* console.log(this.subject) */
            this.subject.su_credit = parseInt(this.subject.su_credit)
            this.subjAll_ID.push(this.subject.su_id)
            this.subjAll = [this.subject];
            this.sortSubjAll();
            this.subjectNumberInput="";
            this.$vaToast.init({message: 'Subject '+this.subject.su_id+' Added', position: 'bottom-left', color: 'warning'});
            axios.put('https://us-central1-cscuscheduler.cloudfunctions.net/api/credit/addSubjectToHistory',{
            id: this.student_ID, data: JSON.stringify(this.subjAll_ID) , headers:{"Access-Control-Allow-Origin":"*"}
            }).then(response => (this.info=(response.data)))
          }
          else { this.$vaToast.init({message: 'This subject does not exist.', position: 'bottom-left', color: 'warning'}); }
      }).catch(error => { console.log(error) })
    },
    removeSubject(){
      if (!(this.subjectNumberInput.length == 7) || !(/^\d+$/.test(this.subjectNumberInput))) { this.$vaToast.init({message: 'Please insert 7 digits input', position: 'bottom-left', color: 'warning'}); return; }
      var removedSubject = ((value) => value.su_id == this.subjectNumberInput);
      if (this.subj5.some(removedSubject)) { this.subj5 = this.subj5.filter((element) => element.su_id != this.subjectNumberInput); this.removefromDB(); this.subjectNumberInput=""; return;}
      if (this.subj4_1.some(removedSubject)) { this.subj4_1 = this.subj4_1.filter((element) => element.su_id != this.subjectNumberInput); this.removefromDB(); this.subjectNumberInput=""; return;}
      if (this.subj4_2.some(removedSubject)) { this.subj4_2 = this.subj4_2.filter((element) => element.su_id != this.subjectNumberInput); this.removefromDB(); this.subjectNumberInput=""; return;}
      if (this.subj4_3.some(removedSubject)) { this.subj4_3 = this.subj4_3.filter((element) => element.su_id != this.subjectNumberInput); this.removefromDB(); this.subjectNumberInput=""; return;}
      if (this.subj4_4.some(removedSubject)) { this.subj4_4 = this.subj4_4.filter((element) => element.su_id != this.subjectNumberInput); this.removefromDB(); this.subjectNumberInput=""; return;}
      if (this.subj4_5.some(removedSubject)) { this.subj4_5 = this.subj4_5.filter((element) => element.su_id != this.subjectNumberInput); this.removefromDB(); this.subjectNumberInput=""; return;}
      if (this.subj4_6.some(removedSubject)) { this.subj4_6 = this.subj4_6.filter((element) => element.su_id != this.subjectNumberInput); this.removefromDB(); this.subjectNumberInput=""; return;}
      if (this.subj3.some(removedSubject)) { this.subj3 = this.subj3.filter((element) => element.su_id != this.subjectNumberInput); this.removefromDB(); this.subjectNumberInput=""; return;}
      if (this.subj2_1.some(removedSubject)) { this.subj2_1 = this.subj2_1.filter((element) => element.su_id != this.subjectNumberInput); this.removefromDB(); this.subjectNumberInput=""; return;}  
      if (this.subj2_2.some(removedSubject)) { this.subj2_2 = this.subj2_2.filter((element) => element.su_id != this.subjectNumberInput); this.removefromDB(); this.subjectNumberInput=""; return;}
      if (this.subj1_1.some(removedSubject)) { this.subj1_1 = this.subj1_1.filter((element) => element.su_id != this.subjectNumberInput); this.removefromDB(); this.subjectNumberInput=""; return;}
      if (this.subj1_2.some(removedSubject)) { this.subj1_2 = this.subj1_2.filter((element) => element.su_id != this.subjectNumberInput); this.removefromDB(); this.subjectNumberInput=""; return;}
      this.$vaToast.init({message: 'This subject does not exist', position: 'bottom-left', color: 'warning'})
      this.subjectNumberInput="";
      return; 
    },
    async removefromDB(){
      this.subjAll_ID = this.subjAll_ID.filter((subid) => subid != this.subjectNumberInput);
      await axios.put('https://us-central1-cscuscheduler.cloudfunctions.net/api/credit/addSubjectToHistory',{
      id: this.student_ID, data: JSON.stringify(this.subjAll_ID) , headers:{"Access-Control-Allow-Origin":"*"}
      }).then(response => (this.info=(response.data)))
    },
    sortSubjAll(){
      this.sortSubjByGenre(this.subjAll, this.subj2_1, 'CS-CORE', 43)
      this.sortSubjByGenre(this.subjAll, this.subj3, 'SC-CORE', 31)
      this.sortSubjById(this.subjAll, this.subj2_2, ['2301361','2301367','2301369'], 6)
      this.sortSubjById(this.subjAll, this.subj4_5, ['5500111','5500112','5500204','5500496'], 12)
      this.sortSubjById(this.subjAll, this.subj4_6, ['2301170'], 3)
      this.sortSubjByGenre(this.subjAll, this.subj1_1, 'CS1', 15)
      this.sortSubjByGenre(this.subjAll, this.subj1_2, 'CS2', 6)
      this.sortSubjByGenre(this.subjAll, this.subj1_2, 'CS1', 6)
      this.sortSubjByGenre_ReverseRegexpy(this.subjAll, this.subj4_1, 'GEN-SO', 3, '^23')
      this.sortSubjByGenre_ReverseRegexpy(this.subjAll, this.subj4_2, 'GEN-HU', 3, '^23')
      this.sortSubjByGenre_ReverseRegexpy(this.subjAll, this.subj4_3, 'GEN-SC', 3, '^23')
      this.sortSubjByGenre_ReverseRegexpy(this.subjAll, this.subj4_4, 'GEN-IN', 3, '^23')
      this.sortSubjByGenre(this.subjAll, this.subj4_5, 'GEN-LANG', 12)
      this.sortSubjByGenre_Regexpy(this.subjAll, this.subj4_6, 'GEN-SC', 6, '^23')
      this.subj5.push(...this.subjAll)
      this.subjAll = [];
    },
    creditToInt(){
      for (var i = 0, length = this.subjAll.length; i < length; i++) {
        this.subjAll/* _temp */[i].su_credit = parseInt(this.subjAll/* _temp */[i].su_credit);
      }
    },
  },
  async mounted(){
    await axios.get('https://us-central1-cscuscheduler.cloudfunctions.net/api/student/queryStudentByEmail',{
      params: { email: getAuth().currentUser.email }, headers:{"Access-Control-Allow-Origin":"*"}
    }).then(response => {(this.cr_id=(response.data.cr_id)); this.student_ID = response.data.cr_id;})
    
    await axios.get('https://us-central1-cscuscheduler.cloudfunctions.net/api/credit/queryCredit',{
      params: { id: this.cr_id }, headers:{"Access-Control-Allow-Origin":"*"}
    }).then(response => {
      if (response.data.cr_his == "") { this.subjAll_ID=[]; }
      else { this.subjAll_ID=JSON.parse(response.data.cr_his); }
      
    })
    /* console.log(this.subjAll_ID) */
    console.log(this.subjAll_ID)
    if (!this.subjAll_ID.length == 0) {
    /* console.log("active") */
      
         
    await axios.get('https://us-central1-cscuscheduler.cloudfunctions.net/api/subject/queryMultSubject',{
      params: { id: this.subjAll_ID }, headers:{"Access-Control-Allow-Origin":"*"}
    }).then(response => {(this.subjAll=(response.data))
      /* console.log(response.data) */
      if (this.subjAll[0] instanceof Array){
            var tempsubjarray = []
            for (var i = 0, length = this.subjAll.length; i < length; i++) {
              for (var j = 0, innerlength = this.subjAll[i].length; j < innerlength; j++){tempsubjarray.push(this.subjAll[i][j])}
            }
            this.subjAll = tempsubjarray;
      }
      this.creditToInt();
    })
    }
    this.sortSubjAll();
    this.loadstate=false
  }
  
}
</script>

<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <div class="navbar">
    <router-link to="/home" style="text-decoration: none; color: inherit;"><div class="navbox">Home</div></router-link>
    <router-link to="/subject" style="text-decoration: none; color: inherit;"><div class="navbox">Subject</div></router-link>
    <router-link to="/schedule" style="text-decoration: none; color: inherit;"><div class="navbox">Schedule</div></router-link>
    <router-link to="/history" style="text-decoration: none; color: inherit;"><div class="navboxactive">History</div></router-link>
    <div class="navbox" style="margin-left: auto;">{{ user?.email }}</div>
    <div class="navbox" @click="signOutUser">Sign Out</div>
  </div>
  <img class="loading" v-if="loadstate" src = "../assets/loading-spinner.svg" alt="My Happy SVG"/>
  <div class="center" v-if="!loadstate">
    <div class="wrappermain">
      <div class="wrapperLeftBox">
      <div class="selectorBox">
        <div class="circle">
          <div class="big">{{ totalRequest(subj1_1)+totalRequest(subj1_2)+totalRequest(subj2_1)+totalRequest(subj2_2)+totalRequest(subj3)+totalRequest(subj4_1)+totalRequest(subj4_2)+totalRequest(subj4_3)+totalRequest(subj4_4)+totalRequest(subj4_5)+totalRequest(subj4_6)+totalRequest(subj5) }}</div>
                   
          <div class="small">total credit</div>
        </div>
        <div class="empty"></div>
        <div class="label" :class="{ activeLabel: displaymode==1 }" @click="displaymode=1;"><div class="category">CS</div><div class="small">{{ totalRequest(subj1_1)+totalRequest(subj1_2) }}/21</div></div>
        <div class="label" :class="{ activeLabel: displaymode==2 }" @click="displaymode=2;"><div class="category">CS Core</div><div class="small">{{ totalRequest(subj2_1)+totalRequest(subj2_2) }}/49</div></div>  
        <div class="label" :class="{ activeLabel: displaymode==3 }" @click="displaymode=3;"><div class="category">SC Core</div><div class="small">{{ totalRequest(subj3) }}/31</div></div>
        <div class="label" :class="{ activeLabel: displaymode==4 }" @click="displaymode=4;"><div class="category">GENED</div><div class="small">{{ totalRequest(subj4_1)+totalRequest(subj4_2)+totalRequest(subj4_3)+totalRequest(subj4_4)+totalRequest(subj4_5)+totalRequest(subj4_6) }}/30</div></div>       
        <div class="label" :class="{ activeLabel: displaymode==5 }" @click="displaymode=5;"><div class="category">FREE</div><div class="small">{{ totalRequest(subj5) }}/6</div></div>     
      </div>
      <div class="subjectInputBox">Add/Remove Subject
      <div style="width: 70%;"><va-input class="mb-4" style="width: 88.5%;" v-model="subjectNumberInput" label="Subject ID (7 digits)" :mask="{blocks: [7]}" /></div>
      <va-button @click="addSubject()" style="width: 30%; height: 20%;border-radius: 3px;" color="blue" outline text-color="#2c3e50"> Add </va-button>
      <va-button @click="removeSubject()" style="width: 30%; height: 20%;border-radius: 3px;" color="red" outline text-color="#2c3e50"> Remove </va-button></div>
      
      </div>
      
      <!--display- 1 CS / 2 CS Core / 3 SC Core / 4 GENED / FREE -->
      <div v-if="displaymode==1" class="subjectDisplayBox">

        <div class="subjectHead">CS I {{ totalRequest(subj1_1) }}/15</div>
        <div v-for="item in subj1_1" :key="item.su_id" class=subjectList>{{ item.su_genre }}: {{ item.su_id }} | {{ item.su_name }} | {{ item.su_credit }}</div>

        <div class="subjectHead">CS I / CS II {{ totalRequest(subj1_2) }}/6</div>
        <div v-for="item in subj1_2" :key="item.su_id" class=subjectList>{{ item.su_genre }}: {{ item.su_id }} | {{ item.su_name }} | {{ item.su_credit }}</div>

      </div>
      <div v-if="displaymode==2" class="subjectDisplayBox">

        <div class="subjectHead">CS CORE {{ totalRequest(subj2_1) }}/43</div>
        <div v-for="item in subj2_1" :key="item.su_id" class=subjectList>{{ item.su_genre }}: {{ item.su_id }} | {{ item.su_name }} | {{ item.su_credit }}</div>

        <div class="subjectHead">CS CHOSEN {{ totalRequest(subj2_2) }}/6</div>
        <div v-for="item in subj2_2" :key="item.su_id" class=subjectList>{{ item.su_genre }}: {{ item.su_id }} | {{ item.su_name }} | {{ item.su_credit }}</div>

      </div>
      <div v-if="displaymode==3" class="subjectDisplayBox">

        <div class="subjectHead">SC Core {{ totalRequest(subj3) }}/31</div>
        <div v-for="item in subj3" :key="item.su_id" class=subjectList>{{ item.su_genre }}: {{ item.su_id }} | {{ item.su_name }} | {{ item.su_credit }}</div>

      </div>
      
      <div v-if="displaymode==4" class="subjectDisplayBox">

      <div class="subjectHead">GEN-SO (กลุ่มวิชาสังคมศาสตร์) {{ totalRequest(subj4_1) }}/3</div>
      <div v-for="item in subj4_1" :key="item.su_id" class=subjectList>{{ item.su_genre }}: {{ item.su_id }} | {{ item.su_name }} | {{ item.su_credit }}</div>

      <div class="subjectHead">GEN-HU (กลุ่มวิชามนุษยศาสตร์) {{ totalRequest(subj4_2) }}/3</div>
      <div v-for="item in subj4_2" :key="item.su_id" class=subjectList>{{ item.su_genre }}: {{ item.su_id }} | {{ item.su_name }} | {{ item.su_credit }}</div>

      <div class="subjectHead">GEN-SC (กลุ่มวิชาวิทยาศาสตร์และคณิตศาสตร์) {{ totalRequest(subj4_3) }}/3</div>
      <div v-for="item in subj4_3" :key="item.su_id" class=subjectList>{{ item.su_genre }}: {{ item.su_id }} | {{ item.su_name }} | {{ item.su_credit }}</div>

      <div class="subjectHead">GEN-IN (กลุ่มวิชาสหศาสตร์) {{ totalRequest(subj4_4) }}/3</div>
      <div v-for="item in subj4_4" :key="item.su_id" class=subjectList>{{ item.su_genre }}: {{ item.su_id }} | {{ item.su_name }} | {{ item.su_credit }}</div>

      <div class="subjectHead">GEN-LANG (กลุ่มวิชาภาษา) {{ totalRequest(subj4_5) }}/12</div>
      <div v-for="item in subj4_5" :key="item.su_id" class=subjectList>{{ item.su_genre }}: {{ item.su_id }} | {{ item.su_name }} | {{ item.su_credit }}</div>

      <div class="subjectHead">GEN-SP (กลุ่มวิชาศึกษาทั่วไปกลุ่มพิเศษ) {{ totalRequest(subj4_6) }}/6</div>
      <div v-for="item in subj4_6" :key="item.su_id" class=subjectList>{{ item.su_genre }}: {{ item.su_id }} | {{ item.su_name }} | {{ item.su_credit }}</div>
        
          
      </div>
      <div v-if="displaymode==5" class="subjectDisplayBox">
        <div class="subjectHead">FREE {{ totalRequest(subj5) }}/6</div>
        <div v-for="item in subj5" :key="item.su_id" class=subjectList>{{ item.su_genre }}: {{ item.su_id }} | {{ item.su_name }} | {{ item.su_credit }}</div>
      </div>

      <div class="summaryBox">
        <div v-if="displaymode==1">
          <div v-if="totalRequest(subj1_1)>=15&&totalRequest(subj1_2)>=6" class="summGreen"><img src="../assets/circle-check-regular.svg" class="checkImg"/><div>ALL CLEAR</div></div>
          <div v-else class="summRed">
            <img src="../assets/circle-xmark-regular.svg" class="checkImg"/>
            <div v-if="totalRequest(subj1_1)<15">CS I - {{15 - totalRequest(subj1_1)}} CR</div>
            <div v-if="totalRequest(subj1_2)<6">CS II - {{6 - totalRequest(subj1_2)}} CR</div>
          </div>
        </div>
        <div v-if="displaymode==2">
          <div v-if="totalRequest(subj2_1)>=43&&totalRequest(subj2_2)>=6" class="summGreen"><img src="../assets/circle-check-regular.svg" class="checkImg"/><div>ALL CLEAR</div></div>
          <div v-else class="summRed">
            <img src="../assets/circle-xmark-regular.svg" class="checkImg"/>
            <div v-if="totalRequest(subj2_1)<43">CS CORE - {{43 - totalRequest(subj2_1)}} CR</div>
            <div v-if="totalRequest(subj2_2)<6">CS CHOSEN - {{6 - totalRequest(subj2_2)}} CR</div>
          </div>
        </div>
        <div v-if="displaymode==3">
          <div v-if="totalRequest(subj3)>=31" class="summGreen"><img src="../assets/circle-check-regular.svg" class="checkImg"/><div>ALL CLEAR</div></div>
          <div v-else class="summRed"><img src="../assets/circle-xmark-regular.svg" class="checkImg"/><div>SC CORE - {{31 - totalRequest(subj3)}} CR</div></div>
        </div>
        <div v-if="displaymode==4">
          <div v-if="totalRequest(subj4_1)>=3&&totalRequest(subj4_2)>=3&&totalRequest(subj4_3)>=3&&totalRequest(subj4_4)>=3&&totalRequest(subj4_5)>=12&&totalRequest(subj4_6)>=6" class="summGreen"><img src="../assets/circle-check-regular.svg" class="checkImg"/><div>ALL CLEAR</div></div>
          <div v-else class="summRed">
            <img src="../assets/circle-xmark-regular.svg" class="checkImg"/>
            <div v-if="totalRequest(subj4_1)<3">GEN-SO - {{3 - totalRequest(subj4_1)}} CR</div>
            <div v-if="totalRequest(subj4_2)<3">GEN-HU - {{3 - totalRequest(subj4_2)}} CR</div>
            <div v-if="totalRequest(subj4_3)<3">GEN-SC - {{3 - totalRequest(subj4_3)}} CR</div>
            <div v-if="totalRequest(subj4_4)<3">GEN-IN - {{3 - totalRequest(subj4_4)}} CR</div>
            <div v-if="totalRequest(subj4_5)<12">GEN-LANG - {{12 - totalRequest(subj4_5)}} CR</div>
            <div v-if="totalRequest(subj4_6)<6">GEN-SP - {{6 - totalRequest(subj4_6)}} CR</div>
          </div>
        </div>
        <div v-if="displaymode==5">
          <div v-if="totalRequest(subj5)>=6" class="summGreen"><img src="../assets/circle-check-regular.svg" class="checkImg"/><div>ALL CLEAR</div></div>
          <div v-else class="summRed"><img src="../assets/circle-xmark-regular.svg" class="checkImg"/><div>FREE - {{6 - totalRequest(subj5)}} CR</div></div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/*dev viewport width = 1920*/
.loading{
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  width: 100px;
  height: 100px;
}
.center{
  margin: 0 0;
  align-content: center;
  overflow-x: auto;
}
.wrappermain {
  display: flex;
  flex-wrap: wrap;
  /*background-color: palegreen;*/
  margin-top: 2.5em;/* 2.604vw; */ /*50px*/
  height: 45em;/* 46.875vw; *//*900px;*/
  width: 94em;/*96em; *//*100% */
  /* overflow-x: auto; */
  font-size: min(max(1.042vw, 15px), 20px); /*20 px*/
}
.activeLabel{
  border: solid #2c3e50 2px;
}
.empty{
  width:100%;
  height: 1.92em;/*2vw*/
}
.category {
  width: 100%;
  font-size: 1.5em;/*1.563vw;30 small is 17px*/
}
.small {
  width: 100%;
  font-size: 1em;/*0.885vw;*/
}
.label{
  width: 50%;
  height: 4em;/* 4.167vw;  *//*80 px*/
  box-sizing: border-box;
  padding-top: 0.65em;/* 0.677vw; *//*0.417vw;*/
  cursor:pointer;  
  /*border: solid 0.052vw black;*/
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* align horizontal */  
  align-items: center; /* align vertical */  
  align-content: flex-start;
  /* outline: solid #5e6f81 1px; */
}
.circle{
  background-color: lightblue;
  border: 0.25em solid black; /*3 or 5px=0.3vw*/   
  border-radius: 50%;
  height: 9.6em; /*10vw*10vw */
  width: 9.6em;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* align horizontal */  
  align-items: center; /* align vertical */
  margin-top: 1em; /*20px 1.042vw*/
  align-content: flex-start
}
.circle>.big{
  margin-top: 0.378em;/* 1.7vw; */
  font-size: 4.32em; /*4.5vw*/
  
}
.circle>.small{
  font-size: 1.1em;
}
.break {
  flex-basis: 100%;
  height: 0;
}
.wrapperLeftBox{
  display: flex;
  flex-wrap: wrap;
  width: 24em; /*25% */
  height: 45em;
  align-content: flex-start;
  row-gap: 30px;
}
.selectorBox{
  box-sizing: border-box;
  /*width: 25%;*/
  height: 25em; /*500px+20px (26.042vw+1.042 vw) in case you want bottom padding*/
  background-color: lightblue;/*
  border-right: solid white 3.125vw;
  border-left: solid white 3.125vw; /*60px*/
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* align horizontal */ 
  align-content: flex-start;
  flex: 1;
  width: calc(100% - 6em);
  margin-left: 3em; 
  margin-right: 3em;/* 3.125vw 60px*/
  border-radius: 10px;
}
.subjectInputBox{
  width: calc(100% - 6em);
  margin-left: 3em; 
  margin-right: 3em;
  border-radius: 10px;  
  height: 9.6em;
  background-color: lightblue;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 20px;
  font-size: 1.05em; /*1.1vw*/
  align-content: center;
  row-gap: 1.2em;
}
.subjectDisplayBox{
  box-sizing: border-box;
  height: 45em;/* 46.875vw; 900px;/*
  width: 40%;
  border-right: solid white 20px;/**/
  width: 37.4em;/* calc(40% - 1em); */
  margin-right: 1em;/*1.042vw;*/
  background-color: lightblue; border-radius: 10px;
  overflow: auto;
  scrollbar-color: #888 #f1f1f1;
  scrollbar-width: thin;
}
.subjectHead{  
  text-align: left;
  /*border-top: solid black 1px;*/
  padding-top: 1.14em;/* 1.25em; */ /*1.302vw 25px*/
  padding-left: 1.14em;/* 1.25em; */
  font-size: 1.1em;/*1.042vw; /*20px in 1920px width*/ 
  font-weight: bold;
}
.subjectList{  
  text-align: left;
  /*border-top: solid black 1px;*/
  padding-top: /* 1.25 */1.32em; /*1.302vw 25px*/
  padding-left: /* 1.25 */1.32em;
  font-size: 0.95em; /*16px default 0.833*/
}
.summaryBox{
  box-sizing: border-box;
  height: 20em;/* 45em; *//* 46.875vw; 900px;/*  
  /*height: 26.042vw;/*500px;*/
  /*width: 35%;
  border-right: solid white 3.125vw;
  border-left: solid white 1.042vw;/*60px and 20px*/
  width: 13.16em;/* 29.6em; *//* calc(35% - 4.167vw); */
  /*margin-right : 1.33em;/* 3em; */ /*3.125vw;*/
  /*margin-left : 0.44em;/* 1em; *//*1.042vw;*/
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.25em;
}
.summRed{
  color: #8B0000;
}
.summGreen{
  color: #32CD32;

}
.checkImg{
  width: 6.82em;/* 15.35em; */ /*16vw original 440px*/
  height: 6.82em;/* 15.35em; */
  padding-bottom: 0.89em; /*40px 2vw 2em*/
}

</style>